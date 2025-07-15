<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-capture text-yellow-400 mb-6">
          MÚSICA
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-capture-2 mb-8">
          Releases y Singles de Andy Jaque
        </p>
        <p class="text-gray-400 font-body max-w-2xl mx-auto">
          Descubre toda la música de Andy Jaque. Desde sus éxitos más populares hasta sus últimos lanzamientos.
        </p>
      </div>
    </section>

    <!-- Spotify Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-4">
            ESCÚCHANOS EN SPOTIFY
          </h2>
          <p class="text-gray-300 font-body mb-8">
            Más de 7,293 oyentes mensuales
          </p>
          <a 
            href="https://open.spotify.com/intl-es/artist/2Dva1pArOWbj8tgHq6jTCw"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-capture text-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            ESCUCHAR EN SPOTIFY
          </a>
        </div>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
            🎵 PRÓXIMAMENTE 🎵
          </h3>
          <p class="text-gray-300 font-body mb-8">
            Nuevos releases y singles en camino. Mantente atento a nuestras redes sociales para las últimas novedades.
          </p>
          <p class="text-yellow-400 font-capture-2 text-lg">
            "LA MÚSICA NO PARA"
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
  title: 'Música - Andy Jaque | Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Descubre toda la música de Andy Jaque. Releases, singles y más en Spotify. Más de 7,293 oyentes mensuales.' },
    { name: 'keywords', content: 'Andy Jaque música, Spotify, releases, singles, cumbia, música chilena' },
    { property: 'og:title', content: 'Música - Andy Jaque' },
    { property: 'og:description', content: 'Descubre toda la música de Andy Jaque en Spotify. Más de 7,293 oyentes mensuales.' }
  ]
})
</script> 