<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-yellow-400 hover:text-yellow-300">
              ← Volver al Panel
            </NuxtLink>
            <h1 class="text-2xl font-capture text-yellow-400">
              GESTIÓN DE EVENTOS
            </h1>
          </div>
          
          <button
            @click="openCreateModal"
            class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
          >
            ➕ NUEVO EVENTO
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-yellow-400 text-4xl mb-4">🎤</div>
        <p class="text-gray-300">Cargando eventos...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600/20 border border-red-500 rounded-xl p-6 mb-8">
        <p class="text-red-400">{{ error }}</p>
        <button 
          @click="loadEvents" 
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture"
        >
          Reintentar
        </button>
      </div>

      <!-- Events Content -->
      <div v-else>
        <!-- Quick Stats -->
        <section class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Total Eventos</p>
                  <p class="text-2xl font-bold text-white">{{ eventStats.total }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">📅</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Total</p>
                  <p class="text-2xl font-bold text-green-400">{{ eventStats.total }}</p>
                </div>
                <div class="text-green-400 text-2xl">🎤</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Especiales</p>
                  <p class="text-2xl font-bold text-purple-400">{{ eventStats.special }}</p>
                </div>
                <div class="text-purple-400 text-2xl">⭐</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Privados</p>
                  <p class="text-2xl font-bold text-blue-400">{{ eventStats.private }}</p>
                </div>
                <div class="text-blue-400 text-2xl">🔒</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Events List -->
        <section class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700">
            <h2 class="text-xl font-capture text-yellow-400">Lista de Eventos</h2>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-700">
                <tr>
                  <th class="text-left p-4 text-gray-300 font-capture">FECHA</th>
                  <th class="text-left p-4 text-gray-300 font-capture">EVENTO</th>
                  <th class="text-left p-4 text-gray-300 font-capture">CIUDAD</th>
                  <th class="text-left p-4 text-gray-300 font-capture">TIPO</th>
                  <th class="text-left p-4 text-gray-300 font-capture">ESTADO</th>
                  <th class="text-center p-4 text-gray-300 font-capture">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="event in events" 
                  :key="event.id"
                  class="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td class="p-4">
                    <div class="text-white font-bold">{{ formatShortDateLocal(event.date) }}</div>
                    <div class="text-gray-400 text-sm">{{ event.time }}</div>
                  </td>
                  <td class="p-4">
                    <div class="text-white font-bold">{{ event.venue }}</div>
                    <div v-if="event.description" class="text-gray-400 text-sm">{{ event.description }}</div>
                  </td>
                  <td class="p-4">
                    <span class="text-gray-300">{{ event.city }}</span>
                  </td>
                  <td class="p-4">
                    <div class="flex flex-col space-y-1">
                      <span 
                        v-if="event.isSpecial" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-600/20 text-purple-400 font-capture"
                      >
                        ⭐ Especial
                      </span>
                      <span 
                        v-if="event.isPrivate" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-600/20 text-blue-400 font-capture"
                      >
                        🔒 Privado
                      </span>
                      <span 
                        v-if="!event.isSpecial && !event.isPrivate" 
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-600/20 text-gray-400 font-capture"
                      >
                        🎤 Público
                      </span>
                    </div>
                  </td>
                  <td class="p-4">
                    <span 
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-capture"
                      :class="{
                        'bg-green-600/20 text-green-400': event.status === 'active',
                        'bg-red-600/20 text-red-400': event.status === 'cancelled',
                        'bg-yellow-600/20 text-yellow-400': event.status === 'sold_out'
                      }"
                    >
                      {{ getStatusText(event.status) }}
                    </span>
                  </td>
                  <td class="p-4">
                    <div class="flex justify-center space-x-2">
                      <button
                        @click="editEvent(event)"
                        class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                        title="Editar evento"
                      >
                        ✏️
                      </button>
                      <button
                        @click="deleteEventConfirm(event)"
                        class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                        title="Eliminar evento"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="events.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">📅</div>
              <p class="text-gray-400 mb-4">No hay eventos registrados</p>
              <button
                @click="openCreateModal"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMER EVENTO
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Create/Edit Modal -->
    <div 
      v-if="showModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditing ? 'EDITAR EVENTO' : 'NUEVO EVENTO' }}
          </h3>
        </div>

        <form @submit.prevent="saveEvent" class="p-6 space-y-6">
          <!-- Basic Info -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Venue *
              </label>
              <input
                v-model="eventForm.venue"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Nombre del lugar"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Ciudad *
              </label>
              <input
                v-model="eventForm.city"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ciudad del evento"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Fecha *
              </label>
              <input
                v-model="eventForm.dateString"
                type="date"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Hora *
              </label>
              <input
                v-model="eventForm.time"
                type="time"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              v-model="eventForm.description"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Descripción del evento (opcional)"
            ></textarea>
          </div>

          <!-- Price and Ticket URL -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Precio (CLP)
              </label>
              <input
                v-model.number="eventForm.price"
                type="number"
                min="0"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Precio del ticket"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                URL de Tickets
              </label>
              <input
                v-model="eventForm.ticketUrl"
                type="url"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          <!-- Event Options -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <input
                v-model="eventForm.isSpecial"
                type="checkbox"
                id="isSpecial"
                class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <label for="isSpecial" class="text-gray-300">
                ⭐ Evento especial
              </label>
            </div>

            <div v-if="eventForm.isSpecial">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Texto especial
              </label>
              <input
                v-model="eventForm.specialText"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ej: Aniversario Andy Jaque y su Banda"
              />
            </div>

            <div class="flex items-center space-x-3">
              <input
                v-model="eventForm.isPrivate"
                type="checkbox"
                id="isPrivate"
                class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
              />
              <label for="isPrivate" class="text-gray-300">
                🔒 Evento privado
              </label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Estado
              </label>
              <select
                v-model="eventForm.status"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              >
                <option value="active">Activo</option>
                <option value="cancelled">Cancelado</option>
                <option value="sold_out">Agotado</option>
              </select>
            </div>
          </div>

          <!-- Form Errors -->
          <div v-if="formErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <h4 class="text-red-400 font-bold mb-2">Errores en el formulario:</h4>
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in formErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              @click="closeModal"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-capture font-bold rounded-lg transition-colors"
            >
              <span v-if="saving">GUARDANDO...</span>
              <span v-else>{{ isEditing ? 'ACTUALIZAR' : 'CREAR' }} EVENTO</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeDeleteModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-xl font-capture text-red-400 mb-4">
            CONFIRMAR ELIMINACIÓN
          </h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que quieres eliminar el evento 
            <span class="text-yellow-400 font-bold">{{ eventToDelete?.venue }}</span> 
            en {{ eventToDelete?.city }}?
          </p>
          <p class="text-gray-400 text-sm mb-6">
            Esta acción no se puede deshacer.
          </p>

          <div class="flex justify-end space-x-4">
            <button
              @click="closeDeleteModal"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              @click="confirmDeleteEvent"
              :disabled="saving"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-capture font-bold rounded-lg transition-colors"
            >
              <span v-if="saving">ELIMINANDO...</span>
              <span v-else>ELIMINAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <AdminNotificationToast />
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/types/admin'

