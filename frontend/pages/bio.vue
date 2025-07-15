<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Biography Content - Datos Dinámicos -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="text-yellow-400 text-4xl mb-4">👨‍🎤</div>
          <p class="text-gray-300">Cargando biografía...</p>
        </div>

        <!-- Dynamic Biography Content -->
        <div v-else class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Photo -->
            <div class="lg:col-span-1">
              <div class="bg-gray-800 rounded-xl overflow-hidden aspect-square">
                <img 
                  :src="biography?.image || '/images/DSC02151.jpg'" 
                  :alt="biography?.title || 'Andy Jaque'" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
              </div>
            </div>
            
            <!-- Bio Content -->
            <div class="lg:col-span-2 space-y-6">
              <div>
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-capture text-yellow-400 mb-4 text-shadow-lg glow-effect">
                  {{ biography?.title || 'ANDY JAQUE' }}
                </h1>
                <h2 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
                  {{ biography?.subtitle || 'ARTISTA - PRODUCTOR MUSICAL - YOUTUBER' }}
                </h2>
                <p class="text-gray-300 font-body leading-relaxed">
                  {{ biography?.mainText || 'Desde la Región de Coquimbo, Chile, Andy Jaque ha conquistado los escenarios con su talento en los teclados y su pasión por la cumbia. Su lema "Jaqueando la Cumbia" refleja su enfoque único y auténtico del género.' }}
                </p>
              </div>
              
              <!-- Career Highlights -->
              <div v-if="biography?.careerHighlights && biography.careerHighlights.length > 0">
                <h3 class="text-xl font-capture text-yellow-400 mb-3">
                  LOGROS DESTACADOS
                </h3>
                <ul class="space-y-2">
                  <li v-for="highlight in biography.careerHighlights" :key="highlight" class="text-gray-300 font-body leading-relaxed flex items-start">
                    <span class="text-yellow-400 mr-2">🏆</span>
                    {{ highlight }}
                  </li>
                </ul>
              </div>

              <!-- Fallback content if no dynamic data -->
              <div v-if="!biography?.mainText">
                <h3 class="text-xl font-capture text-yellow-400 mb-3">
                  TRAYECTORIA MUSICAL
                </h3>
                <p class="text-gray-300 font-body leading-relaxed mb-4">
                  Con más de 7,293 oyentes mensuales en Spotify, Andy Jaque se ha posicionado como uno de los tecladistas de cumbia más reconocidos de Chile. Su versatilidad y técnica lo han llevado a presentarse en los principales escenarios del país.
                </p>
                <p class="text-gray-300 font-body leading-relaxed">
                  Como productor musical, ha trabajado en diversos proyectos que fusionan la cumbia tradicional con elementos modernos, creando un sonido único que caracteriza su propuesta artística.
                </p>
              </div>
              
              <div v-if="!biography?.careerHighlights || biography.careerHighlights.length === 0">
                <h3 class="text-xl font-capture text-yellow-400 mb-3">
                  JAQUEANDO LA CUMBIA 2025 TOUR
                </h3>
                <p class="text-gray-300 font-body leading-relaxed">
                  El tour 2025 representa el punto más alto de su carrera, recorriendo Chile de norte a sur con "el repertorio más grande de Chile". Cada presentación es una celebración de la cumbia y una muestra del talento que lo ha convertido en referente del género.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quotes Section -->
    <section class="py-16 bg-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Dynamic Quote -->
          <div v-if="biography?.quote" class="text-center">
            <blockquote class="text-xl md:text-2xl font-capture text-yellow-400 italic mb-4">
              "{{ biography.quote }}"
            </blockquote>
            <p class="text-gray-300 font-body">
              - {{ biography?.quoteAuthor || biography?.title || 'Andy Jaque' }}
            </p>
          </div>

          <!-- Fallback Quote -->
          <div v-else class="text-center">
            <blockquote class="text-xl md:text-2xl font-capture text-yellow-400 italic mb-4">
              "La cumbia es un sentimiento que se vive, se respira y se transmite. Mi misión es llevar esa esencia a cada rincón de Chile."
            </blockquote>
            <p class="text-gray-300 font-body">
              - Andy Jaque
            </p>
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
const { loadContent, biography, loading } = useAdminContent()

// Cargar contenido al montar la página
onMounted(async () => {
  await loadContent()
})

useHead({
  title: computed(() => `Biografía - ${biography.value?.title || 'Andy Jaque'} | Tour Jaqueando la Cumbia 2025`),
  meta: [
    { name: 'description', content: computed(() => biography.value?.mainText || 'Conoce la historia y trayectoria de Andy Jaque, tecladista de cumbia de la Región de Coquimbo, Chile.') },
    { name: 'keywords', content: 'Andy Jaque biografía, historia, tecladista cumbia, Región de Coquimbo, Chile' },
    { property: 'og:title', content: computed(() => `Biografía - ${biography.value?.title || 'Andy Jaque'}`) },
    { property: 'og:description', content: computed(() => biography.value?.mainText || 'La historia del tecladista que está jaqueando la cumbia en Chile.') }
  ]
})
</script> 