<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Dynamic News Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-capture text-yellow-400 mb-4 text-shadow-lg glow-effect">
            ÚLTIMAS NOTICIAS
          </h1>
          <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Mantente al día con todas las novedades de Andy Jaque y el Tour Jaqueando la Cumbia 2025
          </p>
        </div>

        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-12">
            <div class="text-yellow-400 text-4xl mb-4">📰</div>
            <p class="text-gray-300">Cargando noticias...</p>
          </div>

          <!-- Dynamic News Articles -->
          <div v-for="(article, index) in publishedNews" :key="article.id">
            <article class="bg-gray-800 rounded-xl p-8 border border-yellow-400/30 shadow-2xl">
              <div class="flex items-center gap-2 mb-4">
                <span 
                  v-if="index === 0"
                  class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-capture animate-pulse"
                >
                  ¡NUEVO!
                </span>
                <span class="text-gray-400 text-sm">
                  {{ formatDate(article.publishDate) }}
                </span>
              </div>
              
              <h2 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
                {{ article.title }}
              </h2>
              
              <div class="text-gray-300 font-body leading-relaxed mb-6 space-y-4">
                <p v-for="paragraph in article.content.split('\n')" :key="paragraph">
                  {{ paragraph }}
                </p>
              </div>

              <!-- Tags -->
              <div v-if="article.tags && article.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tag in article.tags" 
                  :key="tag"
                  class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-capture"
                >
                  #{{ tag }}
                </span>
              </div>

              <!-- External Link -->
              <a 
                v-if="article.externalUrl"
                :href="article.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-capture text-sm"
              >
                <span>Leer noticia completa</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </article>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && publishedNews.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">📰</div>
            <p class="text-gray-400 text-lg">No hay noticias publicadas</p>
            <p class="text-gray-500 text-sm mt-2">Las noticias se gestionan desde el panel de administración</p>
          </div>

          <!-- Fallback News (si no hay contenido dinámico) -->
          <article v-if="!loading && publishedNews.length === 0" class="bg-gray-800 rounded-xl p-8 border border-yellow-400/30 shadow-2xl">
            <div class="flex items-center gap-2 mb-4">
              <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-capture animate-pulse">
                ¡NUEVO!
              </span>
              <span class="text-gray-400 text-sm">
                Junio 2025
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
              Andy Jaque y la Super Banda Tropikal graban colaboración en Vallenar
            </h2>
            <p class="text-gray-300 font-body leading-relaxed mb-4">
              El tecladista de la cumbia Andy Jaque se unió con la legendaria Super Banda Tropikal para grabar una colaboración especial en la plaza de Vallenar. La Super Banda Tropikal, con 26 años de trayectoria, está nominada a los Premios Pulsar mientras que Andy Jaque celebra su primer año como banda.
            </p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-capture">
                #Colaboración
              </span>
              <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-capture">
                #SuperBandaTropikal
              </span>
            </div>
            <a 
              href="https://www.elzorronortino.cl/eventos-y-entretencion/andy-jaque-y-la-super-banda-tropikal-graban-colaboracion-en-vallenar/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-capture text-sm"
            >
              <span>Leer noticia completa</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>

    <!-- Tour Dates Section -->
    <section class="py-16 bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-8">
            PRÓXIMAS FECHAS DEL TOUR
          </h3>
          <div class="bg-gray-700 rounded-xl p-6 mb-8">
            <p class="text-gray-300 font-body mb-4">Tour Jaqueando la Cumbia 2025:</p>
            <p>15 JUL - Viña del Mar (Festival de Invierno)</p>
            <p>22 JUL - Santiago (Teatro Caupolicán)</p>
            <p>29 JUL - Concepción (Teatro Universidad de Concepción)</p>
            <p>5 AGO - Valparaíso (Anfiteatro del Mar)</p>
            <p>9 AGO - Antofagasta (Enjoy Antofagasta)</p>
            <p>Y muchas más...</p>
          </div>
          <NuxtLink
            to="/"
            class="inline-block mt-6 bg-yellow-400 text-black px-6 py-3 rounded-lg font-capture hover:bg-yellow-300 transition-colors"
          >
            VER TODAS LAS FECHAS
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Social Media Updates -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-8">
            SÍGUENOS PARA MÁS NOTICIAS
          </h3>
          <p class="text-gray-300 font-body mb-8">
            No te pierdas ninguna novedad del Tour Jaqueando la Cumbia 2025
          </p>
          <div class="flex justify-center gap-4">
            <a 
              href="https://www.instagram.com/andy_jaque/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-capture hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              Instagram
            </a>
            <a 
              href="https://www.facebook.com/AndyjaqueJ/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-blue-600 text-white px-6 py-3 rounded-lg font-capture hover:bg-blue-700 transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://www.tiktok.com/@andyjaqueoficial"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-gradient-to-r from-red-500 to-blue-600 text-white px-6 py-3 rounded-lg font-capture hover:from-red-600 hover:to-blue-700 transition-colors"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// 🎯 DATOS DINÁMICOS DESDE EL PANEL DE ADMIN
const { loadContent, getPublishedNews, loading } = useAdminContent()

// Cargar contenido al montar la página
onMounted(async () => {
  await loadContent()
})

// Noticias publicadas desde el panel de administración
const publishedNews = computed(() => getPublishedNews.value)

// Funciones de utilidad
const formatDate = (date: Date | string) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

useHead({
  title: 'Noticias - Andy Jaque | Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Últimas noticias y novedades del Tour Jaqueando la Cumbia 2025 de Andy Jaque. Mantente al día con todas las actualizaciones.' },
    { name: 'keywords', content: 'Andy Jaque noticias, novedades, tour 2025, cumbia, actualizaciones' },
    { property: 'og:title', content: 'Noticias - Andy Jaque' },
    { property: 'og:description', content: 'Últimas noticias y novedades del Tour Jaqueando la Cumbia 2025.' }
  ]
})
</script> 