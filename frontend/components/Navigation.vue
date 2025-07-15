<template>
  <nav class="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800/30 fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-center items-center h-16">
        <div class="flex items-center space-x-1 md:space-x-2 lg:space-x-3">
          <img src="/images/fonts/6.png" alt="Andy Jaque" class="w-7 h-7 md:w-8 md:h-8">
          <div class="flex space-x-0.5 md:space-x-1 lg:space-x-2">
            <NuxtLink
              to="/"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              TOUR
            </NuxtLink>
            
            <NuxtLink
              to="/musica"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/musica' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              MÚSICA
            </NuxtLink>
            
            <NuxtLink
              to="/video"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/video' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              VIDEOS
            </NuxtLink>
            
            <NuxtLink
              to="/produccion"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/produccion' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              PRODUCCIÓN
            </NuxtLink>
            
            <NuxtLink
              to="/cursos"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/cursos' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              CURSOS
            </NuxtLink>
            
            <NuxtLink
              to="/foto"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/foto' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              FOTOS
            </NuxtLink>
            
            <NuxtLink
              to="/bio"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/bio' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              BIO
            </NuxtLink>
            
            <NuxtLink
              to="/news"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/news' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              NEWS
            </NuxtLink>
            
            <NuxtLink
              to="/merch"
              class="font-capture text-xs md:text-sm lg:text-base px-0.5 md:px-1 lg:px-1.5 py-2 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/merch' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              MERCH
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

 