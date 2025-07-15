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

      <!-- Videos Section -->
      <div class="max-w-none mx-auto px-4">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-12 max-w-8xl mx-auto">
          <!-- Video 1 -->
          <div class="bg-black/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-yellow-400/20">
            <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
              <iframe
                class="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/8Fk-3Z08XdQ"
                title="Andy Jaque - Lanzamiento 1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            
            <!-- Video 1 Info -->
            <div class="mt-4 text-center">
              <a 
                href="https://www.youtube.com/watch?v=8Fk-3Z08XdQ" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture transition-colors inline-flex items-center gap-2 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                VER EN YOUTUBE
              </a>
            </div>
          </div>

          <!-- Video 2 -->
          <div class="bg-black/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm border border-yellow-400/20">
            <div class="relative w-full" style="padding-bottom: 56.25%; height: 0;">
              <iframe
                class="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube.com/embed/tTRCvsyCnC8"
                title="Andy Jaque - Lanzamiento 2"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            
            <!-- Video 2 Info -->
            <div class="mt-4 text-center">
              <a 
                href="https://www.youtube.com/watch?v=tTRCvsyCnC8" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture transition-colors inline-flex items-center gap-2 text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                VER EN YOUTUBE
              </a>
            </div>
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
// Componente para mostrar los últimos lanzamientos de Andy Jaque
</script>

<style scoped>
/* Estilos específicos para este componente */
</style> 