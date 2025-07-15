<template>
  <div class="fixed bottom-20 right-6 z-40">
    <!-- Click to Listen Message (only when not playing and never played before) -->
    <div 
      v-if="!isPlaying && !hasPlayedBefore"
      class="bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1 mb-2 animate-bounce-subtle"
    >
      <span class="text-xs text-black font-body font-medium whitespace-nowrap">
        Click para escuchar
      </span>
    </div>

    <!-- Song Title Marquee (only when playing and not minimized) -->
    <div 
      v-if="isPlaying && !isMinimized"
      class="bg-gray-900/90 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30 shadow-2xl mb-2 overflow-hidden relative"
    >
      <div class="marquee-container">
        <div class="marquee-text">
          <span class="text-sm text-yellow-400 font-body whitespace-nowrap">
            Redsound (Parte 1) - Andy Jaque Y Su Banda
          </span>
        </div>
      </div>
    </div>

    <!-- Music Player Button -->
    <div class="bg-gray-900/90 backdrop-blur-sm rounded-full p-4 border border-yellow-400/30 shadow-2xl">
      <div class="flex items-center gap-3">
        <!-- Play/Pause Button -->
        <button
          @click="togglePlay"
          class="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-colors group"
        >
          <svg
            v-if="!isPlaying"
            class="w-6 h-6 text-black ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        </button>

        <!-- Volume Controls (shown when not minimized) -->
        <div 
          v-if="!isMinimized"
          class="flex items-center gap-2 transition-all duration-300"
        >
          <button
            @click="toggleMute"
            class="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
          >
            <svg
              v-if="!isMuted"
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <svg
              v-else
              class="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </button>

          <input
            type="range"
            v-model="volume"
            @input="changeVolume"
            min="0"
            max="1"
            step="0.1"
            class="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          >
        </div>

        <!-- Minimize/Maximize Button -->
        <button
          @click="isMinimized = !isMinimized"
          class="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        >
          <svg
            class="w-4 h-4 text-white transform transition-transform"
            :class="{ 'rotate-180': !isMinimized }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Audio Element -->
    <audio
      ref="audioPlayer"
      loop
      preload="auto"
      @loadeddata="onAudioLoaded"
      @error="onAudioError"
    >
      <source src="/audio/background-music.mp3" type="audio/mpeg">
      Tu navegador no soporta audio HTML5.
    </audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(0.3) // Volumen inicial al 30%
const isMinimized = ref(true)
const audioLoaded = ref(false)
const hasPlayedBefore = ref(false) // Nueva variable para rastrear si ya se reprodujo

const togglePlay = async () => {
  if (!audioPlayer.value) {
    return
  }

  try {
    if (isPlaying.value) {
      audioPlayer.value.pause()
      isPlaying.value = false
    } else {
      // Intentar cargar el audio si no está listo
      if (audioPlayer.value.readyState < 2) {
        await new Promise((resolve, reject) => {
          audioPlayer.value!.addEventListener('canplay', resolve, { once: true })
          audioPlayer.value!.addEventListener('error', reject, { once: true })
          audioPlayer.value!.load()
        })
      }
      
      await audioPlayer.value.play()
      isPlaying.value = true
      isMinimized.value = false // Mostrar controles automáticamente al reproducir
      hasPlayedBefore.value = true // Marcar que la música se ha reproducido
    }
  } catch (error) {
    console.error('Error al reproducir audio:', error)
  }
}

const toggleMute = () => {
  if (audioPlayer.value) {
    isMuted.value = !isMuted.value
    audioPlayer.value.muted = isMuted.value
  }
}

const changeVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value
  }
}

const onAudioLoaded = () => {
  audioLoaded.value = true
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value
  }
}

const onAudioError = (error: any) => {
  console.error('Error al cargar el audio:', error)
  audioLoaded.value = false
}

onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value
  }
})

onUnmounted(() => {
  if (audioPlayer.value && isPlaying.value) {
    audioPlayer.value.pause()
  }
})
</script>

<style scoped>
/* Estilos para el slider de volumen */
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: #facc15;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #facc15;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Estilos para el marquee */
.marquee-container {
  width: 200px;
  max-width: 200px;
  position: relative;
  overflow: hidden;
  height: 20px;
}

.marquee-text {
  position: absolute;
  white-space: nowrap;
  animation: marquee 8s linear infinite;
  will-change: transform;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Pausar la animación cuando el usuario hace hover */
.marquee-container:hover .marquee-text {
  animation-play-state: paused;
}

/* Animación sutil de bounce para el mensaje */
.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

@keyframes bounce-subtle {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-3px);
  }
  60% {
    transform: translateY(-2px);
  }
}
</style> 