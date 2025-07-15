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

  // Datos por defecto para cursos
  const defaultCoursePrices: CoursePrice[] = [
    {
      id: 'basic',
      name: 'BÁSICO',
      originalPrice: 45000,
      currentPrice: 30000,
      discountPercentage: 33,
      description: 'Perfecto para empezar',
      duration: 'clase individual',
      features: [
        'Clase individual 1 hora',
        'Presencial u online',
        'Material didáctico incluido',
        'Grabación de la clase',
        'Seguimiento personalizado'
      ],
      isActive: true,
      isPopular: false
    },
    {
      id: 'intermediate',
      name: 'INTERMEDIO',
      originalPrice: 140000,
      currentPrice: 100000,
      discountPercentage: 29,
      description: 'Ideal para progreso rápido',
      duration: '4 clases mensuales',
      features: [
        '4 clases mensuales de 1 hora',
        'Presencial u online',
        'Material didáctico premium',
        'Grabación de todas las clases',
        'Soporte WhatsApp 24/7',
        'Plan de estudios personalizado'
      ],
      isActive: true,
      isPopular: true
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      originalPrice: 240000,
      currentPrice: 180000,
      discountPercentage: 25,
      description: 'Para músicos serios',
      duration: '8 clases mensuales',
      features: [
        '8 clases mensuales de 1 hora',
        'Presencial u online',
        'Material didáctico premium',
        'Grabación de todas las clases',
        'Soporte WhatsApp 24/7',
        'Plan de estudios personalizado',
        'Acceso a grupo VIP de estudiantes',
        'Masterclass grupales mensuales'
      ],
      isActive: true,
      isPopular: false
    }
  ]

  // Datos por defecto para servicios de producción
  const defaultProductionServices: ProductionService[] = [
    {
      id: 'basic-production',
      name: 'PRODUCCIÓN BÁSICA',
      originalPrice: 220000,
      currentPrice: 150000,
      discountPercentage: 32,
      description: 'Ideal para demos y maquetas',
      deliveryTime: '7 días',
      includes: [
        'Grabación básica (hasta 5 pistas)',
        'Arreglos simples',
        'Mezcla básica',
        'Master básico',
        'Entrega en 7 días'
      ],
      isActive: true,
      category: 'full_production'
    },
    {
      id: 'professional-production',
      name: 'PRODUCCIÓN PROFESIONAL',
      originalPrice: 420000,
      currentPrice: 300000,
      discountPercentage: 29,
      description: 'Calidad radio y streaming',
      deliveryTime: '10-12 días',
      includes: [
        'Grabación profesional (hasta 15 pistas)',
        'Arreglos avanzados',
        'Mezcla profesional',
        'Master profesional',
        'Sesión de revisión incluida',
        'Entrega en múltiples formatos'
      ],
      isActive: true,
      category: 'full_production'
    },
    {
      id: 'premium-production',
      name: 'PRODUCCIÓN PREMIUM',
      originalPrice: 650000,
      currentPrice: 450000,
      discountPercentage: 31,
      description: 'Máximo nivel profesional',
      deliveryTime: '15-20 días',
      includes: [
        'Grabación premium (pistas ilimitadas)',
        'Arreglos complejos y creativos',
        'Mezcla premium con múltiples revisiones',
        'Master premium para todos los formatos',
        'Sesiones de revisión ilimitadas',
        'Entrega física en CD/Vinyl ready',
        'Soporte post-entrega 30 días'
      ],
      isActive: true,
      category: 'full_production'
    }
  ]

  // Cargar precios desde localStorage
  const loadPrices = async () => {
    loading.value = true
    error.value = ''
    
    try {
      // Cargar precios de cursos
      const savedCoursePrices = localStorage.getItem('admin_course_prices')
      if (savedCoursePrices) {
        coursePrices.value = JSON.parse(savedCoursePrices)
      } else {
        coursePrices.value = [...defaultCoursePrices]
      }

      // Cargar servicios de producción
      const savedProductionServices = localStorage.getItem('admin_production_services')
      if (savedProductionServices) {
        productionServices.value = JSON.parse(savedProductionServices)
      } else {
        productionServices.value = [...defaultProductionServices]
      }

      // Verificar y reparar datos después de cargar
      await verifyAndRepairData()
      
    } catch (err) {
      error.value = 'Error al cargar los precios'
      console.error('Error loading prices:', err)
      // En caso de error, cargar datos por defecto
      coursePrices.value = [...defaultCoursePrices]
      productionServices.value = [...defaultProductionServices]
      await savePricesToStorage()
    } finally {
      loading.value = false
    }
  }

  // Guardar precios en localStorage
  const savePricesToStorage = async () => {
    try {
      localStorage.setItem('admin_course_prices', JSON.stringify(coursePrices.value))
      localStorage.setItem('admin_production_services', JSON.stringify(productionServices.value))
    } catch (err) {
      console.error('Error saving prices:', err)
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

  // Función de validación
  const validatePrice = (priceData: Partial<CoursePrice | ProductionService>) => {
    const errors: string[] = []

    if (!priceData.name?.trim()) {
      errors.push('El nombre es requerido')
    }

    if (!priceData.currentPrice || priceData.currentPrice <= 0) {
      errors.push('El precio actual debe ser mayor a 0')
    }

    if (!priceData.originalPrice || priceData.originalPrice <= 0) {
      errors.push('El precio original debe ser mayor a 0')
    }

    if (priceData.currentPrice && priceData.originalPrice && priceData.currentPrice > priceData.originalPrice) {
      errors.push('El precio actual no puede ser mayor al precio original')
    }

    return {
      isValid: errors.length === 0,
      errors
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

  // Función para resetear datos a valores por defecto
  const resetToDefaults = async () => {
    loading.value = true
    try {
      coursePrices.value = [...defaultCoursePrices]
      productionServices.value = [...defaultProductionServices]
      await savePricesToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al resetear los datos'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Función para verificar y reparar datos
  const verifyAndRepairData = async () => {
    try {
      // Verificar si los datos de producción están vacíos o corruptos
      if (productionServices.value.length === 0) {
        console.log('Reparando datos de servicios de producción...')
        productionServices.value = [...defaultProductionServices]
        await savePricesToStorage()
      }

      // Verificar si los datos de cursos están vacíos o corruptos
      if (coursePrices.value.length === 0) {
        console.log('Reparando datos de cursos...')
        coursePrices.value = [...defaultCoursePrices]
        await savePricesToStorage()
      }

      return { success: true }
    } catch (err) {
      console.error('Error al verificar y reparar datos:', err)
      return { success: false, error: 'Error al reparar datos' }
    }
  }

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
    resetToDefaults,
    verifyAndRepairData,

    // Utilidades
    validatePrice,
    calculateDiscount,
    formatPrice,
    getPriceStats
  }
} 