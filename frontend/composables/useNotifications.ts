// Composable para gestionar notificaciones/toasts
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

// Estado global para las notificaciones
const globalNotifications = ref<Notification[]>([])

export const useNotifications = () => {
  const notifications = globalNotifications

  // Agregar notificación
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    
    // Duraciones por defecto según el tipo
    const defaultDurations = {
      success: 4000,  // 4 segundos para éxito
      info: 5000,     // 5 segundos para información
      warning: 6000,  // 6 segundos para advertencias
      error: 8000     // 8 segundos para errores (más tiempo para leer)
    }
    
    const newNotification: Notification = {
      id,
      duration: notification.duration ?? defaultDurations[notification.type],
      ...notification
    }

    notifications.value.push(newNotification)

    // Auto-remover después de la duración especificada
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  // Remover notificación
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  // Limpiar todas las notificaciones
  const clearAll = () => {
    notifications.value = []
  }

  // Métodos de conveniencia
  const success = (title: string, message?: string, duration?: number) => {
    return addNotification({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addNotification({ type: 'info', title, message, duration })
  }

  // Métodos para notificaciones persistentes (que no desaparecen automáticamente)
  const persistentSuccess = (title: string, message?: string) => {
    return addNotification({ type: 'success', title, message, duration: 0 })
  }

  const persistentError = (title: string, message?: string) => {
    return addNotification({ type: 'error', title, message, duration: 0 })
  }

  const persistentWarning = (title: string, message?: string) => {
    return addNotification({ type: 'warning', title, message, duration: 0 })
  }

  const persistentInfo = (title: string, message?: string) => {
    return addNotification({ type: 'info', title, message, duration: 0 })
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    persistentSuccess,
    persistentError,
    persistentWarning,
    persistentInfo
  }
} 