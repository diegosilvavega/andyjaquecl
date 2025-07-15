<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Biography Content - Ahora aparece inmediatamente -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Photo -->
            <div class="lg:col-span-1">
              <div class="bg-gray-800 rounded-xl overflow-hidden aspect-square">
                <img 
                  src="/images/DSC02151.jpg" 
                  alt="Andy Jaque" 
                  class="w-full h-full object-cover"
                  loading="lazy"
                >
              </div>
            </div>
            
            <!-- Bio Content -->
            <div class="lg:col-span-2 space-y-6">
              <div>
                <h2 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
                  ARTISTA - PRODUCTOR MUSICAL - YOUTUBER
                </h2>
                <p class="text-gray-300 font-body leading-relaxed">
                  Desde la Región de Coquimbo, Chile, Andy Jaque ha conquistado los escenarios con su talento en los teclados y su pasión por la cumbia. Su lema "Jaqueando la Cumbia" refleja su enfoque único y auténtico del género.
                </p>
              </div>
              
              <div>
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
              
              <div>
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

    <!-- Stats Section -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 text-center mb-12">
            EN NÚMEROS
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-capture text-yellow-400 mb-2">
                7,293
              </div>
              <p class="text-gray-300 font-body">
                Oyentes mensuales en Spotify
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-capture text-yellow-400 mb-2">
                8
              </div>
              <p class="text-gray-300 font-body">
                Fechas confirmadas Tour 2025
              </p>
            </div>
            <div class="text-center">
              <div class="text-4xl md:text-5xl font-capture text-yellow-400 mb-2">
                5
              </div>
              <p class="text-gray-300 font-body">
                Redes sociales activas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote Section -->
    <section class="py-16">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <blockquote class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
            "La cumbia es pasión, y desde los teclados transmito esa energía a cada show"
          </blockquote>
          <p class="text-gray-300 font-body">
            - Andy Jaque
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Biografía - Andy Jaque | Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Conoce la historia y trayectoria de Andy Jaque, tecladista de cumbia de la Región de Coquimbo, Chile.' },
    { name: 'keywords', content: 'Andy Jaque biografía, historia, tecladista cumbia, Región de Coquimbo, Chile' },
    { property: 'og:title', content: 'Biografía - Andy Jaque' },
    { property: 'og:description', content: 'La historia del tecladista que está jaqueando la cumbia en Chile.' }
  ]
})
</script> 