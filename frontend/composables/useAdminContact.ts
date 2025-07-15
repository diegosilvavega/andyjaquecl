import type { ContactInfo, SocialMedia, ProfessionalContact, ContactSettings } from '~/types/admin'

// Estado global reactivo
const contactInfo = ref<ContactInfo | null>(null)
const socialMediaList = ref<SocialMedia[]>([])
const professionalContacts = ref<ProfessionalContact[]>([])
const contactSettings = ref<ContactSettings | null>(null)
const loading = ref(false)
const errorState = ref<string | null>(null)

export const useAdminContact = () => {
  const { success, error: showError } = useNotifications()

  // Datos por defecto
  const defaultContactInfo: ContactInfo = {
    id: '1',
    phone: '+56 9 1234 5678',
    whatsapp: '+56 9 1234 5678',
    email: 'andy@andyjaque.cl',
    managerEmail: 'manager@andyjaque.cl',
    location: 'Santiago, Chile',
    businessHours: 'Lunes a Viernes, 9:00 - 18:00',
    updatedAt: new Date()
  }

  const defaultSocialMedia: SocialMedia[] = [
    {
      id: '1',
      platform: 'instagram',
      username: '@andyjaquecl',
      url: 'https://instagram.com/andyjaquecl',
      displayName: 'Andy Jaque Oficial',
      isActive: true,
      order: 1
    },
    {
      id: '2',
      platform: 'facebook',
      username: 'andyjaquecl',
      url: 'https://facebook.com/andyjaquecl',
      displayName: 'Andy Jaque - Tecladista',
      isActive: true,
      order: 2
    },
    {
      id: '3',
      platform: 'youtube',
      username: 'andyjaquechannel',
      url: 'https://youtube.com/@andyjaquechannel',
      displayName: 'Andy Jaque Music',
      isActive: true,
      order: 3
    },
    {
      id: '4',
      platform: 'spotify',
      username: 'andyjaque',
      url: 'https://open.spotify.com/artist/andyjaque',
      displayName: 'Andy Jaque',
      isActive: true,
      order: 4
    },
    {
      id: '5',
      platform: 'tiktok',
      username: '@andyjaquecl',
      url: 'https://tiktok.com/@andyjaquecl',
      displayName: 'Andy Jaque',
      isActive: true,
      order: 5
    }
  ]

  const defaultProfessionalContacts: ProfessionalContact[] = [
    {
      id: '1',
      type: 'manager',
      name: 'María González',
      email: 'maria@musicmanagement.cl',
      phone: '+56 9 8765 4321',
      company: 'Music Management Chile',
      role: 'Gerente General',
      isPublic: true,
      order: 1,
      notes: 'Contacto principal para contrataciones y eventos',
      updatedAt: new Date()
    },
    {
      id: '2',
      type: 'booking',
      name: 'Carlos Mendoza',
      email: 'booking@eventschile.cl',
      phone: '+56 9 5555 1234',
      company: 'Events Chile',
      role: 'Booking Agent',
      isPublic: true,
      order: 2,
      notes: 'Especialista en eventos corporativos y festivales',
      updatedAt: new Date()
    },
    {
      id: '3',
      type: 'press',
      name: 'Ana Silva',
      email: 'prensa@mediamusic.cl',
      phone: '+56 9 7777 8888',
      company: 'Media Music PR',
      role: 'Director de Comunicaciones',
      isPublic: false,
      order: 3,
      notes: 'Manejo de prensa y relaciones públicas',
      updatedAt: new Date()
    }
  ]

  const defaultContactSettings: ContactSettings = {
    showContactForm: true,
    showSocialMedia: true,
    showProfessionalContacts: true,
    contactFormEmail: 'contacto@andyjaque.cl',
    autoReplyEnabled: true,
    autoReplyMessage: '¡Gracias por contactar a Andy Jaque! Te responderemos pronto.',
    enableSpamProtection: true
  }

  // Inicializar datos
  const initializeContactData = () => {
    try {
      // Cargar desde localStorage o usar datos por defecto
      const savedContactInfo = localStorage.getItem('admin_contact_info')
      const savedSocialMedia = localStorage.getItem('admin_social_media')
      const savedProfessionalContacts = localStorage.getItem('admin_professional_contacts')
      const savedContactSettings = localStorage.getItem('admin_contact_settings')

      contactInfo.value = savedContactInfo 
        ? JSON.parse(savedContactInfo) 
        : defaultContactInfo

      socialMediaList.value = savedSocialMedia 
        ? JSON.parse(savedSocialMedia) 
        : defaultSocialMedia

      professionalContacts.value = savedProfessionalContacts 
        ? JSON.parse(savedProfessionalContacts) 
        : defaultProfessionalContacts

      contactSettings.value = savedContactSettings 
        ? JSON.parse(savedContactSettings) 
        : defaultContactSettings

    } catch (err) {
      console.error('Error inicializando datos de contacto:', err)
      // Usar datos por defecto en caso de error
      contactInfo.value = defaultContactInfo
      socialMediaList.value = defaultSocialMedia
      professionalContacts.value = defaultProfessionalContacts
      contactSettings.value = defaultContactSettings
    }
  }

  // Guardar datos
  const saveContactData = () => {
    try {
      localStorage.setItem('admin_contact_info', JSON.stringify(contactInfo.value))
      localStorage.setItem('admin_social_media', JSON.stringify(socialMediaList.value))
      localStorage.setItem('admin_professional_contacts', JSON.stringify(professionalContacts.value))
      localStorage.setItem('admin_contact_settings', JSON.stringify(contactSettings.value))
    } catch (err) {
      console.error('Error guardando datos de contacto:', err)
      throw new Error('Error al guardar los datos de contacto')
    }
  }

  // Cargar todos los datos
  const loadAllContactData = async () => {
    loading.value = true
    errorState.value = null
    
    try {
      initializeContactData()
      await new Promise(resolve => setTimeout(resolve, 500)) // Simular carga
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  // ========== INFORMACIÓN DE CONTACTO ==========
  const updateContactInfo = async (data: Partial<ContactInfo>) => {
    loading.value = true
    errorState.value = null
    
    try {
      if (!contactInfo.value) {
        throw new Error('No se ha inicializado la información de contacto')
      }

      contactInfo.value = {
        ...contactInfo.value,
        ...data,
        updatedAt: new Date()
      }

      saveContactData()
      success('Información de contacto actualizada correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al actualizar la información de contacto')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ========== REDES SOCIALES ==========
  const createSocialMedia = async (data: Omit<SocialMedia, 'id'>) => {
    loading.value = true
    errorState.value = null
    
    try {
      const newSocialMedia: SocialMedia = {
        ...data,
        id: Date.now().toString()
      }

      socialMediaList.value.push(newSocialMedia)
      saveContactData()
      success('Red social agregada correctamente')
      return newSocialMedia
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al agregar la red social')
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSocialMedia = async (id: string, data: Partial<SocialMedia>) => {
    loading.value = true
    errorState.value = null
    
    try {
      const index = socialMediaList.value.findIndex(social => social.id === id)
      if (index === -1) {
        throw new Error('Red social no encontrada')
      }

      socialMediaList.value[index] = {
        ...socialMediaList.value[index],
        ...data
      }

      saveContactData()
      success('Red social actualizada correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al actualizar la red social')
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSocialMedia = async (id: string) => {
    loading.value = true
    errorState.value = null
    
    try {
      const index = socialMediaList.value.findIndex(social => social.id === id)
      if (index === -1) {
        throw new Error('Red social no encontrada')
      }

      socialMediaList.value.splice(index, 1)
      saveContactData()
      success('Red social eliminada correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al eliminar la red social')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ========== CONTACTOS PROFESIONALES ==========
  const createProfessionalContact = async (data: Omit<ProfessionalContact, 'id' | 'updatedAt'>) => {
    loading.value = true
    errorState.value = null
    
    try {
      const newContact: ProfessionalContact = {
        ...data,
        id: Date.now().toString(),
        updatedAt: new Date()
      }

      professionalContacts.value.push(newContact)
      saveContactData()
      success('Contacto profesional agregado correctamente')
      return newContact
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al agregar el contacto profesional')
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProfessionalContact = async (id: string, data: Partial<ProfessionalContact>) => {
    loading.value = true
    errorState.value = null
    
    try {
      const index = professionalContacts.value.findIndex(contact => contact.id === id)
      if (index === -1) {
        throw new Error('Contacto profesional no encontrado')
      }

      professionalContacts.value[index] = {
        ...professionalContacts.value[index],
        ...data,
        updatedAt: new Date()
      }

      saveContactData()
      success('Contacto profesional actualizado correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al actualizar el contacto profesional')
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProfessionalContact = async (id: string) => {
    loading.value = true
    errorState.value = null
    
    try {
      const index = professionalContacts.value.findIndex(contact => contact.id === id)
      if (index === -1) {
        throw new Error('Contacto profesional no encontrado')
      }

      professionalContacts.value.splice(index, 1)
      saveContactData()
      success('Contacto profesional eliminado correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al eliminar el contacto profesional')
      throw err
    } finally {
      loading.value = false
    }
  }

  // ========== CONFIGURACIONES ==========
  const updateContactSettings = async (data: Partial<ContactSettings>) => {
    loading.value = true
    errorState.value = null
    
    try {
      if (!contactSettings.value) {
        throw new Error('No se han inicializado las configuraciones')
      }

      contactSettings.value = {
        ...contactSettings.value,
        ...data
      }

      saveContactData()
      success('Configuraciones actualizadas correctamente')
    } catch (err) {
      errorState.value = err instanceof Error ? err.message : 'Error desconocido'
      showError('Error al actualizar las configuraciones')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Estadísticas
  const contactStats = computed(() => {
    return {
      totalSocialMedia: socialMediaList.value.length,
      activeSocialMedia: socialMediaList.value.filter(social => social.isActive).length,
      totalProfessionalContacts: professionalContacts.value.length,
      publicProfessionalContacts: professionalContacts.value.filter(contact => contact.isPublic).length
    }
  })

  // Inicializar automáticamente
  if (process.client && !contactInfo.value) {
    initializeContactData()
  }

  return {
    // Estado
    contactInfo: readonly(contactInfo),
    socialMediaList: readonly(socialMediaList),
    professionalContacts: readonly(professionalContacts),
    contactSettings: readonly(contactSettings),
    loading: readonly(loading),
    error: readonly(errorState),
    contactStats,

    // Métodos
    loadAllContactData,
    updateContactInfo,
    createSocialMedia,
    updateSocialMedia,
    deleteSocialMedia,
    createProfessionalContact,
    updateProfessionalContact,
    deleteProfessionalContact,
    updateContactSettings
  }
} 