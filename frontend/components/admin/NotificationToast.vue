<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm">
      <TransitionGroup
        name="toast"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="rounded-lg shadow-2xl border backdrop-blur-sm overflow-hidden transform transition-all duration-300"
          :class="getNotificationClasses(notification.type)"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                  :class="getIconClasses(notification.type)"
                >
                  {{ getIcon(notification.type) }}
                </div>
              </div>
              <div class="ml-3 flex-1">
                <h4 class="text-sm font-capture font-bold mb-1" :class="getTitleClasses(notification.type)">
                  {{ notification.title }}
                </h4>
                <p 
                  v-if="notification.message" 
                  class="text-xs opacity-90"
                  :class="getMessageClasses(notification.type)"
                >
                  {{ notification.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0">
                <button
                  @click="removeNotification(notification.id)"
                  class="rounded-full p-1 hover:bg-black/10 transition-colors"
                  :class="getCloseButtonClasses(notification.type)"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Progress bar -->
          <div v-if="notification.duration && notification.duration > 0" class="h-1 bg-black/10">
            <div 
              class="h-full bg-current transition-all ease-linear"
              :class="getProgressClasses(notification.type)"
              :style="getProgressStyle(notification)"
            ></div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import type { Notification } from '~/composables/useNotifications'

const { notifications, removeNotification } = useNotifications()

// Guardar los timestamps de creación para calcular el progreso
const notificationTimestamps = new Map<string, number>()

// Actualizar timestamps cuando se agregan notificaciones
watch(notifications, (newNotifications, oldNotifications) => {
  // Detectar nuevas notificaciones
  newNotifications.forEach(notification => {
    if (!notificationTimestamps.has(notification.id)) {
      notificationTimestamps.set(notification.id, Date.now())
    }
  })
  
  // Limpiar timestamps de notificaciones eliminadas
  if (oldNotifications) {
    const currentIds = new Set(newNotifications.map(n => n.id))
    notificationTimestamps.forEach((_, id) => {
      if (!currentIds.has(id)) {
        notificationTimestamps.delete(id)
      }
    })
  }
}, { deep: true })

const getProgressStyle = (notification: Notification) => {
  if (!notification.duration || notification.duration <= 0) return {}
  
  const startTime = notificationTimestamps.get(notification.id) || Date.now()
  const elapsed = Date.now() - startTime
  const progress = Math.max(0, Math.min(100, (elapsed / notification.duration) * 100))
  
  return {
    width: `${100 - progress}%`,
    transition: 'width 100ms linear'
  }
}

// Actualizar el progreso cada 100ms
const progressInterval = ref<NodeJS.Timeout | null>(null)

onMounted(() => {
  progressInterval.value = setInterval(() => {
    // Forzar actualización reactiva
    notifications.value.forEach(() => {})
  }, 100)
})

onUnmounted(() => {
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
  }
})

const getNotificationClasses = (type: Notification['type']) => {
  const classes = {
    success: 'bg-green-800/90 border-green-600 text-green-100',
    error: 'bg-red-800/90 border-red-600 text-red-100',
    warning: 'bg-yellow-800/90 border-yellow-600 text-yellow-100',
    info: 'bg-blue-800/90 border-blue-600 text-blue-100'
  }
  return classes[type]
}

const getIconClasses = (type: Notification['type']) => {
  const classes = {
    success: 'bg-green-600 text-green-100',
    error: 'bg-red-600 text-red-100',
    warning: 'bg-yellow-600 text-yellow-100',
    info: 'bg-blue-600 text-blue-100'
  }
  return classes[type]
}

const getTitleClasses = (type: Notification['type']) => {
  const classes = {
    success: 'text-green-100',
    error: 'text-red-100',
    warning: 'text-yellow-100',
    info: 'text-blue-100'
  }
  return classes[type]
}

const getMessageClasses = (type: Notification['type']) => {
  const classes = {
    success: 'text-green-200',
    error: 'text-red-200',
    warning: 'text-yellow-200',
    info: 'text-blue-200'
  }
  return classes[type]
}

const getCloseButtonClasses = (type: Notification['type']) => {
  const classes = {
    success: 'text-green-200 hover:text-green-100',
    error: 'text-red-200 hover:text-red-100',
    warning: 'text-yellow-200 hover:text-yellow-100',
    info: 'text-blue-200 hover:text-blue-100'
  }
  return classes[type]
}

const getProgressClasses = (type: Notification['type']) => {
  const classes = {
    success: 'bg-green-400',
    error: 'bg-red-400',
    warning: 'bg-yellow-400',
    info: 'bg-blue-400'
  }
  return classes[type]
}

const getIcon = (type: Notification['type']) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  }
  return icons[type]
}
</script>

<style scoped>
/* Animaciones para las transiciones */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Animación de la barra de progreso */
@keyframes shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style> 