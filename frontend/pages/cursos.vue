<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Hero Section -->
    <section class="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <p class="text-xl md:text-2xl lg:text-3xl text-white max-w-4xl mx-auto mb-4 font-capture-2">
          Aprende Teclado y Producción Musical con un Profesional
        </p>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Clases personalizadas 1 a 1 con Andy Jaque. Resultados garantizados en 30 días o tu dinero de vuelta.
        </p>
        
        <!-- Main CTA -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
            📅 AGENDA TU CLASE GRATUITA
          </button>
          <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300">
            💰 SOLICITAR COTIZACIÓN
          </button>
        </div>

        <!-- Value Proposition -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">🎯</div>
            <h3 class="text-white font-capture text-lg mb-2">RESULTADOS RÁPIDOS</h3>
            <p class="text-gray-300 text-sm">Toca tu primera canción en 2 semanas</p>
          </div>
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">👨‍🏫</div>
            <h3 class="text-white font-capture text-lg mb-2">PROFESOR EXPERTO</h3>
            <p class="text-gray-300 text-sm">+10 años de experiencia profesional</p>
          </div>
          <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
            <div class="text-yellow-400 text-3xl mb-3">⭐</div>
            <h3 class="text-white font-capture text-lg mb-2">GARANTÍA 100%</h3>
            <p class="text-gray-300 text-sm">Satisfacción garantizada o devolvemos tu dinero</p>
          </div>
        </div>
      </div>
    </section>

         <!-- Pricing Section -->
     <section class="py-16 bg-gray-800">
       <div class="container mx-auto px-4">
         <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-4 text-shadow-lg glow-effect">
           PAQUETES Y PRECIOS
         </h2>
         <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
           Elige el paquete que mejor se adapte a tus necesidades y objetivos musicales
         </p>
         
         <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           <!-- Paquete Básico -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="text-center mb-6">
               <h3 class="text-2xl font-capture text-yellow-400 mb-2">BÁSICO</h3>
               <p class="text-gray-300 text-sm mb-4">Perfect para empezar</p>
               <div class="flex items-center justify-center gap-2 mb-2">
                 <span class="text-2xl text-gray-500 line-through">$45.000</span>
                 <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-33%</span>
               </div>
               <div class="text-4xl font-capture text-white mb-2">$30.000</div>
               <div class="text-gray-400 text-sm">CLP / clase individual</div>
             </div>
             <ul class="space-y-3 text-sm text-gray-300 mb-8">
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Clase individual 1 hora
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Presencial u online
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Material didáctico incluido
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Grabación de la clase
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Seguimiento personalizado
               </li>
             </ul>
             <button class="w-full bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg font-capture font-bold transition-all duration-300">
               SOLICITAR COTIZACIÓN
             </button>
           </div>

           <!-- Paquete Popular -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border-2 border-yellow-400 hover:border-opacity-60 transition-all duration-300 transform scale-105 relative">
             <div class="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-capture font-bold">
               MÁS POPULAR
             </div>
             <div class="text-center mb-6">
               <h3 class="text-2xl font-capture text-yellow-400 mb-2">INTERMEDIO</h3>
               <p class="text-gray-300 text-sm mb-4">Ideal para progreso rápido</p>
               <div class="flex items-center justify-center gap-2 mb-2">
                 <span class="text-2xl text-gray-500 line-through">$140.000</span>
                 <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">-29%</span>
               </div>
               <div class="text-4xl font-capture text-white mb-2">$100.000</div>
               <div class="text-gray-400 text-sm">CLP / 4 clases mensuales</div>
               <div class="text-green-400 text-xs mt-1">Ahorra $40.000</div>
             </div>
             <ul class="space-y-3 text-sm text-gray-300 mb-8">
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 4 clases mensuales de 1 hora
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Presencial u online
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Material didáctico premium
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Grabación de todas las clases
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Soporte WhatsApp 24/7
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Plan de estudios personalizado
               </li>
             </ul>
             <button class="w-full bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-all duration-300 transform hover:scale-105">
               INSCRIBIRSE AHORA
             </button>
           </div>

           <!-- Paquete Premium -->
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 hover:border-opacity-40 transition-all duration-300">
             <div class="text-center mb-6">
               <h3 class="text-2xl font-capture text-yellow-400 mb-2">PREMIUM</h3>
               <p class="text-gray-300 text-sm mb-4">Para músicos serios</p>
               <div class="text-4xl font-capture text-white mb-2">$180.000</div>
               <div class="text-gray-400 text-sm">CLP / 8 clases mensuales</div>
               <div class="text-green-400 text-xs mt-1">Ahorra $60.000</div>
             </div>
             <ul class="space-y-3 text-sm text-gray-300 mb-8">
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 8 clases mensuales de 1 hora
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Presencial u online
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Material didáctico premium
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Grabación de todas las clases
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Soporte WhatsApp 24/7
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Plan de estudios personalizado
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Masterclass grupal mensual
               </li>
               <li class="flex items-center">
                 <span class="text-yellow-400 mr-2">✓</span>
                 Acceso a biblioteca de recursos
               </li>
             </ul>
             <button class="w-full bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-6 py-3 rounded-lg font-capture font-bold transition-all duration-300">
               SOLICITAR COTIZACIÓN
             </button>
           </div>
         </div>
       </div>
     </section>

         <!-- Free Consultation Section -->
     <section class="py-16 bg-gray-900">
       <div class="container mx-auto px-4">
         <div class="max-w-4xl mx-auto text-center">
           <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-6 text-shadow-lg glow-effect">
             AGENDA TU CLASE GRATUITA
           </h2>
           <p class="text-xl text-gray-300 mb-4">
             Conoce mi metodología y recibe una evaluación personalizada sin costo
           </p>
           <p class="text-gray-400 mb-8">
             En esta sesión de 30 minutos evaluaremos tu nivel actual y crearemos un plan de estudios personalizado
           </p>
           
           <div class="bg-black bg-opacity-40 rounded-xl p-8 backdrop-blur-sm border border-yellow-400 border-opacity-20 max-w-2xl mx-auto">
             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div class="text-center">
                 <div class="text-yellow-400 text-4xl mb-3">📋</div>
                 <h3 class="text-white font-capture text-lg mb-2">EVALUACIÓN GRATUITA</h3>
                 <p class="text-gray-300 text-sm">Analizo tu nivel y objetivos musicales</p>
               </div>
               <div class="text-center">
                 <div class="text-yellow-400 text-4xl mb-3">🎯</div>
                 <h3 class="text-white font-capture text-lg mb-2">PLAN PERSONALIZADO</h3>
                 <p class="text-gray-300 text-sm">Creo un programa específico para ti</p>
               </div>
               <div class="text-center">
                 <div class="text-yellow-400 text-4xl mb-3">🎹</div>
                 <h3 class="text-white font-capture text-lg mb-2">MINI CLASE DEMO</h3>
                 <p class="text-gray-300 text-sm">Experimentas mi metodología de enseñanza</p>
               </div>
               <div class="text-center">
                 <div class="text-yellow-400 text-4xl mb-3">💡</div>
                 <h3 class="text-white font-capture text-lg mb-2">CONSEJOS PRÁCTICOS</h3>
                 <p class="text-gray-300 text-sm">Tips que puedes aplicar inmediatamente</p>
               </div>
             </div>
             
             <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-6 mb-8">
               <h3 class="text-yellow-400 font-capture text-xl mb-4">¿QUÉ INCLUYE LA CLASE GRATUITA?</h3>
               <ul class="space-y-2 text-gray-300 text-sm">
                 <li class="flex items-center">
                   <span class="text-yellow-400 mr-2">✓</span>
                   Evaluación de tu nivel musical actual
                 </li>
                 <li class="flex items-center">
                   <span class="text-yellow-400 mr-2">✓</span>
                   Identificación de tus objetivos y metas
                 </li>
                 <li class="flex items-center">
                   <span class="text-yellow-400 mr-2">✓</span>
                   Plan de estudios personalizado
                 </li>
                 <li class="flex items-center">
                   <span class="text-yellow-400 mr-2">✓</span>
                   Resolución de dudas específicas
                 </li>
                 <li class="flex items-center">
                   <span class="text-yellow-400 mr-2">✓</span>
                   Recomendaciones de práctica
                 </li>
               </ul>
             </div>
             
             <div class="flex flex-col sm:flex-row gap-4 justify-center">
               <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300 transform hover:scale-105">
                 📅 AGENDAR CLASE GRATUITA
               </button>
               <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300">
                 📱 CONTACTAR VÍA WHATSAPP
               </button>
             </div>
           </div>
         </div>
       </div>
     </section>

         <!-- Success Stories -->
     <section class="py-16 bg-gray-800">
       <div class="container mx-auto px-4">
         <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-4 text-shadow-lg glow-effect">
           RESULTADOS REALES DE MIS ESTUDIANTES
         </h2>
         <p class="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
           Estos son algunos de los logros que mis estudiantes han alcanzado siguiendo mi metodología
         </p>
         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
             <div class="mb-4">
               <div class="flex items-center mb-2">
                 <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                   <span class="text-black font-capture font-bold text-lg">M</span>
                 </div>
                 <div>
                   <h4 class="font-capture text-white">María González</h4>
                   <p class="text-gray-400 text-sm">Paquete Intermedio - 3 meses</p>
                 </div>
               </div>
               <div class="flex text-yellow-400 mb-2">
                 <span>★★★★★</span>
               </div>
               <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-2 mb-3">
                 <p class="text-yellow-400 text-sm font-capture">
                   RESULTADO: De 0 a tocar 5 canciones completas
                 </p>
               </div>
             </div>
             <p class="text-gray-300 text-sm">
               "Nunca había tocado un instrumento. Andy me enseñó con paciencia y ahora toco 
               canciones de Manu Chao, Jesse & Joy y música tropical. ¡Increíble!"
             </p>
           </div>

           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
             <div class="mb-4">
               <div class="flex items-center mb-2">
                 <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                   <span class="text-black font-capture font-bold text-lg">C</span>
                 </div>
                 <div>
                   <h4 class="font-capture text-white">Carlos Ramírez</h4>
                   <p class="text-gray-400 text-sm">Curso Producción - 4 meses</p>
                 </div>
               </div>
               <div class="flex text-yellow-400 mb-2">
                 <span>★★★★★</span>
               </div>
               <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-2 mb-3">
                 <p class="text-yellow-400 text-sm font-capture">
                   RESULTADO: Produjo su primer EP de 4 canciones
                 </p>
               </div>
             </div>
             <p class="text-gray-300 text-sm">
               "Aprendí FL Studio desde cero y ahora tengo mi EP en Spotify. 
               Las clases de mezcla y mastering fueron clave. ¡Recomiendo 100%!"
             </p>
           </div>

           <div class="bg-black bg-opacity-40 rounded-xl p-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
             <div class="mb-4">
               <div class="flex items-center mb-2">
                 <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                   <span class="text-black font-capture font-bold text-lg">A</span>
                 </div>
                 <div>
                   <h4 class="font-capture text-white">Ana Torres</h4>
                   <p class="text-gray-400 text-sm">Clases Online - 6 meses</p>
                 </div>
               </div>
               <div class="flex text-yellow-400 mb-2">
                 <span>★★★★★</span>
               </div>
               <div class="bg-yellow-400 bg-opacity-20 rounded-lg p-2 mb-3">
                 <p class="text-yellow-400 text-sm font-capture">
                   RESULTADO: Toca en su banda local
                 </p>
               </div>
             </div>
             <p class="text-gray-300 text-sm">
               "Desde Santiago, las clases online fueron perfectas. Ahora soy 
               tecladista de una banda de cumbia. ¡Gracias Andy!"
             </p>
           </div>
         </div>
         
         <!-- CTA within testimonials -->
         <div class="text-center mt-12">
           <p class="text-gray-300 mb-6">
             ¿Quieres ser el próximo en lograr tus objetivos musicales?
           </p>
           <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-capture text-lg font-bold transition-all duration-300 transform hover:scale-105">
             COMENZAR MI TRANSFORMACIÓN MUSICAL
           </button>
         </div>
       </div>
     </section>

         <!-- Final CTA Section -->
     <section class="py-16 bg-gray-900">
       <div class="container mx-auto px-4">
         <div class="max-w-4xl mx-auto text-center">
           <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 mb-6 text-shadow-lg glow-effect">
             ¡TU MOMENTO ES AHORA!
           </h2>
           <p class="text-xl text-gray-300 mb-4">
             No esperes más para comenzar tu transformación musical
           </p>
           <p class="text-lg text-gray-400 mb-8">
             Miles de estudiantes ya han logrado sus sueños musicales. ¿Serás el próximo?
           </p>
           
           <!-- Urgency Section -->
           <div class="bg-red-600 bg-opacity-20 border border-red-500 rounded-xl p-6 backdrop-blur-sm mb-8">
             <h3 class="text-red-400 font-capture text-lg mb-2">⚡ OFERTA LIMITADA ⚡</h3>
             <p class="text-white">
               Los primeros 10 estudiantes de este mes reciben 
               <span class="text-yellow-400 font-bold">50% de descuento</span> en su primer paquete
             </p>
           </div>
           
           <!-- Final CTA Buttons -->
           <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
             <button class="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-6 rounded-lg font-capture text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
               📅 AGENDAR MI CLASE GRATUITA
             </button>
             <button class="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-12 py-6 rounded-lg font-capture text-xl font-bold transition-all duration-300">
               💰 SOLICITAR COTIZACIÓN
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
                 <a href="mailto:andyjaquecursos@gmail.com" class="text-yellow-400 hover:text-yellow-300 transition-colors">
                   andyjaquecursos@gmail.com
                 </a>
               </div>
             </div>
             <div class="mt-6 pt-6 border-t border-yellow-400 border-opacity-20">
               <p class="text-gray-400 text-sm">
                 Respuesta garantizada en menos de 2 horas • Disponible de lunes a domingo
               </p>
             </div>
           </div>
           
           <!-- Social Proof -->
           <div class="mt-8 text-center">
             <p class="text-gray-300 mb-4">
               Únete a más de <span class="text-yellow-400 font-bold">200+ estudiantes</span> que ya han transformado su vida musical
             </p>
             <div class="flex justify-center items-center gap-4">
               <div class="flex -space-x-2">
                 <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">M</div>
                 <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">C</div>
                 <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">A</div>
                 <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs">+</div>
               </div>
               <div class="flex text-yellow-400 text-sm">
                 ★★★★★ (4.9/5 - 50+ reseñas)
               </div>
             </div>
           </div>
         </div>
       </div>
     </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Cursos y Clases - Andy Jaque',
  meta: [
    { name: 'description', content: 'Cursos de teclado, producción musical y teoría musical con Andy Jaque. Clases presenciales y online.' },
    { name: 'keywords', content: 'cursos música, clases teclado, producción musical, teoría musical, Andy Jaque, clases online' }
  ]
})
</script>

 