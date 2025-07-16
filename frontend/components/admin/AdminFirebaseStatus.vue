<template>
  <div class="firebase-status bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div :class="statusClass" class="w-3 h-3 rounded-full"></div>
        <div>
          <h3 class="text-sm font-medium text-white">Estado de Firebase</h3>
          <p class="text-xs text-gray-400">{{ statusMessage }}</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-2">
        <button 
          v-if="!isConnected" 
          @click="tryConnect"
          :disabled="isConnecting"
          class="px-3 py-1 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
        >
          {{ isConnecting ? 'Conectando...' : 'Conectar' }}
        </button>
        

      </div>
    </div>
    
    <!-- Detalles adicionales -->
    <div v-if="showDetails" class="mt-3 pt-3 border-t border-gray-700">
      <div class="grid grid-cols-2 gap-4 text-xs">
        <div>
          <span class="text-gray-400">Eventos en localStorage:</span>
          <span class="text-white ml-2">{{ localStorageStats.events }}</span>
        </div>
        <div>
          <span class="text-gray-400">Media en localStorage:</span>
          <span class="text-white ml-2">{{ localStorageStats.media }}</span>
        </div>
      </div>
    </div>
    
    <button 
      @click="showDetails = !showDetails"
      class="mt-2 text-xs text-gray-400 hover:text-white transition-colors"
    >
      {{ showDetails ? 'Ocultar detalles' : 'Ver detalles' }}
    </button>
  </div>
</template>

<script setup lang="ts">
// Props y estado
const isConnecting = ref(false)
const showDetails = ref(false)

// Usar Firebase admin
const { initFirebase, isConnected } = useFirestoreAdmin()

// Estados computados
const statusClass = computed(() => {
  if (isConnected.value) return 'bg-green-500 animate-pulse'
  return 'bg-red-500'
})

const statusMessage = computed(() => {
  if (isConnecting.value) return 'Conectando a Firebase...'
  if (isConnected.value) return 'Conectado a Firebase - Los datos se guardan en tiempo real'
  return 'Usando localStorage - Los datos solo se guardan localmente'
})



// Estadísticas de localStorage
const localStorageStats = computed(() => {
  const events = localStorage.getItem('admin_events') 
    ? JSON.parse(localStorage.getItem('admin_events') || '[]').length 
    : 0
  
  const songs = localStorage.getItem('admin_songs') 
    ? JSON.parse(localStorage.getItem('admin_songs') || '[]').length 
    : 0
    
  const videos = localStorage.getItem('admin_videos') 
    ? JSON.parse(localStorage.getItem('admin_videos') || '[]').length 
    : 0
  
  return {
    events,
    media: songs + videos
  }
})

// Funciones
const tryConnect = async () => {
  isConnecting.value = true
  try {
    const connected = await initFirebase()
    if (connected) {
      console.log('✅ Firebase conectado manualmente')
    }
  } catch (error) {
    console.error('❌ Error conectando Firebase:', error)
  } finally {
    isConnecting.value = false
  }
}



// Intentar conectar automáticamente al montar
onMounted(async () => {
  if (!isConnected.value) {
    await tryConnect()
  }
})
</script>

<style scoped>
.firebase-status {
  background: linear-gradient(135deg, rgba(31, 41, 55, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%);
}
</style> 