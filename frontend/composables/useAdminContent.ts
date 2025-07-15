import type { NewsItem, Biography, Statistic } from '~/types/admin'

// Estado global para contenido
const globalNews = ref<NewsItem[]>([])
const globalBiography = ref<Biography | null>(null)
const globalStatistics = ref<Statistic[]>([])

export const useAdminContent = () => {
  const news = globalNews
  const biography = globalBiography
  const statistics = globalStatistics
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')

  // Datos por defecto para noticias
  const defaultNews: NewsItem[] = [
    {
      id: 'tropikal-collaboration',
      title: 'Andy Jaque y la Super Banda Tropikal graban colaboración en Vallenar',
      content: 'El tecladista de la cumbia Andy Jaque se unió con la legendaria Super Banda Tropikal para grabar una colaboración especial en la plaza de Vallenar. La Super Banda Tropikal, con 26 años de trayectoria, está nominada a los Premios Pulsar mientras que Andy Jaque celebra su primer año como banda. El video se lanzará próximamente en Spotify y YouTube. La banda pide a sus seguidores votar por Banda Tropikal en la categoría "Mejor Artista Tropical" de los Premios Pulsar.',
      excerpt: 'El tecladista de la cumbia Andy Jaque se unió con la legendaria Super Banda Tropikal para grabar una colaboración especial en la plaza de Vallenar.',
      publishDate: new Date('2025-06-01'),
      isNew: true,
      externalUrl: 'https://www.elzorronortino.cl/eventos-y-entretencion/andy-jaque-y-la-super-banda-tropikal-graban-colaboracion-en-vallenar/',
      tags: ['Colaboración', 'SuperBandaTropikal', 'Vallenar', 'PremiosPulsar'],
      isPublished: true
    },
    {
      id: 'tour-2025',
      title: '¡ATENCIÓN! Seguimos agendando fechas al Tour Jaqueando la Cumbia 2025',
      content: 'No te lo pierdas, el repertorio más grande de Chile está recorriendo el país. Nuevas fechas se siguen confirmando para este 2025.',
      excerpt: 'No te lo pierdas, el repertorio más grande de Chile está recorriendo el país.',
      publishDate: new Date('2025-01-15'),
      isNew: false,
      tags: ['Tour2025', 'JaqueandoLaCumbia'],
      isPublished: true
    },
    {
      id: 'spotify-stats',
      title: 'Más de 7,293 oyentes mensuales',
      content: 'Andy Jaque continúa creciendo en plataformas digitales, alcanzando nuevos oyentes cada mes.',
      excerpt: 'Andy Jaque continúa creciendo en plataformas digitales.',
      publishDate: new Date('2025-01-01'),
      isNew: false,
      tags: ['Spotify', 'Estadísticas'],
      isPublished: true
    }
  ]

  // Datos por defecto para biografía
  const defaultBiography: Biography = {
    id: 'andy-jaque-bio',
    title: 'ARTISTA - PRODUCTOR MUSICAL - YOUTUBER',
    subtitle: 'Desde la Región de Coquimbo, Chile',
    mainText: 'Andy Jaque ha conquistado los escenarios con su talento en los teclados y su pasión por la cumbia. Su lema "Jaqueando la Cumbia" refleja su enfoque único y auténtico del género. Con más de 7,293 oyentes mensuales en Spotify, se ha posicionado como uno de los tecladistas de cumbia más reconocidos de Chile. Su versatilidad y técnica lo han llevado a presentarse en los principales escenarios del país.',
    careerHighlights: [
      'Más de 7,293 oyentes mensuales en Spotify',
      'Tour 2025 recorriendo Chile de norte a sur',
      'Productor musical especializado en cumbia moderna',
      'Colaboraciones con artistas reconocidos',
      'Presencia activa en redes sociales y YouTube'
    ],
    quote: 'La cumbia es pasión, y desde los teclados transmito esa energía a cada show',
    quoteAuthor: 'Andy Jaque',
    image: '/images/DSC02151.jpg',
    updatedAt: new Date()
  }

  // Datos por defecto para estadísticas
  const defaultStatistics: Statistic[] = [
    {
      id: 'spotify-listeners',
      label: 'Oyentes mensuales en Spotify',
      value: '7,293',
      icon: '🎵',
      description: 'Crecimiento constante en plataformas digitales',
      order: 1
    },
    {
      id: 'tour-dates',
      label: 'Fechas confirmadas Tour 2025',
      value: 8,
      icon: '🎤',
      description: 'Recorriendo Chile de norte a sur',
      order: 2
    },
    {
      id: 'social-media',
      label: 'Redes sociales activas',
      value: 5,
      icon: '📱',
      description: 'Presencia digital multiplataforma',
      order: 3
    }
  ]

  // Cargar contenido desde localStorage
  const loadContent = async () => {
    loading.value = true
    error.value = ''
    
    try {
      // Cargar noticias
      const savedNews = localStorage.getItem('admin_news')
      if (savedNews) {
        const parsed = JSON.parse(savedNews)
        news.value = parsed.map((item: any) => ({
          ...item,
          publishDate: new Date(item.publishDate)
        }))
      } else {
        news.value = defaultNews
        await saveContentToStorage()
      }

      // Cargar biografía
      const savedBiography = localStorage.getItem('admin_biography')
      if (savedBiography) {
        const parsed = JSON.parse(savedBiography)
        biography.value = {
          ...parsed,
          updatedAt: new Date(parsed.updatedAt)
        }
      } else {
        biography.value = defaultBiography
        await saveContentToStorage()
      }

      // Cargar estadísticas
      const savedStatistics = localStorage.getItem('admin_statistics')
      if (savedStatistics) {
        statistics.value = JSON.parse(savedStatistics)
      } else {
        statistics.value = defaultStatistics
        await saveContentToStorage()
      }
    } catch (err) {
      error.value = 'Error al cargar el contenido'
      console.error('Error loading content:', err)
    } finally {
      loading.value = false
    }
  }

  // Guardar contenido en localStorage
  const saveContentToStorage = async () => {
    try {
      localStorage.setItem('admin_news', JSON.stringify(news.value))
      if (biography.value) {
        localStorage.setItem('admin_biography', JSON.stringify(biography.value))
      }
      localStorage.setItem('admin_statistics', JSON.stringify(statistics.value))
    } catch (err) {
      console.error('Error saving content:', err)
    }
  }

  // ========== GESTIÓN DE NOTICIAS ==========
  
  // Crear noticia
  const createNews = async (newsData: Omit<NewsItem, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newNews: NewsItem = {
        ...newsData,
        id: Date.now().toString()
      }

      news.value.unshift(newNews) // Agregar al inicio
      await saveContentToStorage()
      return { success: true, data: newNews }
    } catch (err) {
      error.value = 'Error al crear la noticia'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Actualizar noticia
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

  // Eliminar noticia
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

  // ========== GESTIÓN DE BIOGRAFÍA ==========
  
  // Actualizar biografía
  const updateBiography = async (bioData: Partial<Biography>) => {
    saving.value = true
    error.value = ''

    try {
      if (!biography.value) {
        throw new Error('Biografía no inicializada')
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

  // ========== GESTIÓN DE ESTADÍSTICAS ==========
  
  // Crear estadística
  const createStatistic = async (statData: Omit<Statistic, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newStat: Statistic = {
        ...statData,
        id: Date.now().toString()
      }

      statistics.value.push(newStat)
      statistics.value.sort((a, b) => a.order - b.order)
      await saveContentToStorage()
      return { success: true, data: newStat }
    } catch (err) {
      error.value = 'Error al crear la estadística'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Actualizar estadística
  const updateStatistic = async (statId: string, statData: Partial<Statistic>) => {
    saving.value = true
    error.value = ''

    try {
      const index = statistics.value.findIndex(s => s.id === statId)
      if (index === -1) {
        throw new Error('Estadística no encontrada')
      }

      statistics.value[index] = { ...statistics.value[index], ...statData }
      statistics.value.sort((a, b) => a.order - b.order)
      await saveContentToStorage()
      return { success: true, data: statistics.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar la estadística'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Eliminar estadística
  const deleteStatistic = async (statId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = statistics.value.findIndex(s => s.id === statId)
      if (index === -1) {
        throw new Error('Estadística no encontrada')
      }

      statistics.value.splice(index, 1)
      await saveContentToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar la estadística'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Función de validación para noticias
  const validateNews = (newsData: Partial<NewsItem>) => {
    const errors: string[] = []

    if (!newsData.title?.trim()) {
      errors.push('El título es requerido')
    }

    if (!newsData.content?.trim()) {
      errors.push('El contenido es requerido')
    }

    if (!newsData.excerpt?.trim()) {
      errors.push('El resumen es requerido')
    }

    if (!newsData.publishDate) {
      errors.push('La fecha de publicación es requerida')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Función de validación para biografía
  const validateBiography = (bioData: Partial<Biography>) => {
    const errors: string[] = []

    if (!bioData.title?.trim()) {
      errors.push('El título es requerido')
    }

    if (!bioData.mainText?.trim()) {
      errors.push('El texto principal es requerido')
    }

    if (!bioData.quote?.trim()) {
      errors.push('La cita es requerida')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Función de validación para estadísticas
  const validateStatistic = (statData: Partial<Statistic>) => {
    const errors: string[] = []

    if (!statData.label?.trim()) {
      errors.push('La etiqueta es requerida')
    }

    if (!statData.value) {
      errors.push('El valor es requerido')
    }

    if (typeof statData.order !== 'number' || statData.order < 1) {
      errors.push('El orden debe ser un número mayor a 0')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Formatear fecha
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Obtener estadísticas de contenido
  const getContentStats = computed(() => {
    const publishedNews = news.value.filter(n => n.isPublished).length
    const newNews = news.value.filter(n => n.isNew && n.isPublished).length
    const totalStatistics = statistics.value.length

    return {
      publishedNews,
      newNews,
      totalStatistics,
      lastNewsDate: news.value.length > 0 ? news.value[0].publishDate : null
    }
  })

  // Obtener noticias publicadas ordenadas por fecha
  const getPublishedNews = computed(() => {
    return news.value
      .filter(n => n.isPublished)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
  })

  // Obtener estadísticas ordenadas
  const getOrderedStatistics = computed(() => {
    return statistics.value.sort((a, b) => a.order - b.order)
  })

  return {
    // Estado
    news: readonly(news),
    biography: readonly(biography),
    statistics: readonly(statistics),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Acciones
    loadContent,
    
    // Noticias
    createNews,
    updateNews,
    deleteNews,
    
    // Biografía
    updateBiography,
    
    // Estadísticas
    createStatistic,
    updateStatistic,
    deleteStatistic,

    // Utilidades
    validateNews,
    validateBiography,
    validateStatistic,
    formatDate,
    
    // Getters
    getContentStats,
    getPublishedNews,
    getOrderedStatistics
  }
} 