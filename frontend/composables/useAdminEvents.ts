import type { Event } from '~/types/admin'

// Composable para gestionar eventos en el panel de administración
export const useAdminEvents = () => {
  // Estado
  const events = ref<Event[]>([])
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
          loadEvents: globalFirebase.loadEvents,
          available: true,
          isGlobal: true
        }
      }
      
      // Fallback: usar admin Firebase (para páginas admin)
      const { loadEvents: loadFirebaseEvents, saveEvents: saveFirebaseEvents, isConnected } = useFirestoreAdmin()
      if (isConnected.value) {
        return { 
          loadEvents: loadFirebaseEvents, 
          saveEvents: saveFirebaseEvents,
          isConnected,
          available: true,
          isGlobal: false
        }
      }
      
      return { available: false }
    } catch (error) {
      console.error('❌ Firebase no disponible para eventos')
      return { available: false }
    }
  }

  // Cargar eventos desde Firebase
  const loadEvents = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const firebase = useFirebaseIfAvailable()
      if (!firebase.available || !firebase.loadEvents) {
        throw new Error('Firebase no disponible')
      }

      const firebaseEvents = await firebase.loadEvents()
      events.value = firebaseEvents.map((event: any) => {
        // Convertir fecha de manera robusta
        let dateObj: Date
        try {
          if (event.date instanceof Date) {
            dateObj = event.date
          } else if (event.date && typeof event.date === 'object' && event.date.toDate) {
            dateObj = event.date.toDate()
          } else if (event.date && typeof event.date === 'object' && event.date.seconds) {
            dateObj = new Date(event.date.seconds * 1000)
          } else {
            dateObj = new Date(event.date)
          }
          
          if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date')
          }
        } catch (error) {
          dateObj = new Date()
        }
        
        return {
          ...event,
          date: dateObj
        }
      }) as Event[]
      
      await reorderEvents()
    } catch (err) {
      error.value = 'Error al cargar eventos desde Firebase'
      console.error('Error loading events:', err)
      events.value = []
    } finally {
      loading.value = false
    }
  }

  // Guardar eventos en Firebase
  const saveEventsToStorage = async () => {
    try {
      const firebase = useFirebaseIfAvailable()
      if (firebase.available && firebase.saveEvents) {
        await firebase.saveEvents(events.value)
      } else {
        throw new Error('Firebase no disponible para guardar')
      }
    } catch (err) {
      console.error('Error saving events:', err)
      throw err
    }
  }

  // Crear evento
  const createEvent = async (eventData: Omit<Event, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newEvent: Event = {
        ...eventData,
        id: Date.now().toString()
      }

      events.value.push(newEvent)
      await saveEventsToStorage()
      await reorderEvents()
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
      await saveEventsToStorage()
      await reorderEvents()
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
      await saveEventsToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar el evento'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // Reordenar eventos por fecha
  const reorderEvents = async () => {
    events.value.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateA - dateB
    })
  }

  // Cambiar estado de evento
  const toggleEventStatus = async (eventId: string) => {
    const event = events.value.find(e => e.id === eventId)
    if (event) {
      const newStatus = event.status === 'active' ? 'cancelled' : 'active'
      return await updateEvent(eventId, { status: newStatus })
    }
    return { success: false, error: 'Evento no encontrado' }
  }

  // Obtener eventos próximos (públicos activos)
  const upcomingEvents = computed(() => {
    const now = new Date()
    return events.value
      .filter(event => {
        const eventDate = new Date(event.date)
        return event.status === 'active' && 
               !event.isPrivate && 
               eventDate >= now
      })
      .slice(0, 5)
  })

  // Obtener todos los eventos activos
  const activeEvents = computed(() => 
    events.value.filter(event => event.status === 'active')
  )

  // Estadísticas
  const eventStats = computed(() => ({
    total: events.value.length,
    active: activeEvents.value.length,
    upcoming: upcomingEvents.value.length,
    private: events.value.filter(e => e.isPrivate).length,
    special: events.value.filter(e => e.isSpecial).length
  }))

  return {
    // Estado
    events: readonly(events),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Datos computados
    upcomingEvents,
    activeEvents,
    eventStats,

    // Acciones
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    toggleEventStatus,
    reorderEvents
  }
} 