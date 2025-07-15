<template>
  <div class="min-h-screen bg-gray-900 text-white mt-20">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-capture text-yellow-400 mb-6">
          NEWS
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-capture-2 mb-8">
          Últimas Noticias y Novedades
        </p>
        <p class="text-gray-400 font-body max-w-2xl mx-auto">
          Mantente al día con las últimas novedades del Tour Jaqueando la Cumbia 2025.
        </p>
      </div>
    </section>

    <!-- Latest News -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto space-y-8">
          <!-- Main News Item -->
          <article class="bg-gray-800 rounded-xl p-8 border border-yellow-400/20">
            <div class="flex items-center gap-2 mb-4">
              <span class="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-capture">
                ¡ÚLTIMO!
              </span>
              <span class="text-gray-400 text-sm">
                Enero 2025
              </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
              ¡ATENCIÓN! Seguimos agendando fechas al Tour Jaqueando la Cumbia 2025
            </h2>
            <p class="text-gray-300 font-body leading-relaxed mb-4">
              No te lo pierdas, el repertorio más grande de Chile está recorriendo el país. Nuevas fechas se siguen confirmando para este 2025.
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-capture">
                #Tour2025
              </span>
              <span class="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-lg text-sm font-capture">
                #JaqueandoLaCumbia
              </span>
            </div>
          </article>

          <!-- Secondary News Items -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article class="bg-gray-800 rounded-xl p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-gray-400 text-sm">
                  Spotify
                </span>
              </div>
              <h3 class="text-xl font-capture text-yellow-400 mb-3">
                Más de 7,293 oyentes mensuales
              </h3>
              <p class="text-gray-300 font-body text-sm">
                Andy Jaque continúa creciendo en plataformas digitales, alcanzando nuevos oyentes cada mes.
              </p>
            </article>

            <article class="bg-gray-800 rounded-xl p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-gray-400 text-sm">
                  Redes Sociales
                </span>
              </div>
              <h3 class="text-xl font-capture text-yellow-400 mb-3">
                Síguenos en todas las plataformas
              </h3>
              <p class="text-gray-300 font-body text-sm">
                Instagram, Facebook, TikTok, YouTube y Spotify. Contenido exclusivo y actualizaciones diarias.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Upcoming Events Alert -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
            📅 PRÓXIMAS FECHAS CONFIRMADAS
          </h3>
          <div class="space-y-2 text-gray-300 font-body">
            <p>12 JUL - Vicuña (Pub Delorean)</p>
            <p>19 JUL - Ovalle (Ovalle Casino Resort)</p>
            <p>2 AGO - Coquimbo (Aniversario - OVO Beach)</p>
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