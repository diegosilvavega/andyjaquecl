<template>
  <div class="min-h-screen bg-gray-900 text-white mt-20">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-capture text-yellow-400 mb-6">
          VIDEOS
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-capture-2 mb-8">
          Shows, Covers y Contenido Exclusivo
        </p>
        <p class="text-gray-400 font-body max-w-2xl mx-auto">
          Mira los mejores momentos, covers y contenido exclusivo de Andy Jaque en YouTube.
        </p>
      </div>
    </section>

    <!-- YouTube Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-12">
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
            VER EN YOUTUBE
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