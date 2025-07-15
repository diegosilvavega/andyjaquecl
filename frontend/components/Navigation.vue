<template>
  <nav class="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800/50 fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-center items-center h-20">
        <div class="flex items-center space-x-2 md:space-x-4 lg:space-x-8">
          <img src="/images/fonts/6.png" alt="Andy Jaque" class="w-8 h-8 md:w-10 md:h-10">
          <div class="flex space-x-2 md:space-x-4 lg:space-x-8">
            <NuxtLink
              to="/"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              TOUR
            </NuxtLink>
            
            <NuxtLink
              to="/musica"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/musica' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              MÚSICA
            </NuxtLink>
            
            <NuxtLink
              to="/video"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/video' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              VIDEOS
            </NuxtLink>
            
            <NuxtLink
              to="/produccion"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/produccion' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              PRODUCCIÓN
            </NuxtLink>
            
            <NuxtLink
              to="/cursos"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/cursos' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              CURSOS
            </NuxtLink>
            
            <NuxtLink
              to="/foto"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/foto' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              FOTOS
            </NuxtLink>
            
            <NuxtLink
              to="/bio"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/bio' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              BIO
            </NuxtLink>
            
            <NuxtLink
              to="/news"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
              :class="$route.path === '/news' ? 'text-yellow-400 border-transparent' : 'text-white border-transparent hover:text-yellow-400 hover:border-yellow-400'"
            >
              NEWS
            </NuxtLink>
            
            <NuxtLink
              to="/merch"
              class="font-capture text-xs md:text-sm lg:text-lg px-1 md:px-2 lg:px-3 py-3 transition-colors duration-300 border-b-2 no-underline"
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

 