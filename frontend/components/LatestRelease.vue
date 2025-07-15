<template>
  <section class="py-16 bg-gray-800 text-white">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-capture text-yellow-400 mb-4 text-shadow-lg glow-effect">
          ÚLTIMOS LANZAMIENTOS
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Descubre los últimos videos de Andy Jaque y mantente al día con su música.
        </p>
      </div>

      <!-- Videos Section - Datos Dinámicos -->
      <div class="max-w-none mx-auto px-4">
        <div v-if="featuredVideos.length > 0" class="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-8xl mx-auto">
          <div 
            v-for="video in featuredVideos.slice(0, 2)" 
            :key="video.id"
            class="bg-black/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-yellow-400/20"
          >
            <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
              <iframe
                v-if="getEmbedUrl(video.videoUrl)"
                class="absolute top-0 left-0 w-full h-full rounded-xl"
                :src="getEmbedUrl(video.videoUrl)"
                :title="video.title"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <div v-else class="absolute top-0 left-0 w-full h-full rounded-xl bg-gray-800 flex items-center justify-center">
                <div class="text-center text-gray-400">
                  <div class="text-4xl mb-2">🎬</div>
                  <p>Video no disponible</p>
                  <p class="text-xs mt-1">URL de YouTube requerida</p>
                </div>
              </div>
            </div>
            
            <!-- Video Info -->
            <div class="mt-4">
              <h3 class="text-lg font-capture text-yellow-400 mb-2">{{ video.title }}</h3>
              <p class="text-gray-300 text-sm mb-3">{{ video.description }}</p>
              <div class="flex items-center justify-center text-xs text-gray-400 mb-4">
                <span>{{ formatDate(video.releaseDate) }}</span>
              </div>
              <div class="text-center">
                <a 
                  v-if="video.videoUrl"
                  :href="getYouTubeWatchUrl(video.videoUrl)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture transition-colors inline-flex items-center gap-2 text-sm"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  VER EN YOUTUBE
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">🎬</div>
          <p class="text-gray-400 text-lg mb-4">Próximamente nuevos lanzamientos</p>
          <p class="text-gray-500 text-sm">Los últimos videos se están preparando desde el panel de administración</p>
          <div class="mt-6">
            <a 
              href="https://www.youtube.com/@Andy_Jaque" 
              target="_blank" 
              rel="noopener noreferrer"
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-capture transition-colors inline-flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              VER CANAL DE YOUTUBE
            </a>
          </div>
        </div>



        <!-- General Actions -->
        <div class="text-center mt-16">
          <p class="text-gray-300 mb-6">
            ¡No te pierdas ningún lanzamiento! Suscríbete a nuestro canal para más contenido exclusivo.
          </p>
          <a 
            href="https://www.youtube.com/@Andy_Jaque" 
            target="_blank" 
            rel="noopener noreferrer"
            class="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-capture transition-colors inline-flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            SUSCRÍBETE EN YOUTUBE
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Video } from '~/types/admin'
import { convertYouTubeToEmbed, isYouTubeUrl, extractYouTubeId } from '~/utils/youtube'

// 🎯 DATOS DINÁMICOS DESDE EL PANEL DE ADMIN
const { loadMedia, videos } = useAdminMedia()

// Cargar videos al montar el componente
onMounted(async () => {
  await loadMedia()
})

// Videos destacados desde el panel de administración
const featuredVideos = computed(() => 
  videos.value.filter(video => video.isActive && video.isFeatured)
)

// Funciones de utilidad
const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}



// Función para obtener embed URL de YouTube
const getEmbedUrl = (videoUrl: string): string | undefined => {
  return convertYouTubeToEmbed(videoUrl) || undefined
}

// Función para obtener URL de watch de YouTube
const getYouTubeWatchUrl = (videoUrl: string): string => {
  const videoId = extractYouTubeId(videoUrl)
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl
}
</script>

<style scoped>
/* Estilos específicos para este componente */
</style> 