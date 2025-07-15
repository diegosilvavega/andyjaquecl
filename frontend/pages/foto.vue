<template>
  <div class="min-h-screen bg-gray-900 text-white mt-20">
    <!-- Hero Section -->
    <section class="relative py-16 bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-capture text-yellow-400 mb-6">
          FOTOS
        </h1>
        <p class="text-xl md:text-2xl text-gray-300 font-capture-2 mb-8 max-w-4xl mx-auto">
          Revive los mejores momentos de los shows, ensayos y momentos especiales de Andy Jaque y su banda.
        </p>
      </div>
    </section>

    <!-- Carousel Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <!-- Carousel Container -->
        <div class="relative max-w-6xl mx-auto mb-12">
          <!-- Carousel Images -->
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(photo, index) in featuredPhotos" 
                :key="index"
                class="w-full flex-shrink-0 relative group cursor-pointer"
                @click="openModal(photo)"
              >
                                 <!-- Skeleton Loading -->
                 <div 
                   v-if="!carouselImageLoaded[index]"
                   class="w-full h-[500px] md:h-[600px] bg-gray-800 animate-pulse rounded-2xl flex items-center justify-center"
                 >
                  <div class="text-gray-600">
                    <svg class="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>

                                 <!-- Image -->
                 <img 
                   :src="photo.src" 
                   :alt="photo.description"
                   class="w-full h-[500px] md:h-[600px] object-cover transition-all duration-300 group-hover:scale-105 image-optimized"
                   :class="{ 'opacity-0': !carouselImageLoaded[index], 'opacity-100': carouselImageLoaded[index] }"
                   @load="onCarouselImageLoad(index)"
                   @error="onCarouselImageError(index)"
                 />

                <!-- Hover Overlay -->
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
                    </svg>
                  </div>
                </div>

                <!-- Description -->
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <p class="text-white text-lg font-body">{{ photo.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Navigation -->
          <button 
            @click="prevSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          
          <button 
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <!-- Carousel Indicators -->
          <div class="flex justify-center mt-6 space-x-2">
            <button 
              v-for="(_, index) in featuredPhotos" 
              :key="index"
              @click="goToSlide(index)"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="{ 'bg-yellow-400': currentSlide === index, 'bg-gray-600': currentSlide !== index }"
            ></button>
          </div>
        </div>

        <!-- Ver Todas Button -->
        <div class="text-center mb-8">
          <button 
            @click="toggleGallery"
            class="btn-secondary px-8 py-4 text-lg font-capture font-semibold tracking-wide btn-glow inline-flex items-center gap-2"
          >
            <span>{{ showGallery ? 'OCULTAR GALERÍA' : 'VER TODAS LAS FOTOS' }}</span>
            <svg 
              class="w-5 h-5 transition-transform duration-300" 
              :class="{ 'rotate-180': showGallery }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Full Gallery Section (Expandable) -->
    <section 
      v-if="showGallery"
      ref="gallerySection"
      class="py-16 bg-gray-800 transition-all duration-500 ease-in-out"
      :class="{ 'animate-slideDown': showGallery }"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-3xl md:text-4xl font-capture text-yellow-400 text-center mb-12">
          GALERÍA COMPLETA
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="(photo, index) in shuffledPhotos" 
            :key="index"
            class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            @click="openModal(photo)"
          >
            <!-- Skeleton Loading -->
            <div 
              v-if="!imageLoaded[index]"
              class="w-full h-64 bg-gray-700 animate-pulse rounded-lg flex items-center justify-center"
            >
              <div class="text-gray-600">
                <svg class="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <!-- Image -->
            <img 
              :src="photo.src" 
              :alt="photo.description"
              class="w-full h-64 object-cover transition-all duration-300 group-hover:scale-110 image-optimized"
              :class="{ 'opacity-0': !imageLoaded[index], 'opacity-100': imageLoaded[index] }"
              loading="lazy"
              @load="onImageLoad(index)"
              @error="onImageError(index)"
            />

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
              <div class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM8.5 16L12 13.5 15.5 16 12 18.5 8.5 16z"/>
                </svg>
              </div>
            </div>

            <!-- Description -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p class="text-white text-sm font-body">{{ photo.description }}</p>
            </div>
          </div>
        </div>

        <!-- Loading More Indicator -->
        <div v-if="isLoadingMore" class="text-center mt-8">
          <div class="inline-flex items-center gap-2 text-yellow-400">
            <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="font-body">Cargando fotos...</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <div 
      v-if="selectedPhoto"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div class="max-w-6xl max-h-[95vh] p-4">
        <!-- Modal Loading -->
        <div 
          v-if="!modalImageLoaded"
          class="flex items-center justify-center h-96"
        >
          <div class="text-yellow-400">
            <svg class="w-12 h-12 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>

        <img 
          :src="selectedPhoto.src" 
          :alt="selectedPhoto.description"
          class="max-w-full max-h-[90vh] object-contain rounded-lg transition-opacity duration-300 modal-image"
          :class="{ 'opacity-0': !modalImageLoaded, 'opacity-100': modalImageLoaded }"
          @load="modalImageLoaded = true"
        />
        
        <div class="text-center mt-4">
          <p class="text-white text-lg font-body">{{ selectedPhoto.description }}</p>
          <button 
            @click="closeModal"
            class="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors font-body"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'

interface Photo {
  src: string
  description: string
  category: string
}

const selectedPhoto = ref<Photo | null>(null)
const shuffledPhotos = ref<Photo[]>([])
const featuredPhotos = ref<Photo[]>([])
const currentSlide = ref(0)
const showGallery = ref(false)
const imageLoaded = reactive<Record<number, boolean>>({})
const carouselImageLoaded = reactive<Record<number, boolean>>({})
const modalImageLoaded = ref(false)
const isLoadingMore = ref(false)
const gallerySection = ref<HTMLElement | null>(null)

// Colección de fotos organizadas por categorías
const photoCollections: Record<string, Photo[]> = {
  ANDY: [
    { src: '/fotos/ANDY/DSC02151.jpg', description: 'Andy Jaque en acción', category: 'ANDY' },
    { src: '/fotos/ANDY/DSC02080.jpg', description: 'Momento especial de Andy', category: 'ANDY' },
    { src: '/fotos/ANDY/DSC01964.jpg', description: 'Andy y su teclado', category: 'ANDY' },
    { src: '/fotos/ANDY/DSC01059.jpg', description: 'Concentración total', category: 'ANDY' },
    { src: '/fotos/ANDY/DSC00989.jpg', description: 'Andy en el escenario', category: 'ANDY' },
    { src: '/fotos/ANDY/DSC00971.jpg', description: 'La pasión por la música', category: 'ANDY' }
  ],
  BANDA: [
    { src: '/fotos/BANDA/DSC03067.jpg', description: 'La banda en pleno show', category: 'BANDA' },
    { src: '/fotos/BANDA/DSC02751.jpg', description: 'Energía pura en el escenario', category: 'BANDA' },
    { src: '/fotos/BANDA/DSC02720.jpg', description: 'Conexión con el público', category: 'BANDA' },
    { src: '/fotos/BANDA/DSC02656.jpg', description: 'Momentos únicos', category: 'BANDA' },
    { src: '/fotos/BANDA/DSC02486.jpg', description: 'La banda completa', category: 'BANDA' },
    { src: '/fotos/BANDA/DSC02352.jpg', description: 'Jaqueando la cumbia', category: 'BANDA' }
  ],
  TITO: [
    { src: '/fotos/TITO/DSC03052.jpg', description: 'Tito en acción', category: 'TITO' },
    { src: '/fotos/TITO/DSC03047.jpg', description: 'Momento especial de Tito', category: 'TITO' },
    { src: '/fotos/TITO/DSC02070.jpg', description: 'Tito y su instrumento', category: 'TITO' },
    { src: '/fotos/TITO/DSC02041.jpg', description: 'Concentración total', category: 'TITO' },
    { src: '/fotos/TITO/DSC01884.jpg', description: 'Tito en el escenario', category: 'TITO' },
    { src: '/fotos/TITO/DSC01120.jpg', description: 'La pasión musical', category: 'TITO' }
  ],
  COKE: [
    { src: '/fotos/COKE/DSC03039.jpg', description: 'Coke en acción', category: 'COKE' },
    { src: '/fotos/COKE/DSC02818.jpg', description: 'Momento especial de Coke', category: 'COKE' },
    { src: '/fotos/COKE/DSC02198.jpg', description: 'Coke y su instrumento', category: 'COKE' },
    { src: '/fotos/COKE/DSC01932.jpg', description: 'Concentración total', category: 'COKE' },
    { src: '/fotos/COKE/DSC01886.jpg', description: 'Coke en el escenario', category: 'COKE' },
    { src: '/fotos/COKE/DSC01542.jpg', description: 'La pasión musical', category: 'COKE' }
  ],
  MAURI: [
    { src: '/fotos/MAURI/DSC03023.jpg', description: 'Mauri en acción', category: 'MAURI' },
    { src: '/fotos/MAURI/DSC03016.jpg', description: 'Momento especial de Mauri', category: 'MAURI' },
    { src: '/fotos/MAURI/DSC02017.jpg', description: 'Mauri y su instrumento', category: 'MAURI' },
    { src: '/fotos/MAURI/DSC01954.jpg', description: 'Concentración total', category: 'MAURI' },
    { src: '/fotos/MAURI/DSC01333.jpg', description: 'Mauri en el escenario', category: 'MAURI' },
    { src: '/fotos/MAURI/DSC01254.jpg', description: 'La pasión musical', category: 'MAURI' }
  ],
  YALO: [
    { src: '/fotos/YALO/DSC02158.jpg', description: 'Yalo en acción', category: 'YALO' },
    { src: '/fotos/YALO/DSC02031.jpg', description: 'Momento especial de Yalo', category: 'YALO' }
  ]
}

// Fotos que están en formato horizontal (landscape)
const horizontalPhotos: Photo[] = [
  { src: '/fotos/BANDA/DSC03067.jpg', description: 'La banda en pleno show', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02751.jpg', description: 'Energía pura en el escenario', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02720.jpg', description: 'Conexión con el público', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02656.jpg', description: 'Momentos únicos', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02486.jpg', description: 'La banda completa', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02352.jpg', description: 'Jaqueando la cumbia', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02589.jpg', description: 'Show en vivo', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02576.jpg', description: 'Momento especial', category: 'BANDA' },
  { src: '/fotos/BANDA/DSC02542.jpg', description: 'En el escenario', category: 'BANDA' },
  { src: '/fotos/ANDY/DSC02151.jpg', description: 'Andy Jaque en acción', category: 'ANDY' },
  { src: '/fotos/ANDY/DSC01964.jpg', description: 'Andy y su teclado', category: 'ANDY' },
  { src: '/fotos/ANDY/DSC01059.jpg', description: 'Concentración total', category: 'ANDY' }
]

// Función para mezclar array aleatoriamente
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Funciones de carrusel
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % featuredPhotos.value.length
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 ? featuredPhotos.value.length - 1 : currentSlide.value - 1
}

function goToSlide(index: number) {
  currentSlide.value = index
}

// Función para toggle de galería
function toggleGallery() {
  showGallery.value = !showGallery.value
  if (showGallery.value && shuffledPhotos.value.length === 0) {
    loadGallery()
  }
  
  // Scroll automático hacia la galería cuando se abre
  if (showGallery.value) {
    nextTick(() => {
      gallerySection.value?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    })
  }
}

// Función para cargar galería completa
function loadGallery() {
  isLoadingMore.value = true
  
  setTimeout(() => {
    const allPhotos = Object.values(photoCollections).flat()
    shuffledPhotos.value = shuffleArray(allPhotos)
    isLoadingMore.value = false
  }, 500)
}

// Función cuando una imagen del carrusel se carga
function onCarouselImageLoad(index: number) {
  carouselImageLoaded[index] = true
}

// Función cuando una imagen del carrusel falla al cargar
function onCarouselImageError(index: number) {
  carouselImageLoaded[index] = true
}

// Función cuando una imagen se carga
function onImageLoad(index: number) {
  imageLoaded[index] = true
}

// Función cuando una imagen falla al cargar
function onImageError(index: number) {
  imageLoaded[index] = true
}

// Función para abrir modal
function openModal(photo: Photo) {
  selectedPhoto.value = photo
  modalImageLoaded.value = false
}

// Función para cerrar modal
function closeModal() {
  selectedPhoto.value = null
  modalImageLoaded.value = false
}

// Inicializar la galería con fotos destacadas
onMounted(() => {
  // Usar solo fotos horizontales para el carrusel
  const shuffled = shuffleArray(horizontalPhotos)
  featuredPhotos.value = shuffled.slice(0, 6) // Seleccionar 6 fotos horizontales aleatorias para el carrusel
  
  // Auto-advance carousel
  setInterval(() => {
    nextSlide()
  }, 5000)
})
</script>

<style scoped>
/* Estilos adicionales para la galería */
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Optimización de imágenes para galería */
.image-optimized {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: crisp-edges;
  filter: contrast(1.1) brightness(0.95);
  will-change: transform;
}

/* Imágenes del modal sin compresión */
.modal-image {
  image-rendering: -webkit-optimize-quality;
  image-rendering: optimize-quality;
  image-rendering: auto;
  filter: none;
}

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
  transition: opacity 0.3s ease-in-out;
}

/* Animación de slide down */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.5s ease-out;
}

/* Estilos para el carrusel */
.carousel-container {
  position: relative;
  overflow: hidden;
}
</style> 