// TODO: Add admin authentication middleware later

// SEO
useHead({
  title: 'Gestión de Eventos - Admin Panel',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Composables
const { 
  events, 
  loading, 
  saving, 
  error,
  loadEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  eventStats,
  toggleEventStatus,
  reorderEvents
} = useAdminEvents()

const { success, error: notifyError } = useNotifications()

// Modal state
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const eventToDelete = ref<Event | null>(null)

// Form state
const eventForm = ref<{
  id?: string
  venue: string
  city: string
  dateString: string
  time: string
  description?: string
  price?: number
  ticketUrl?: string
  isSpecial: boolean
  specialText?: string
  isPrivate: boolean
  status: 'active' | 'cancelled' | 'sold_out'
}>({
  venue: '',
  city: '',
  dateString: '',
  time: '',
  description: '',
  price: undefined,
  ticketUrl: '',
  isSpecial: false,
  specialText: '',
  isPrivate: false,
  status: 'active'
})

const formErrors = ref<string[]>([])

// Computed
// eventStats ya viene del composable, no necesitamos redefinirlo

// Methods
const getStatusText = (status: string) => {
  const statusMap = {
    'active': 'Activo',
    'cancelled': 'Cancelado',
    'sold_out': 'Agotado'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

// Función para formatear fecha corta
const formatShortDateLocal = (date: Date) => {
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short' 
  }).toUpperCase()
}

// Función para validar datos del evento
const validateEventData = (eventData: any) => {
  const errors: string[] = []
  
  if (!eventData.venue.trim()) {
    errors.push('El lugar es requerido')
  }
  
  if (!eventData.city.trim()) {
    errors.push('La ciudad es requerida')
  }
  
  if (!eventData.dateString) {
    errors.push('La fecha es requerida')
  }
  
  if (!eventData.time.trim()) {
    errors.push('La hora es requerida')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

const openCreateModal = () => {
  isEditing.value = false
  resetForm()
  showModal.value = true
}

const editEvent = (event: Event) => {
  isEditing.value = true
  eventForm.value = {
    id: event.id,
    venue: event.venue,
    city: event.city,
    dateString: event.date.toISOString().split('T')[0],
    time: event.time,
    description: event.description || '',
    price: event.price,
    ticketUrl: event.ticketUrl || '',
    isSpecial: event.isSpecial,
    specialText: event.specialText || '',
    isPrivate: event.isPrivate,
    status: event.status
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  resetForm()
  formErrors.value = []
}

const resetForm = () => {
  eventForm.value = {
    venue: '',
    city: '',
    dateString: '',
    time: '',
    description: '',
    price: undefined,
    ticketUrl: '',
    isSpecial: false,
    specialText: '',
    isPrivate: false,
    status: 'active'
  }
}

const saveEvent = async () => {
  formErrors.value = []
  
  // Convert form data to Event format
  const eventData = {
    venue: eventForm.value.venue,
    city: eventForm.value.city,
    date: new Date(eventForm.value.dateString + 'T' + eventForm.value.time),
    time: eventForm.value.time,
    description: eventForm.value.description,
    price: eventForm.value.price,
    ticketUrl: eventForm.value.ticketUrl,
    isSpecial: eventForm.value.isSpecial,
    specialText: eventForm.value.specialText,
    isPrivate: eventForm.value.isPrivate,
    status: eventForm.value.status
  }

  // Validate
  const validation = validateEventData(eventData)
  if (!validation.isValid) {
    formErrors.value = validation.errors
    return
  }

  // Save
  let result
  if (isEditing.value) {
    result = await updateEvent(eventForm.value.id!, eventData)
  } else {
    result = await createEvent(eventData as Omit<Event, 'id'>)
  }

  if (result.success) {
    closeModal()
    if (isEditing.value) {
      success('Evento actualizado', 'Los cambios se han guardado correctamente')
    } else {
      success('Evento creado', 'El nuevo evento se ha agregado exitosamente')
    }
  } else {
    formErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const deleteEventConfirm = (event: Event) => {
  eventToDelete.value = event
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  eventToDelete.value = null
}

const confirmDeleteEvent = async () => {
  if (!eventToDelete.value) return

  const result = await deleteEvent(eventToDelete.value.id)
  if (result.success) {
    closeDeleteModal()
    success('Evento eliminado', `El evento "${eventToDelete.value.venue}" ha sido eliminado`)
  } else {
    notifyError('Error al eliminar', result.error || 'No se pudo eliminar el evento')
  }
}

// Load events on mount
onMounted(() => {
  loadEvents()
})
</script>

<style scoped>
/* Remove link underlines */
a {
  text-decoration: none !important;
}

a:visited {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 