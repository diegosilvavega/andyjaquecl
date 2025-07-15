import type { Event } from '~/types/admin'

// Composable para gestionar eventos en el panel de administración
export const useAdminEvents = () => {
  // Estado
  const events = ref<Event[]>([])
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')

  // Datos hardcodeados actuales (migrar a Firebase después)
  const defaultEvents: Event[] = [
    {
      id: '1',
      date: new Date(2025, 6, 18), // Julio es mes 6 (0-indexado)
      time: '21:30',
      venue: 'Ovalle Casino Resort',
      city: 'Ovalle',
      isSpecial: false,
      isPrivate: false,
      status: 'active',
      description: 'Información entradas: próximamente'
    },
    {
      id: '2',
      date: new Date(2025, 7, 1), // Agosto es mes 7
      time: '20:00',
      venue: 'OVO Beach Coquimbo',
      city: 'Coquimbo',
      isSpecial: true,
      specialText: 'Aniversario Andy Jaque y su Banda',
      isPrivate: false,
      status: 'active',
      description: 'Información entradas: próximamente'
    },
    {
      id: '3',
      date: new Date(2025, 7, 8), // Agosto es mes 7
      time: '21:00',
      venue: 'Enjoy Antofagasta',
      city: 'Antofagasta',
      isSpecial: false,
      isPrivate: false,
      status: 'active',
      description: 'Información entradas: próximamente'
    },
    {
      id: '4',
      date: new Date(2025, 7, 14), // Agosto es mes 7
      time: '21:30',
      venue: 'Fraternidad La Diablada',
      city: 'Calama',
      isSpecial: false,
      isPrivate: false,
      status: 'active',
      description: 'Información entradas: próximamente'
    },
    {
      id: '5',
      date: new Date(2025, 7, 28), // Agosto es mes 7
      time: '22:00',
      venue: 'Salón Refugio Tropical',
      city: 'Copiapó',
      isSpecial: false,
      isPrivate: false,
      status: 'active',
      description: 'Información entradas: próximamente'
    },
    {
      id: '6',
      date: new Date(2025, 7, 29), // Agosto es mes 7
      time: '20:00',
      venue: 'Evento privado',
      city: 'Copiapó',
      isSpecial: false,
      isPrivate: true,
      status: 'active',
      description: 'Evento privado - Información entradas: n/a'
    },
    {
      id: '7',
      date: new Date(2025, 7, 31), // Agosto es mes 7
      time: '21:00',
      venue: 'Evento privado',
      city: 'La Serena',
      isSpecial: false,
      isPrivate: true,
      status: 'active',
      description: 'Evento privado - Información entradas: n/a'
    }
  ]

  // Cargar eventos
  const loadEvents = async () => {
    loading.value = true
    error.value = ''
    
    try {
      // Simulamos carga desde localStorage (después será Firebase)
      const savedEvents = localStorage.getItem('admin_events')
      if (savedEvents) {
        const parsed = JSON.parse(savedEvents)
        events.value = parsed.map((event: any) => ({
          ...event,
          date: new Date(event.date) // Asegurar que sea Date object
        })).filter((event: any) => !isNaN(event.date.getTime())) // Filtrar fechas inválidas
      } else {
        // Cargar eventos por defecto
        events.value = defaultEvents
        await saveEventsToStorage()
      }
      
      // Reordenar eventos después de cargar
      await reorderEvents()
    } catch (err) {
      error.value = 'Error al cargar los eventos'
      console.error('Error loading events:', err)
    } finally {
      loading.value = false
    }
  }

  // Guardar eventos en localStorage (temporal)
  const saveEventsToStorage = async () => {
    try {
      localStorage.setItem('admin_events', JSON.stringify(events.value))
    } catch (err) {
      console.error('Error saving events:', err)
    }
  }

  // Crear evento
  const createEvent = async (eventData: Omit<Event, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString() // Simple ID generation
      }

      events.value.push(newEvent)
      await reorderEvents() // Reordenar después de crear
      return { success: true, data: newEvent }
    } catch (err) {
      error.value = 'Error al crear el evento'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Actualizar evento
  const updateEvent = async (eventId: string, eventData: Partial<Event>) => {
    saving.value = true
    error.value = ''

    try {
      const index = events.value.findIndex(e => e.id === eventId)
      if (index === -1) {
        throw new Error('Evento no encontrado')
      }

      events.value[index] = { ...events.value[index], ...eventData }
      await reorderEvents() // Reordenar después de actualizar
      return { success: true, data: events.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar el evento'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Eliminar evento
  const deleteEvent = async (eventId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = events.value.findIndex(e => e.id === eventId)
      if (index === -1) {
        throw new Error('Evento no encontrado')
      }

      events.value.splice(index, 1)
      await reorderEvents() // Reordenar después de eliminar
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar el evento'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Obtener eventos futuros
  const getUpcomingEvents = computed(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0) // Comparar solo fechas, no horas
    
    return events.value
      .filter(event => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate >= now && event.status === 'active'
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        
        // Si las fechas son iguales, ordenar por hora
        if (dateA === dateB) {
          const timeA = a.time.split(':').map(Number)
          const timeB = b.time.split(':').map(Number)
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1])
        }
        
        return dateA - dateB
      })
  })

  // Obtener evento por ID
  const getEventById = (id: string) => {
    return events.value.find(event => event.id === id)
  }

  // Formatear fecha
  const formatEventDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  // Formatear fecha corta
  const formatShortDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  // Validar evento
  const validateEvent = (eventData: Partial<Event>) => {
    const errors: string[] = []

    if (!eventData.venue || eventData.venue.trim() === '') {
      errors.push('El venue es requerido')
    }

    if (!eventData.city || eventData.city.trim() === '') {
      errors.push('La ciudad es requerida')
    }

    if (!eventData.date) {
      errors.push('La fecha es requerida')
    } else if (eventData.date < new Date()) {
      errors.push('La fecha no puede ser en el pasado')
    }

    if (!eventData.time || eventData.time.trim() === '') {
      errors.push('La hora es requerida')
    }

    if (eventData.price && eventData.price < 0) {
      errors.push('El precio no puede ser negativo')
    }

    if (eventData.ticketUrl && !isValidUrl(eventData.ticketUrl)) {
      errors.push('La URL de tickets no es válida')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Validar URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  // Obtener estadísticas
  const getEventStats = computed(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    
    const upcoming = events.value.filter(e => {
      const eventDate = new Date(e.date)
      eventDate.setHours(0, 0, 0, 0)
      return eventDate >= now && e.status === 'active'
    }).length
    
    const private_events = events.value.filter(e => {
      const eventDate = new Date(e.date)
      eventDate.setHours(0, 0, 0, 0)
      return e.isPrivate && eventDate >= now
    }).length
    
    const special = events.value.filter(e => {
      const eventDate = new Date(e.date)
      eventDate.setHours(0, 0, 0, 0)
      return e.isSpecial && eventDate >= now
    }).length
    
    const total = events.value.length

    return {
      upcoming,
      private: private_events,
      special,
      total
    }
  })

  // Función para reordenar y limpiar eventos (temporal para desarrollo)
  const reorderEvents = async () => {
    // Ordenar eventos por fecha y hora
    events.value.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      
      if (dateA === dateB) {
        const timeA = a.time.split(':').map(Number)
        const timeB = b.time.split(':').map(Number)
        return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1])
      }
      
      return dateA - dateB
    })
    
    await saveEventsToStorage()
  }

  // Función para resetear eventos a los valores por defecto actualizados
  const resetEventsToDefaults = async () => {
    try {
      // Limpiar eventos del localStorage
      localStorage.removeItem('admin_events')
      
      // Cargar eventos por defecto
      events.value = [...defaultEvents]
      await saveEventsToStorage()
      
      console.log('✅ Eventos reseteados a los valores por defecto actualizados')
      return { success: true }
    } catch (err) {
      console.error('Error al resetear eventos:', err)
      return { success: false, error: 'Error al resetear eventos' }
    }
  }

  return {
    // Estado
    events: readonly(events),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Acciones
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,

    // Getters
    getUpcomingEvents,
    getEventById,
    getEventStats,

    // Utilidades
    formatEventDate,
    formatShortDate,
    validateEvent,
    reorderEvents,
    resetEventsToDefaults
  }
} 