<template>
  <div>
    <!-- Hero Section -->
    <Hero />
    
    <!-- Upcoming Events Section -->
    <UpcomingEvents />
    
    <!-- Latest Release Section -->
    <LatestRelease />
    
    <!-- Live Concert Video Section -->
    <section class="relative h-screen overflow-hidden">
      <!-- Background Video -->
      <video 
        class="absolute inset-0 w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4">
        Tu navegador no soporta videos HTML5.
      </video>
      
      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 flex items-center justify-center h-full">
        <div class="text-center text-white px-4">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-capture text-yellow-400 mb-3 text-shadow-lg glow-effect">
            EN VIVO
          </h2>
          <p class="text-lg md:text-xl lg:text-2xl font-capture-2 mb-4 text-shadow-lg">
            JAQUEANDO LA CUMBIA
          </p>
          <p class="text-base md:text-lg text-gray-300 max-w-xl mx-auto mb-6 text-shadow-lg">
            Vive la experiencia única de la cumbia en directo
          </p>
          
          <!-- CTA Button -->
          <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture text-base font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
            🎫 AGENDA TU EVENTO
          </button>
        </div>
      </div>
      
      <!-- Scroll Down Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div class="animate-bounce">
          <div class="w-6 h-10 border-2 border-yellow-400 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
// SEO específico para la página de inicio
useHead({
  title: 'Andy Jaque - Tour Jaqueando la Cumbia 2025 | Sitio Oficial',
  meta: [
    { name: 'description', content: 'Sitio oficial de Andy Jaque. Tour Jaqueando la Cumbia 2025. Conoce las próximas fechas, agenda tu evento y vive la cumbia desde los teclados hasta tu corazón.' },
    { name: 'keywords', content: 'Andy Jaque, cumbia, tecladista, música chilena, eventos, conciertos, tour 2025, agenda evento' },
    { property: 'og:title', content: 'Andy Jaque - Tour Jaqueando la Cumbia 2025' },
    { property: 'og:description', content: 'El tour más esperado del año. Andy Jaque recorre Chile con su Tour Jaqueando la Cumbia 2025.' },
    { property: 'og:url', content: 'https://andyjaque.cl' },
    { property: 'og:image', content: 'https://andyjaque.cl/og-image.jpg' },
    { name: 'twitter:title', content: 'Andy Jaque - Tour Jaqueando la Cumbia 2025' },
    { name: 'twitter:description', content: 'El tour más esperado del año. Andy Jaque recorre Chile con su Tour Jaqueando la Cumbia 2025.' },
    { name: 'twitter:image', content: 'https://andyjaque.cl/og-image.jpg' }
  ]
})

// 🎯 CARGAR DATOS DINÁMICOS DEL PANEL DE ADMIN
const { loadEvents } = useAdminEvents()
const { loadMedia } = useAdminMedia()

// Cargar todos los datos necesarios para la página principal
onMounted(async () => {
  await Promise.all([
    loadEvents(),
    loadMedia()
  ])
})
</script> 