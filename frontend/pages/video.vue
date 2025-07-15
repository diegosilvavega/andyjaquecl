<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Videos Dinámicos Sección -->
    <section class="pt-8 pb-2">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="text-yellow-400 text-4xl mb-4">🎬</div>
          <p class="text-gray-300">Cargando videos...</p>
        </div>

        <!-- Videos Grid -->
        <div v-else-if="allVideos.length > 0" class="max-w-6xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-8 text-center">
            VIDEOS RECIENTES
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="video in allVideos" 
              :key="video.id"
              class="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400/50 transition-colors"
            >
              <!-- Video Embed -->
              <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
                <iframe
                  v-if="getEmbedUrl(video.videoUrl)"
                  class="absolute top-0 left-0 w-full h-full"
                  :src="getEmbedUrl(video.videoUrl)"
                  :title="video.title"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <div v-else class="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
                  <div class="text-center text-gray-400">
                    <div class="text-3xl mb-2">🎬</div>
                    <p class="text-sm">Video no disponible</p>
                  </div>
                </div>
              </div>
              
              <!-- Video Info -->
              <div class="p-6">
                <h3 class="text-lg font-capture text-white mb-2">{{ video.title }}</h3>
                <p v-if="video.description" class="text-gray-400 text-sm mb-3 line-clamp-2">{{ video.description }}</p>
                
                <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{{ getCategoryName(video.category) }}</span>
                  <span>{{ formatDate(video.releaseDate) }}</span>
                  <span v-if="video.viewCount">{{ video.viewCount }} vistas</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span 
                      v-if="video.isFeatured"
                      class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-capture"
                    >
                      ⭐ Destacado
                    </span>
                    <span class="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                      {{ getCategoryName(video.category) }}
                    </span>
                  </div>
                  
                  <a 
                    :href="getYouTubeWatchUrl(video.videoUrl)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-capture transition-colors"
                  >
                    VER EN YT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- YouTube Channel Section -->
        <div class="max-w-4xl mx-auto text-center mt-16">
          <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-4">
            SÍGUENOS EN YOUTUBE
          </h2>
          <p class="text-gray-300 font-body mb-8">
            Covers, shows en vivo y mucho más
          </p>
          <a 
            href="https://www.youtube.com/@Andy_Jaque"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-capture text-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            VER CANAL COMPLETO
          </a>
        </div>
      </div>
    </section>

    <!-- Content Types -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4">
        <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 text-center mb-12">
          CONTENIDO DISPONIBLE
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="bg-gray-800 p-6 rounded-xl">
              <div class="text-4xl mb-4">🎬</div>
              <h4 class="text-xl font-capture text-yellow-400 mb-2">SHOWS EN VIVO</h4>
              <p class="text-gray-300 font-body text-sm">
                Los mejores momentos de nuestros conciertos
              </p>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-gray-800 p-6 rounded-xl">
              <div class="text-4xl mb-4">🎵</div>
              <h4 class="text-xl font-capture text-yellow-400 mb-2">COVERS</h4>
              <p class="text-gray-300 font-body text-sm">
                Versiones únicas de tus canciones favoritas
              </p>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-gray-800 p-6 rounded-xl">
              <div class="text-4xl mb-4">📹</div>
              <h4 class="text-xl font-capture text-yellow-400 mb-2">DETRÁS DE ESCENA</h4>
              <p class="text-gray-300 font-body text-sm">
                Contenido exclusivo y momentos especiales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
            🎥 PRÓXIMAMENTE 🎥
          </h3>
          <p class="text-gray-300 font-body mb-8">
            Nuevos videos y contenido exclusivo en preparación. ¡Suscríbete para no perderte nada!
          </p>
          <p class="text-yellow-400 font-capture-2 text-lg">
            "JAQUEANDO TAMBIÉN EN VIDEO"
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import type { Video } from '~/types/admin'
import { convertYouTubeToEmbed, extractYouTubeId } from '~/utils/youtube'

// Datos dinámicos desde el panel de admin
const { loadMedia, videos, loading } = useAdminMedia()

// Cargar videos al montar el componente
onMounted(async () => {
  await loadMedia()
})

// Todos los videos activos ordenados por fecha
const allVideos = computed(() => 
  videos.value
    .filter(video => video.isActive)
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
)

// Función para obtener embed URL de YouTube
const getEmbedUrl = (videoUrl: string): string | undefined => {
  return convertYouTubeToEmbed(videoUrl) || undefined
}

// Función para obtener URL de watch de YouTube
const getYouTubeWatchUrl = (videoUrl: string): string => {
  const videoId = extractYouTubeId(videoUrl)
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : videoUrl
}

// Función para obtener nombre de categoría
const getCategoryName = (category: string) => {
  const names = {
    'music_video': 'Video Musical',
    'behind_scenes': 'Detrás de Cámaras',
    'live_performance': 'En Vivo',
    'interview': 'Entrevista',
    'other': 'Otro'
  }
  return names[category as keyof typeof names] || category
}

// Función para formatear fecha
const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// SEO
useHead({
  title: 'Videos - Andy Jaque | Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Mira los mejores videos de Andy Jaque en YouTube. Shows en vivo, covers y contenido exclusivo.' },
    { name: 'keywords', content: 'Andy Jaque videos, YouTube, shows en vivo, covers, cumbia videos' },
    { property: 'og:title', content: 'Videos - Andy Jaque' },
    { property: 'og:description', content: 'Shows en vivo, covers y contenido exclusivo de Andy Jaque en YouTube.' }
  ]
})
</script> 