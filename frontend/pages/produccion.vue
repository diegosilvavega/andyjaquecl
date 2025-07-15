<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <p class="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto mb-4 font-capture-2">
          Convierte tu idea musical en una obra maestra
        </p>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Servicio completo de producción musical personalizada. Desde la composición hasta el master final.
        </p>
        
        <!-- Main CTA -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
            🎵 SOLICITAR COTIZACIÓN
          </button>
          <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300">
            📱 CONSULTA GRATUITA
          </button>
        </div>

        <!-- Value Proposition -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">🎹</div>
            <h3 class="text-white font-capture text-lg mb-2">EQUIPOS PROFESIONALES</h3>
            <p class="text-gray-300 text-sm">Estudio completamente equipado con tecnología de vanguardia</p>
          </div>
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">⚡</div>
            <h3 class="text-white font-capture text-lg mb-2">ENTREGA RÁPIDA</h3>
            <p class="text-gray-300 text-sm">Proyectos terminados en 7-15 días hábiles</p>
          </div>
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">🎯</div>
            <h3 class="text-white font-capture text-lg mb-2">100% PERSONALIZADO</h3>
            <p class="text-gray-300 text-sm">Cada proyecto único y adaptado a tu visión</p>
          </div>
        </div>
      </div>
    </section>

         <!-- Pricing Packages - Datos Dinámicos -->
     <section class="py-16 bg-gray-800">
       <div class="container mx-auto px-4">
         <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-4 text-shadow-lg glow-effect">
           PAQUETES DE PRODUCCIÓN
         </h2>
         <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
           Elige el paquete que mejor se adapte a tu proyecto musical
         </p>

         <!-- Loading State -->
         <div v-if="loading" class="text-center py-12">
           <div class="text-yellow-400 text-4xl mb-4">🎵</div>
           <p class="text-gray-300">Cargando servicios de producción...</p>
         </div>
         
         <!-- Dynamic Production Services -->
         <div v-else-if="activeServices.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <div 
             v-for="(service, index) in activeServices" 
             :key="service.id"
             :class="[
               'bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border hover:border-opacity-40 transition-all duration-300',
               index === 1
                 ? 'border-2 border-yellow-400 transform scale-105 relative' 
                 : 'border border-yellow-400 border-opacity-20'
             ]"
           >
             <!-- Popular Badge -->
             <div v-if="index === 1" class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-capture font-bold">
               MÁS SOLICITADO
             </div>
             
             <div class="text-center mb-6">
               <h3 class="text-2xl font-capture text-yellow-400 mb-2">{{ service.name.toUpperCase() }}</h3>
               <p class="text-gray-300 text-sm mb-4">{{ service.description }}</p>
               
               <!-- Pricing -->
               <div v-if="service.discountPercentage > 0" class="flex items-center justify-center gap-2 mb-2">
                 <span class="text-2xl text-gray-500 line-through">${{ formatPrice(service.originalPrice) }}</span>
                 <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-{{ service.discountPercentage }}%</span>
               </div>
               <div class="text-4xl font-capture text-white mb-2">${{ formatPrice(service.currentPrice) }}</div>
               <div class="text-gray-400 text-sm">CLP{{ service.deliveryTime ? ` / ${service.deliveryTime}` : '' }}</div>
             </div>
             
             <!-- Features List -->
             <ul class="space-y-3 text-sm text-gray-300 mb-8">
               <li v-for="feature in service.includes" :key="feature" class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 {{ feature }}
               </li>
             </ul>
             
             <!-- CTA Button -->
             <button 
               :class="[
                 'w-full px-6 py-3 rounded-lg font-capture font-bold transition-all duration-300',
                 index === 1
                   ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                   : 'bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black'
               ]"
             >
               SOLICITAR COTIZACIÓN
             </button>
           </div>
         </div>

         <!-- Empty State -->
         <div v-else-if="!loading" class="text-center py-12">
           <div class="text-6xl mb-4">🎵</div>
           <p class="text-gray-400 text-lg">No hay servicios de producción disponibles</p>
           <p class="text-gray-500 text-sm mt-2">Los servicios se gestionan desde el panel de administración</p>
         </div>

         <!-- Fallback - Original hardcoded content if no dynamic data -->
         <div v-if="!loading && activeServices.length === 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
           <!-- Paquete Básico -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="text-center mb-6">
               <h3 class="text-2xl font-capture text-yellow-400 mb-2">PRODUCCIÓN BÁSICA</h3>
               <p class="text-gray-300 text-sm mb-4">Ideal para demos y maquetas</p>
               <div class="flex items-center justify-center gap-2 mb-2">
                 <span class="text-2xl text-gray-500 line-through">$220.000</span>
                 <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-32%</span>
               </div>
               <div class="text-4xl font-capture text-white mb-2">$150.000</div>
               <div class="text-gray-400 text-sm">CLP / por canción</div>
             </div>
             <ul class="space-y-3 text-sm text-gray-300 mb-8">
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Grabación básica (hasta 5 pistas)
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Arreglos simples
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Mezcla básica
               </li>
             </ul>
             <button class="w-full bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg font-capture font-bold transition-all duration-300">
               SOLICITAR COTIZACIÓN
             </button>
           </div>
         </div>
         
         <!-- Additional Services -->
         <div class="mt-12 text-center">
           <h3 class="text-xl font-capture text-yellow-400 mb-6">SERVICIOS ADICIONALES</h3>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
             <div class="bg-black bg-opacity-30 rounded-lg p-4">
               <h4 class="text-white font-capture mb-2">ARREGLOS ÚNICOS</h4>
               <p class="text-gray-300 text-sm mb-2">Desde $80.000</p>
               <p class="text-gray-400 text-xs">Arreglos personalizados para tu estilo</p>
             </div>
             <div class="bg-black bg-opacity-30 rounded-lg p-4">
               <h4 class="text-white font-capture mb-2">MEZCLA Y MASTER</h4>
               <p class="text-gray-300 text-sm mb-2">Desde $100.000</p>
               <p class="text-gray-400 text-xs">Para canciones ya grabadas</p>
             </div>
             <div class="bg-black bg-opacity-30 rounded-lg p-4">
               <h4 class="text-white font-capture mb-2">MÚSICOS SESIONISTAS</h4>
               <p class="text-gray-300 text-sm mb-2">Desde $50.000</p>
               <p class="text-gray-400 text-xs">Por instrumento y canción</p>
             </div>
           </div>
         </div>
       </div>
     </section>

         <!-- Portfolio Section -->
     <section class="py-16 bg-gray-900">
       <div class="container mx-auto px-4">
         <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-4 text-shadow-lg glow-effect">
           PORTAFOLIO DE TRABAJOS
         </h2>
         <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
           Algunos de los proyectos más destacados que he producido para artistas y bandas
         </p>
         
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
           <!-- Trabajo 1 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="flex flex-col md:flex-row gap-6">
               <div class="md:w-1/2">
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
                   <img 
                     src="/images/DSC02151.jpg" 
                     alt="Banda Tropical Sureña"
                     class="w-full h-full object-cover"
                   />
                 </div>
                 <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 text-center">
                   <p class="text-yellow-400 font-capture text-sm">
                     🎵 DISPONIBLE EN SPOTIFY
                   </p>
                 </div>
               </div>
               <div class="md:w-1/2">
                 <h3 class="text-xl font-capture text-yellow-400 mb-2">EP "CUMBIA DEL SUR"</h3>
                 <p class="text-gray-400 text-sm mb-3">Banda Tropical Sureña • 2024</p>
                 <p class="text-gray-300 text-sm mb-4">
                   Producción completa de 4 canciones incluyendo arreglos, grabación, mezcla y master. 
                   Proyecto que fusiona cumbia tradicional con elementos modernos.
                 </p>
                 <div class="space-y-2 text-sm">
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎹</span>
                     Arreglos de teclado y sintetizadores
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎤</span>
                     Grabación vocal y coros
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎵</span>
                     Mezcla y masterización
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">📈</span>
                     +50k reproducciones
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <!-- Trabajo 2 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="flex flex-col md:flex-row gap-6">
               <div class="md:w-1/2">
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
                   <img 
                     src="/images/andyfoto1.jpg" 
                     alt="Solista Independiente"
                     class="w-full h-full object-cover"
                   />
                 </div>
                 <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 text-center">
                   <p class="text-yellow-400 font-capture text-sm">
                     🎬 VIDEOCLIP INCLUIDO
                   </p>
                 </div>
               </div>
               <div class="md:w-1/2">
                 <h3 class="text-xl font-capture text-yellow-400 mb-2">SINGLE "NOCHES DE BARRIO"</h3>
                 <p class="text-gray-400 text-sm mb-3">Artista Independiente • 2024</p>
                 <p class="text-gray-300 text-sm mb-4">
                   Producción integral que incluye composición, arreglos, grabación y videoclip oficial. 
                   Proyecto que alcanzó gran éxito en redes sociales.
                 </p>
                 <div class="space-y-2 text-sm">
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">✏️</span>
                     Co-composición musical
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎹</span>
                     Producción completa
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎬</span>
                     Dirección de videoclip
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">📱</span>
                     +100k views YouTube
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <!-- Trabajo 3 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="flex flex-col md:flex-row gap-6">
               <div class="md:w-1/2">
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
                   <img 
                     src="/images/DSC02151.jpg" 
                     alt="Grupo Juvenil"
                     class="w-full h-full object-cover"
                   />
                 </div>
                 <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 text-center">
                   <p class="text-yellow-400 font-capture text-sm">
                     🏆 PROYECTO GANADOR
                   </p>
                 </div>
               </div>
               <div class="md:w-1/2">
                 <h3 class="text-xl font-capture text-yellow-400 mb-2">ARREGLOS "CONCURSO NACIONAL"</h3>
                 <p class="text-gray-400 text-sm mb-3">Grupo Juvenil Los Jaques • 2024</p>
                 <p class="text-gray-300 text-sm mb-4">
                   Arreglos especiales para competencia nacional de cumbia. Trabajo enfocado en destacar 
                   las fortalezas del grupo y crear una propuesta única.
                 </p>
                 <div class="space-y-2 text-sm">
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎼</span>
                     Arreglos orquestales
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎹</span>
                     Programación MIDI
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎤</span>
                     Coaching vocal
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🥇</span>
                     1er lugar nacional
                   </div>
                 </div>
               </div>
             </div>
           </div>

           <!-- Trabajo 4 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="flex flex-col md:flex-row gap-6">
               <div class="md:w-1/2">
                 <div class="aspect-square bg-gray-800 rounded-lg overflow-hidden mb-4">
                   <img 
                     src="/images/andyfoto1.jpg" 
                     alt="Álbum Familiar"
                     class="w-full h-full object-cover"
                   />
                 </div>
                 <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 text-center">
                   <p class="text-yellow-400 font-capture text-sm">
                     💿 ÁLBUM COMPLETO
                   </p>
                 </div>
               </div>
               <div class="md:w-1/2">
                 <h3 class="text-xl font-capture text-yellow-400 mb-2">ÁLBUM "TRADICIÓN FAMILIAR"</h3>
                 <p class="text-gray-400 text-sm mb-3">Familia Musical Contreras • 2023</p>
                 <p class="text-gray-300 text-sm mb-4">
                   Producción de álbum completo de 8 canciones tradicionales de cumbia chilena. 
                   Trabajo que rescata y moderniza clásicos familiares.
                 </p>
                 <div class="space-y-2 text-sm">
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">📀</span>
                     8 canciones producidas
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎻</span>
                     Instrumentos tradicionales
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">🎵</span>
                     Mezcla analógica
                   </div>
                   <div class="flex items-center text-gray-300">
                     <span class="text-yellow-400 mr-2">💿</span>
                     Distribución nacional
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <!-- Portfolio CTA -->
         <div class="text-center mt-16">
           <div class="bg-yellow-400 bg-opacity-20 rounded-xl p-8 max-w-2xl mx-auto border border-yellow-400 border-opacity-30">
             <h3 class="text-2xl font-capture text-yellow-400 mb-4">
               ¿QUIERES VER MÁS TRABAJOS?
             </h3>
             <p class="text-gray-300 mb-6">
               Estos son solo algunos ejemplos. Tengo un portafolio completo con más de 50 proyectos realizados.
             </p>
             <div class="flex flex-col sm:flex-row gap-4 justify-center">
               <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-capture font-bold transition-all duration-300 transform hover:scale-105">
                 📂 VER PORTAFOLIO COMPLETO
               </button>
               <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 rounded-lg font-capture font-bold transition-all duration-300">
                 🎵 ESCUCHAR DEMOS
               </button>
             </div>
           </div>
         </div>
       </div>
     </section>

         <!-- Success Stories -->
     <section class="py-16 bg-gray-900">
       <div class="container mx-auto px-4">
         <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-6 text-shadow-lg glow-effect">
           PROYECTOS EXITOSOS
         </h2>
         <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
           Artistas que han confiado en mi trabajo para llevar su música al siguiente nivel
         </p>
         
         <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <!-- Caso 1 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 text-center">
             <div class="text-yellow-400 text-4xl mb-4">🎵</div>
             <h3 class="text-white font-capture text-lg mb-2">BANDA TROPICAL SUREÑA</h3>
             <p class="text-gray-300 text-sm mb-4">
               Producción completa de EP "Cumbia del Sur" - 4 canciones
             </p>
             <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 mb-4">
               <p class="text-yellow-400 font-capture text-sm">
                 +50.000 reproducciones en Spotify
               </p>
             </div>
             <p class="text-gray-400 text-xs italic">
               "Andy transformó nuestras ideas en un sonido profesional que nos abrió las puertas del mercado."
             </p>
           </div>

           <!-- Caso 2 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 text-center">
             <div class="text-yellow-400 text-4xl mb-4">🎬</div>
             <h3 class="text-white font-capture text-lg mb-2">SOLISTA INDEPENDIENTE</h3>
             <p class="text-gray-300 text-sm mb-4">
               Producción + Videoclip "Noches de Barrio"
             </p>
             <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 mb-4">
               <p class="text-yellow-400 font-capture text-sm">
                 +100.000 views en YouTube
               </p>
             </div>
             <p class="text-gray-400 text-xs italic">
               "El videoclip fue clave para el éxito de mi canción. Trabajo increíble."
             </p>
           </div>

           <!-- Caso 3 -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 text-center">
             <div class="text-yellow-400 text-4xl mb-4">🎹</div>
             <h3 class="text-white font-capture text-lg mb-2">GRUPO JUVENIL</h3>
             <p class="text-gray-300 text-sm mb-4">
               Arreglos y producción para competencia nacional
             </p>
             <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-3 mb-4">
               <p class="text-yellow-400 font-capture text-sm">
                 🏆 1er lugar en concurso
               </p>
             </div>
             <p class="text-gray-400 text-xs italic">
               "Los arreglos de Andy nos ayudaron a ganar el concurso más importante del año."
             </p>
           </div>
         </div>
         
         <!-- CTA -->
         <div class="text-center mt-12">
           <p class="text-gray-300 mb-6">
             ¿Quieres que tu música tenga el mismo impacto?
           </p>
           <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-10 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300 transform hover:scale-105">
             COMENZAR MI PROYECTO AHORA
           </button>
         </div>
       </div>
     </section>

         <!-- Final CTA Section -->
     <section class="py-16 bg-gray-800">
       <div class="container mx-auto px-4">
         <div class="max-w-4xl mx-auto text-center">
           <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-6 text-shadow-lg glow-effect">
             ¡CONVIERTE TU IDEA EN REALIDAD!
           </h2>
           <p class="text-xl text-gray-300 mb-4">
             Tu música merece sonar profesional. Hagamos que suceda.
           </p>
           <p class="text-lg text-gray-400 mb-8">
             Cada proyecto es único. Trabajamos contigo hasta lograr el sonido perfecto.
           </p>
           
           <!-- Process Steps -->
           <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
             <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
               <div class="text-yellow-400 text-3xl mb-3">1️⃣</div>
               <h3 class="text-white font-capture text-lg mb-2">CONSULTA GRATUITA</h3>
               <p class="text-gray-300 text-sm">Conversamos sobre tu proyecto y objetivos</p>
             </div>
             <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
               <div class="text-yellow-400 text-3xl mb-3">2️⃣</div>
               <h3 class="text-white font-capture text-lg mb-2">COTIZACIÓN PERSONALIZADA</h3>
               <p class="text-gray-300 text-sm">Creamos un presupuesto específico para ti</p>
             </div>
             <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
               <div class="text-yellow-400 text-3xl mb-3">3️⃣</div>
               <h3 class="text-white font-capture text-lg mb-2">PRODUCCIÓN PROFESIONAL</h3>
               <p class="text-gray-300 text-sm">Trabajamos juntos hasta el resultado perfecto</p>
             </div>
           </div>
           
           <!-- Final CTA Buttons -->
           <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
             <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-6 rounded-lg font-capture text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
               🎵 SOLICITAR COTIZACIÓN GRATUITA
             </button>
             <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-12 py-6 rounded-lg font-capture text-xl font-bold transition-all duration-300">
               📱 CONSULTA INMEDIATA
             </button>
           </div>
           
           <!-- Contact Info -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20">
             <h3 class="text-yellow-400 font-capture text-xl mb-4">CONTACTO DIRECTO</h3>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div class="text-center">
                 <div class="text-yellow-400 text-2xl mb-2">📱</div>
                 <h4 class="font-capture text-white mb-2">WhatsApp</h4>
                 <a href="tel:+56965933017" class="text-yellow-400 hover:text-yellow-300 transition-colors">
                   +56 9 6593 3017
                 </a>
               </div>
               <div class="text-center">
                 <div class="text-yellow-400 text-2xl mb-2">📧</div>
                 <h4 class="font-capture text-white mb-2">Email</h4>
                 <a href="mailto:managerandyjaque@gmail.com" class="text-yellow-400 hover:text-yellow-300 transition-colors">
                   managerandyjaque@gmail.com
                 </a>
               </div>
             </div>
             <div class="mt-6 pt-6 border-t border-yellow-400 border-opacity-20">
               <p class="text-gray-400 text-sm">
                 Primera consulta gratuita • Cotización en menos de 24 horas
               </p>
             </div>
           </div>
           
           <!-- Guarantee -->
           <div class="mt-8 bg-green-600 bg-opacity-20 border border-green-500 rounded-xl p-6 backdrop-blur-sm">
             <h3 class="text-green-400 font-capture text-lg mb-2">✅ GARANTÍA DE CALIDAD</h3>
             <p class="text-white">
               Si no estás 100% satisfecho con el resultado, trabajamos hasta lograrlo o te devolvemos tu dinero.
             </p>
           </div>
         </div>
       </div>
     </section>
  </div>
</template>

<script setup lang="ts">
// 🎯 DATOS DINÁMICOS DESDE EL PANEL DE ADMIN
const { loadPrices, productionServices, loading } = useAdminPrices()

// Cargar precios al montar la página
onMounted(async () => {
  await loadPrices()
})

// Servicios activos desde el panel de administración
const activeServices = computed(() => 
  productionServices.value.filter((service: any) => service.isActive)
)

// Función para formatear precios
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CL').format(price)
}

useHead({
  title: 'Producción Musical Profesional - Andy Jaque',
  meta: [
    { name: 'description', content: 'Servicios de producción musical personalizada con Andy Jaque. Desde $150.000 - Cotización gratuita.' },
    { name: 'keywords', content: 'producción musical, videoclips, arreglos, estudio grabación, mezcla, master, Andy Jaque' }
  ]
})
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style> 