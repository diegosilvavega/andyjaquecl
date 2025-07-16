import type { CoursePrice, ProductionService } from '~/types/admin'

// Estado global para precios
const globalCoursePrices = ref<CoursePrice[]>([])
const globalProductionServices = ref<ProductionService[]>([])

export const useAdminPrices = () => {
  const coursePrices = globalCoursePrices
  const productionServices = globalProductionServices
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
          loadPrices: globalFirebase.loadPrices,
          available: true,
          isGlobal: true
        }
      }
      
      // Fallback: usar admin Firebase (para páginas admin)
      const { loadPrices: loadFirebasePrices, savePrices: saveFirebasePrices, isConnected } = useFirestoreAdmin()
      if (isConnected.value) {
        return { 
          loadPrices: loadFirebasePrices,
          savePrices: saveFirebasePrices,
          available: true,
          isGlobal: false
        }
      }
      
      return { available: false }
    } catch (error) {
      console.error('❌ Firebase no disponible para precios')
      return { available: false }
    }
  }

  // Cargar precios desde Firebase
  const loadPrices = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const firebase = useFirebaseIfAvailable()
      if (!firebase.available || !firebase.loadPrices) {
        throw new Error('Firebase no disponible')
      }

      const firebasePrices = await firebase.loadPrices()
      if (firebasePrices && (firebasePrices.courses.length > 0 || firebasePrices.services.length > 0)) {
        // Mapear y validar datos de Firebase a tipos correctos
        coursePrices.value = firebasePrices.courses.map((course: any) => ({
          id: course.id,
          name: course.name || 'Sin nombre',
          originalPrice: course.originalPrice || 0,
          currentPrice: course.currentPrice || 0,
          discountPercentage: course.discountPercentage || 0,
          description: course.description || '',
          duration: course.duration || '',
          features: course.features || [],
          isActive: course.isActive ?? true,
          isPopular: course.isPopular ?? false
        }))
        
        productionServices.value = firebasePrices.services.map((service: any) => ({
          id: service.id,
          name: service.name || 'Sin nombre',
          originalPrice: service.originalPrice || 0,
          currentPrice: service.currentPrice || 0,
          discountPercentage: service.discountPercentage || 0,
          description: service.description || '',
          deliveryTime: service.deliveryTime || '',
          includes: service.includes || [],
          isActive: service.isActive ?? true,
          category: service.category || 'full_production'
        }))
      }
    } catch (err) {
      error.value = 'Error al cargar precios desde Firebase'
      console.error('Error loading prices:', err)
      coursePrices.value = []
      productionServices.value = []
    } finally {
      loading.value = false
    }
  }

  // Guardar precios en Firebase
  const savePricesToStorage = async () => {
    try {
      const firebase = useFirebaseIfAvailable()
      if (firebase.available && firebase.savePrices) {
        await firebase.savePrices(coursePrices.value, productionServices.value)
      } else {
        throw new Error('Firebase no disponible para guardar')
      }
    } catch (err) {
      console.error('Error saving prices:', err)
      throw err
    }
  }

  // Crear precio de curso
  const createCoursePrice = async (priceData: Omit<CoursePrice, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newPrice: CoursePrice = {
        ...priceData,
        id: Date.now().toString()
      }

      coursePrices.value.push(newPrice)
      await savePricesToStorage()
      return { success: true, data: newPrice }
    } catch (err) {
      error.value = 'Error al crear el precio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Actualizar precio de curso
  const updateCoursePrice = async (priceId: string, priceData: Partial<CoursePrice>) => {
    saving.value = true
    error.value = ''

    try {
      const index = coursePrices.value.findIndex(p => p.id === priceId)
      if (index === -1) {
        throw new Error('Precio no encontrado')
      }

      coursePrices.value[index] = { ...coursePrices.value[index], ...priceData }
      await savePricesToStorage()
      return { success: true, data: coursePrices.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar el precio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Eliminar precio de curso
  const deleteCoursePrice = async (priceId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = coursePrices.value.findIndex(p => p.id === priceId)
      if (index === -1) {
        throw new Error('Precio no encontrado')
      }

      coursePrices.value.splice(index, 1)
      await savePricesToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar el precio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Crear servicio de producción
  const createProductionService = async (serviceData: Omit<ProductionService, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newService: ProductionService = {
        ...serviceData,
        id: Date.now().toString()
      }

      productionServices.value.push(newService)
      await savePricesToStorage()
      return { success: true, data: newService }
    } catch (err) {
      error.value = 'Error al crear el servicio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Actualizar servicio de producción
  const updateProductionService = async (serviceId: string, serviceData: Partial<ProductionService>) => {
    saving.value = true
    error.value = ''

    try {
      const index = productionServices.value.findIndex(s => s.id === serviceId)
      if (index === -1) {
        throw new Error('Servicio no encontrado')
      }

      productionServices.value[index] = { ...productionServices.value[index], ...serviceData }
      await savePricesToStorage()
      return { success: true, data: productionServices.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar el servicio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Eliminar servicio de producción
  const deleteProductionService = async (serviceId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = productionServices.value.findIndex(s => s.id === serviceId)
      if (index === -1) {
        throw new Error('Servicio no encontrado')
      }

      productionServices.value.splice(index, 1)
      await savePricesToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar el servicio'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Calcular descuento automáticamente
  const calculateDiscount = (originalPrice: number, currentPrice: number) => {
    if (originalPrice <= 0 || currentPrice <= 0) return 0
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  // Formatear precio en CLP
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  // Obtener estadísticas
  const getPriceStats = computed(() => {
    const activeCourses = coursePrices.value.filter(p => p.isActive).length
    const activeServices = productionServices.value.filter(s => s.isActive).length
    const totalCourses = coursePrices.value.length
    const totalServices = productionServices.value.length

    const avgCourseDiscount = coursePrices.value.reduce((sum, p) => sum + p.discountPercentage, 0) / Math.max(totalCourses, 1)
    const avgServiceDiscount = productionServices.value.reduce((sum, s) => sum + s.discountPercentage, 0) / Math.max(totalServices, 1)

    return {
      activeCourses,
      activeServices,
      totalCourses,
      totalServices,
      avgCourseDiscount: Math.round(avgCourseDiscount),
      avgServiceDiscount: Math.round(avgServiceDiscount)
    }
  })

  return {
    // Estado
    coursePrices: readonly(coursePrices),
    productionServices: readonly(productionServices),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Acciones
    loadPrices,
    createCoursePrice,
    updateCoursePrice,
    deleteCoursePrice,
    createProductionService,
    updateProductionService,
    deleteProductionService,

    // Utilidades
    calculateDiscount,
    formatPrice,
    getPriceStats
  }
} 