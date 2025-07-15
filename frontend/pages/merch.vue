<template>
  <div class="min-h-screen bg-gray-900 text-white mt-20">
    <!-- Hero Section -->
    <section class="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-capture text-yellow-400 mb-6">
          MERCH
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-capture-2 mb-8">
          Productos Oficiales Andy Jaque
        </p>
        <p class="text-gray-400 font-body max-w-2xl mx-auto">
          Lleva contigo el estilo del Tour Jaqueando la Cumbia 2025.
        </p>
      </div>
    </section>

    <!-- Coming Soon Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center">
          <div class="bg-gray-800 rounded-xl p-12 border border-yellow-400/20">
            <div class="text-6xl mb-6">👕</div>
            <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-6">
              PRÓXIMAMENTE
            </h2>
            <p class="text-gray-300 font-body text-lg leading-relaxed mb-8">
              Estamos preparando una línea exclusiva de productos oficiales del Tour Jaqueando la Cumbia 2025. 
              Camisetas, gorras, stickers y mucho más.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-gray-700 rounded-lg p-6">
                <div class="text-3xl mb-3">👕</div>
                <h3 class="font-capture text-yellow-400 mb-2">CAMISETAS</h3>
                <p class="text-gray-300 text-sm">Diseños exclusivos del tour</p>
              </div>
              <div class="bg-gray-700 rounded-lg p-6">
                <div class="text-3xl mb-3">🧢</div>
                <h3 class="font-capture text-yellow-400 mb-2">GORRAS</h3>
                <p class="text-gray-300 text-sm">Estilo auténtico cumbia</p>
              </div>
              <div class="bg-gray-700 rounded-lg p-6">
                <div class="text-3xl mb-3">🎵</div>
                <h3 class="font-capture text-yellow-400 mb-2">ACCESORIOS</h3>
                <p class="text-gray-300 text-sm">Stickers, botones y más</p>
              </div>
            </div>
            <p class="text-yellow-400 font-capture-2 text-lg">
              "JAQUEANDO TAMBIÉN EN ESTILO"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pre-Order Interest -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4 text-center">
        <div class="max-w-2xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-6">
            ¿INTERESADO EN NUESTROS PRODUCTOS?
          </h3>
          <p class="text-gray-300 font-body mb-8">
            Contáctanos para ser el primero en conocer cuando estén disponibles nuestros productos oficiales.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:managerandyjaque@gmail.com?subject=Interés en Merchandise"
              class="bg-yellow-400 text-black px-8 py-4 rounded-lg font-capture hover:bg-yellow-300 transition-colors"
            >
              📧 CONTACTAR VÍA EMAIL
            </a>
            <a 
              href="https://wa.me/56965933017?text=Hola! Estoy interesado en los productos de Andy Jaque"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-green-600 text-white px-8 py-4 rounded-lg font-capture hover:bg-green-700 transition-colors"
            >
              💬 WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Tour Exclusive -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-xl p-8 text-center">
            <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-4">
              🎪 EXCLUSIVO EN CONCIERTOS
            </h3>
            <p class="text-gray-300 font-body leading-relaxed mb-6">
              Algunos productos estarán disponibles exclusivamente en los shows del Tour Jaqueando la Cumbia 2025. 
              ¡No te pierdas la oportunidad de llevarte un recuerdo único de cada presentación!
            </p>
            <NuxtLink
              to="/"
              class="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-capture hover:bg-yellow-300 transition-colors"
            >
              VER FECHAS DEL TOUR
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media -->
    <section class="py-16 bg-black/30">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-8">
          SÍGUENOS PARA ACTUALIZACIONES
        </h3>
        <p class="text-gray-300 font-body mb-8">
          Mantente al día con el lanzamiento de nuestros productos oficiales
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
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Merchandise - Andy Jaque | Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Productos oficiales de Andy Jaque. Camisetas, gorras, accesorios y más del Tour Jaqueando la Cumbia 2025.' },
    { name: 'keywords', content: 'Andy Jaque merchandise, productos oficiales, camisetas, gorras, tour 2025' },
    { property: 'og:title', content: 'Merchandise - Andy Jaque' },
    { property: 'og:description', content: 'Productos oficiales del Tour Jaqueando la Cumbia 2025. Próximamente disponibles.' }
  ]
})
</script> 