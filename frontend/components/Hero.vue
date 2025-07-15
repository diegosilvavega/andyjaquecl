<template>
  <section class="relative h-screen gradient-dark text-white overflow-hidden">
    <!-- Video/Image Background -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-black/60 z-10"></div>
      
      <!-- Skeleton Loading -->
      <div 
        v-if="!imageLoaded && isClient"
        class="absolute inset-0 bg-gray-800 animate-pulse z-0"
      >
        <div class="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 opacity-50"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-gray-600">
            <svg class="w-16 h-16 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Main Image -->
      <img 
        src="/images/DSC02151-optimized.jpg" 
        alt="Andy Jaque en concierto" 
        class="w-full h-full object-cover object-top transition-opacity duration-500"
        :class="{ 'opacity-0': !imageLoaded && isClient, 'opacity-100': imageLoaded || !isClient }"
        @load="onImageLoad"
        @error="onImageError"
        loading="eager"
        decoding="async"
      />
      
      <!-- Gradiente inferior para transición suave -->
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
    </div>

    <!-- Content -->
    <div class="relative z-20 container mx-auto px-4 py-16 flex flex-col justify-center h-full">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Logo/Title -->
        <div class="mb-6">
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-capture text-white mb-4 tracking-wider text-shadow-lg glow-effect">
            ANDY JAQUE
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-yellow-400 font-capture-2 font-bold">
            JAQUEANDO LA CUMBIA 2025 TOUR
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 justify-center items-center mb-10 bg-black/30 backdrop-blur-sm rounded-lg p-4">
          <button
            class="btn-secondary px-4 py-2 text-sm font-capture font-semibold tracking-wide btn-glow"
            @click="scrollToEvents"
          >
            🎵 VER PRÓXIMAS FECHAS 🎵
          </button>
          
          <button
            class="btn-secondary px-4 py-2 text-sm font-capture font-semibold tracking-wide btn-glow"
            @click="openBooking"
          >
            💫 AGENDA TU EVENTO 💫
          </button>
        </div>


      </div>

      <!-- Social Media - Desktop Vertical Stack -->
      <div class="absolute top-[50%] right-4 hidden md:block z-30 opacity-0 animate-fade-in-delayed">
        <div class="bg-black/40 backdrop-blur-md rounded-2xl p-2 border border-white/10 shadow-2xl">
          <div class="flex flex-col gap-2">
            <a 
              href="https://www.instagram.com/andy_jaque/?hl=es" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-500/30">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <!-- Tooltip con username -->
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                @andy_jaque
                <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
              </div>
            </a>
            
            <a 
              href="https://www.tiktok.com/@andyjaqueoficial" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/30">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <!-- Tooltip con username -->
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                @andyjaqueoficial
                <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
              </div>
            </a>
            
            <a 
              href="https://www.youtube.com/@Andy_Jaque" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-600/30">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <!-- Tooltip con username -->
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                @Andy_Jaque
                <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
              </div>
            </a>
            
            <a 
              href="https://open.spotify.com/intl-es/artist/2Dva1pArOWbj8tgHq6jTCw" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-green-500/30">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <!-- Tooltip con username -->
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Andy Jaque
                <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
              </div>
            </a>
            
            <a 
              href="https://www.facebook.com/AndyjaqueJ/?locale=es_LA" 
              target="_blank" 
              rel="noopener noreferrer"
              class="group relative"
            >
              <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-600/30">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <!-- Tooltip con username -->
              <div class="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Andy Jaque
                <div class="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-black/90 border-y-4 border-y-transparent"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Social Media - Mobile FAB -->
      <div class="md:hidden fixed top-[55%] right-4 z-30">
        <!-- Social Icons Container (expandable) -->
        <div class="transition-all duration-500 ease-out"
             :class="{ 'transform translate-y-0 opacity-100': showMobileSocial, 'transform translate-y-4 opacity-0 pointer-events-none': !showMobileSocial }">
          <div class="flex flex-col gap-3 mb-3">
            <a 
              href="https://www.instagram.com/andy_jaque/?hl=es" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.tiktok.com/@andyjaqueoficial" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.youtube.com/@Andy_Jaque" 
              target="_blank" 
              rel="noopener noreferrer"
              class="w-11 h-11 bg-red-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
                         <a 
               href="https://open.spotify.com/intl-es/artist/2Dva1pArOWbj8tgHq6jTCw" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
             >
               <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
               </svg>
             </a>
             
             <a 
               href="https://www.facebook.com/AndyjaqueJ/?locale=es_LA" 
               target="_blank" 
               rel="noopener noreferrer"
               class="w-11 h-11 bg-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
             >
               <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
               </svg>
             </a>
          </div>
        </div>
        
        <!-- FAB Button -->
        <button 
          @click="showMobileSocial = !showMobileSocial"
          class="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl active:scale-95 transition-all duration-300"
          :class="{ 'rotate-45': showMobileSocial }"
        >
          <svg class="w-7 h-7 text-black transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </button>
      </div>

      <!-- Scroll Indicator - Mejorado -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <p class="text-yellow-400 font-capture text-sm mb-3 animate-pulse">
          DESLIZA PARA VER FECHAS
        </p>
        <div class="cursor-pointer animate-bounce" @click="scrollToEvents">
          <svg class="w-8 h-8 text-yellow-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const imageLoaded = ref(false)
const imageError = ref(false)
const isClient = ref(false)
const showMobileSocial = ref(false)

onMounted(() => {
  isClient.value = true
  
  // Precargar la imagen cuando el componente se monte
  const img = new Image()
  img.onload = () => {
    imageLoaded.value = true
  }
  img.onerror = () => {
    imageError.value = true
    imageLoaded.value = true // Mostrar aunque haya error
  }
  img.src = '/images/DSC02151-optimized.jpg'
})

const onImageLoad = () => {
  imageLoaded.value = true
}

const onImageError = () => {
  imageError.value = true
  imageLoaded.value = true // Mostrar aunque haya error
}

const scrollToEvents = () => {
  const element = document.getElementById('upcoming-events')
  if (element) {
    const yOffset = -100 // Offset para compensar la barra de navegación (80px) + espacio extra
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const openBooking = () => {
  window.location.href = 'tel:+56965933017'
}
</script>

<style scoped>
/* Animación de skeleton loading */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-pulse {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s infinite;
}

/* Transiciones suaves */
.transition-opacity {
  transition: opacity 0.5s ease-in-out;
}

/* Animación fade-in con delay para iconos sociales desktop */
@keyframes fadeInDelayed {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-delayed {
  animation: fadeInDelayed 1s ease-out 1s forwards;
}
</style> 