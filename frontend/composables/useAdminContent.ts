import type { NewsItem, Biography } from '~/types/admin'

// Estado global para contenido
const globalNews = ref<NewsItem[]>([])
const globalBiography = ref<Biography | null>(null)

export const useAdminContent = () => {
  const news = globalNews
  const biography = globalBiography
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')

  // Función para usar Firebase
  const useFirebaseIfAvailable = () => {
    try {
      // Intentar usar Firebase global primero (para páginas públicas)
      const globalFirebase = useFirebaseGlobal()
      if (globalFirebase.isAvailable.value) {
        return { 
          loadContent: globalFirebase.loadContent,
          available: true,
          isGlobal: true
        }
      }
      
      // Fallback: usar admin Firebase (para páginas admin)
      const { loadContent: loadFirebaseContent, saveContent: saveFirebaseContent, isConnected } = useFirestoreAdmin()
      if (isConnected.value) {
        return { 
          loadContent: loadFirebaseContent,
          saveContent: saveFirebaseContent,
          available: true,
          isGlobal: false
        }
      }
      
      return { available: false }
    } catch (error) {
      console.error('❌ Firebase no disponible para contenido')
      return { available: false }
    }
  }

  // Cargar contenido desde Firebase
  const loadContent = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const firebase = useFirebaseIfAvailable()
      if (!firebase.available || !firebase.loadContent) {
        throw new Error('Firebase no disponible')
      }

      const firebaseContent = await firebase.loadContent()
      if (firebaseContent && (firebaseContent.news.length > 0 || firebaseContent.biography)) {
        // Mapear y validar datos de Firebase a tipos correctos
        news.value = firebaseContent.news.map((item: any) => ({
          id: item.id,
          title: item.title || 'Sin título',
          excerpt: item.excerpt || '',
          content: item.content || '',
          publishDate: item.publishDate || new Date(),
          tags: item.tags || [],
          isPublished: item.isPublished ?? false,
          isNew: false,
          externalUrl: item.externalUrl || ''
        }))
        
        if (firebaseContent.biography) {
          const bio = firebaseContent.biography as any
        biography.value = {
            id: bio.id,
            title: bio.title || 'Andy Jaque',
            subtitle: bio.subtitle || '',
            mainText: bio.mainText || '',
            careerHighlights: bio.careerHighlights || [],
            quote: bio.quote || '',
            quoteAuthor: bio.quoteAuthor || '',
            image: bio.image || '',
            updatedAt: bio.updatedAt || new Date()
          }
        }
      }
    } catch (err) {
      error.value = 'Error al cargar contenido desde Firebase'
      console.error('Error loading content:', err)
      news.value = []
      biography.value = null
    } finally {
      loading.value = false
    }
  }

  // Guardar contenido en Firebase
  const saveContentToStorage = async () => {
    try {
      const firebase = useFirebaseIfAvailable()
      if (firebase.available && firebase.saveContent) {
        await firebase.saveContent(news.value, biography.value, [])
      } else {
        throw new Error('Firebase no disponible para guardar')
      }
    } catch (err) {
      console.error('Error saving content:', err)
      throw err
    }
  }

  // === FUNCIONES PARA NOTICIAS ===
  const createNews = async (newsData: Omit<NewsItem, 'id' | 'isNew'>) => {
    saving.value = true
    error.value = ''

    try {
      const newNews: NewsItem = {
        ...newsData,
        id: Date.now().toString(),
        isNew: true
      }

      news.value.unshift(newNews)
      await saveContentToStorage()
      return { success: true, data: newNews }
    } catch (err) {
      error.value = 'Error al crear la noticia'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const updateNews = async (newsId: string, newsData: Partial<NewsItem>) => {
    saving.value = true
    error.value = ''

    try {
      const index = news.value.findIndex(n => n.id === newsId)
      if (index === -1) {
        throw new Error('Noticia no encontrada')
      }

      news.value[index] = { ...news.value[index], ...newsData }
      await saveContentToStorage()
      return { success: true, data: news.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar la noticia'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const deleteNews = async (newsId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = news.value.findIndex(n => n.id === newsId)
      if (index === -1) {
        throw new Error('Noticia no encontrada')
      }

      news.value.splice(index, 1)
      await saveContentToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar la noticia'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // === FUNCIONES PARA BIOGRAFÍA ===
  const updateBiography = async (bioData: Partial<Biography>) => {
    saving.value = true
    error.value = ''

    try {
      if (!biography.value) {
        biography.value = {
          id: 'bio-1',
          title: 'Andy Jaque',
          subtitle: '',
          mainText: '',
          careerHighlights: [],
          quote: '',
          quoteAuthor: '',
          image: '',
          updatedAt: new Date()
        }
      }

      biography.value = { 
        ...biography.value, 
        ...bioData,
        updatedAt: new Date()
      }
      
      await saveContentToStorage()
      return { success: true, data: biography.value }
    } catch (err) {
      error.value = 'Error al actualizar la biografía'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }



  // === DATOS COMPUTADOS ===
  const publishedNews = computed(() => 
    news.value.filter(item => item.isPublished)
  )

  const latestNews = computed(() => 
    publishedNews.value.slice(0, 5)
  )

  // === ESTADÍSTICAS ===
  const contentStats = computed(() => ({
    totalNews: news.value.length,
    publishedNews: publishedNews.value.length,
    hasBiography: !!biography.value
  }))

  return {
    // Estado
    news: readonly(news),
    biography: readonly(biography),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Datos computados
    publishedNews,
    latestNews,
    contentStats,

    // Acciones
    loadContent,
    
    // Noticias
    createNews,
    updateNews,
    deleteNews,
    
    // Biografía
    updateBiography
  }
} 