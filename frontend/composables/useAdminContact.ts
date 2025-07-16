import type { ContactInfo, SocialMedia, ContactSettings } from '~/types/admin'

// Estado global reactivo
const contactInfo = ref<ContactInfo | null>(null)
const socialMediaList = ref<SocialMedia[]>([])
const contactSettings = ref<ContactSettings | null>(null)
const loading = ref(false)
const errorState = ref<string | null>(null)

export const useAdminContact = () => {
  const { success, error: showError } = useNotifications()

  // Función para usar Firebase
  const useFirebaseIfAvailable = () => {
    try {
      // Intentar usar Firebase global primero (para páginas públicas)
      const globalFirebase = useFirebaseGlobal()
      if (globalFirebase.isAvailable.value) {
        return { 
          loadContact: globalFirebase.loadContact,
          available: true,
          isGlobal: true
        }
      }
      
      // Fallback: usar admin Firebase (para páginas admin)
      const { loadContact: loadFirebaseContact, saveContact: saveFirebaseContact, isConnected } = useFirestoreAdmin()
      if (isConnected.value) {
        return { 
          loadContact: loadFirebaseContact,
          saveContact: saveFirebaseContact,
          available: true,
          isGlobal: false
        }
      }
      
      return { available: false }
    } catch (error) {
      console.error('❌ Firebase no disponible para contacto')
      return { available: false }
    }
  }

  // Cargar datos de contacto desde Firebase
  const loadContactData = async () => {
    loading.value = true
    errorState.value = null
    
    try {
      const firebase = useFirebaseIfAvailable()
      if (!firebase.available || !firebase.loadContact) {
        throw new Error('Firebase no disponible')
      }

      const firebaseContact = await firebase.loadContact()
      if (firebaseContact) {
        socialMediaList.value = firebaseContact.socialMedia.map((sm: any) => ({
          id: sm.id,
          platform: sm.platform || 'instagram',
          username: sm.username || '',
          url: sm.url || '',
          displayName: sm.displayName || '',
          isActive: sm.isActive ?? true,
          order: sm.order || 1
        })) || []
        

        
        contactInfo.value = firebaseContact.contactInfo ? {
          id: firebaseContact.contactInfo.id || '1',
          phone: (firebaseContact.contactInfo as any).phone || '',
          whatsapp: (firebaseContact.contactInfo as any).whatsapp || '',
          email: (firebaseContact.contactInfo as any).email || '',
          managerEmail: (firebaseContact.contactInfo as any).managerEmail || '',
          location: (firebaseContact.contactInfo as any).location || '',
          businessHours: (firebaseContact.contactInfo as any).businessHours || '',
          updatedAt: (firebaseContact.contactInfo as any).updatedAt || new Date()
        } : null
      }
    } catch (err) {
      errorState.value = 'Error al cargar datos de contacto desde Firebase'
      console.error('Error loading contact data:', err)
      socialMediaList.value = []
      contactInfo.value = null
    } finally {
      loading.value = false
    }
  }

  // Guardar datos de contacto en Firebase
  const saveContactData = async () => {
    try {
      const firebase = useFirebaseIfAvailable()
      if (firebase.available && firebase.saveContact) {
        await firebase.saveContact(socialMediaList.value, [], contactInfo.value)
      } else if (firebase.available && firebase.isGlobal) {
        // Si estamos usando Firebase global (solo lectura), no podemos guardar
        console.warn('⚠️ Firebase global es solo lectura, no se puede guardar')
        throw new Error('No se pueden guardar datos desde páginas públicas')
      } else {
        throw new Error('Firebase no disponible para guardar')
      }
    } catch (err) {
      console.error('Error saving contact data:', err)
      throw err
    }
  }

  // === FUNCIONES PARA REDES SOCIALES ===
  const addSocialMedia = async (platform: SocialMedia['platform'], username: string, url: string, displayName: string) => {
    try {
      const newSocialMedia: SocialMedia = {
        id: Date.now().toString(),
        platform,
        username,
        url,
        displayName,
        isActive: true,
        order: socialMediaList.value.length + 1
      }

      socialMediaList.value.push(newSocialMedia)
      await saveContactData()
      success('Red social agregada exitosamente')
      return { success: true, data: newSocialMedia }
    } catch (err) {
      const errorMsg = 'Error al agregar red social'
      showError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  const updateSocialMedia = async (id: string, data: Partial<SocialMedia>) => {
    try {
      const index = socialMediaList.value.findIndex(sm => sm.id === id)
      if (index === -1) {
        throw new Error('Red social no encontrada')
      }

      socialMediaList.value[index] = { ...socialMediaList.value[index], ...data }
      await saveContactData()
      success('Red social actualizada exitosamente')
      return { success: true, data: socialMediaList.value[index] }
    } catch (err) {
      const errorMsg = 'Error al actualizar red social'
      showError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  const deleteSocialMedia = async (id: string) => {
    try {
      const index = socialMediaList.value.findIndex(sm => sm.id === id)
      if (index === -1) {
        throw new Error('Red social no encontrada')
      }

      socialMediaList.value.splice(index, 1)
      await saveContactData()
      success('Red social eliminada exitosamente')
      return { success: true }
    } catch (err) {
      const errorMsg = 'Error al eliminar red social'
      showError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // === FUNCIONES PARA INFORMACIÓN DE CONTACTO ===
  const updateContactInfo = async (data: Partial<ContactInfo>) => {
    try {
      if (!contactInfo.value) {
        contactInfo.value = {
          id: '1',
          phone: '',
          whatsapp: '',
          email: '',
          managerEmail: '',
          location: '',
          businessHours: '',
          updatedAt: new Date()
        }
      }

      contactInfo.value = { 
        ...contactInfo.value, 
        ...data,
        updatedAt: new Date()
      }

      await saveContactData()
      success('Información de contacto actualizada exitosamente')
      return { success: true, data: contactInfo.value }
    } catch (err) {
      const errorMsg = 'Error al actualizar información de contacto'
      showError(errorMsg)
      return { success: false, error: errorMsg }
    }
  }

  // === DATOS COMPUTADOS ===
  const activeSocialMedia = computed(() => 
    socialMediaList.value.filter(sm => sm.isActive).sort((a, b) => a.order - b.order)
  )

  const contactStats = computed(() => ({
      totalSocialMedia: socialMediaList.value.length,
    activeSocialMedia: activeSocialMedia.value.length,
    hasContactInfo: !!contactInfo.value
  }))

  return {
    // Estado
    contactInfo: readonly(contactInfo),
    socialMediaList: readonly(socialMediaList),
    contactSettings: readonly(contactSettings),
    loading: readonly(loading),
    errorState: readonly(errorState),

    // Datos computados
    activeSocialMedia,
    contactStats,

    // Acciones
    loadContactData,
    
    // Redes sociales
    addSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    
    // Información de contacto
    updateContactInfo
  }
} 