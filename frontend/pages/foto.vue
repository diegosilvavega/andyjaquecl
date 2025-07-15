<template>
  <div class="min-h-screen bg-gray-900 text-white mt-16">
    <!-- Carousel Section - Ahora aparece inmediatamente -->
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

// Función para generar descripción automática de fotos
function generatePhotoDescription(filename: string, category: string): string {
  const descriptions = {
    ANDY: ['Andy Jaque en acción', 'Momento especial de Andy', 'Andy y su teclado', 'Concentración total', 'Andy en el escenario', 'La pasión por la música', 'Andy dirigiendo la banda', 'Energía pura'],
    BANDA: ['La banda en pleno show', 'Energía pura en el escenario', 'Conexión con el público', 'Momentos únicos', 'La banda completa', 'Jaqueando la cumbia', 'Show en vivo', 'Momento especial'],
    TITO: ['Tito en acción', 'Momento especial de Tito', 'Tito y su instrumento', 'Concentración total', 'Tito en el escenario', 'La pasión musical'],
    COKE: ['Coke en acción', 'Momento especial de Coke', 'Coke y su instrumento', 'Concentración total', 'Coke en el escenario', 'La pasión musical'],
    MAURI: ['Mauri en acción', 'Momento especial de Mauri', 'Mauri y su instrumento', 'Concentración total', 'Mauri en el escenario', 'La pasión musical'],
    YALO: ['Yalo en acción', 'Momento especial de Yalo', 'Yalo y su instrumento', 'Concentración total', 'Yalo en el escenario', 'La pasión musical']
  }
  
  const categoryDescriptions = descriptions[category as keyof typeof descriptions] || ['Momento musical', 'En el escenario']
  const randomIndex = Math.floor(Math.random() * categoryDescriptions.length)
  return categoryDescriptions[randomIndex]
}

// Generar colección de fotos dinámicamente - TODAS las fotos disponibles
const photoCollections: Record<string, Photo[]> = {
  ANDY: [
    // 24 fotos de Andy
    'DSC00971.jpg', 'DSC00972.jpg', 'DSC00983.jpg', 'DSC00984.jpg', 'DSC00989.jpg', 'DSC01041.jpg',
    'DSC01053.jpg', 'DSC01059.jpg', 'DSC01459.jpg', 'DSC01469.jpg', 'DSC01481.jpg', 'DSC01538.jpg',
    'DSC01962.jpg', 'DSC01964.jpg', 'DSC02002.jpg', 'DSC02054.jpg', 'DSC02055.jpg', 'DSC02079.jpg',
    'DSC02080.jpg', 'DSC02151.jpg', 'DSC02243.jpg', 'DSC02865.jpg', 'DSC02938.jpg', 'DSC02945.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/ANDY/${filename}`, 
    description: generatePhotoDescription(filename, 'ANDY'), 
    category: 'ANDY' 
  })),
  
  BANDA: [
    // 29 fotos de la banda
    'DSC00975.jpg', 'DSC01798.jpg', 'DSC01820.jpg', 'DSC02059.jpg', 'DSC02065.jpg', 'DSC02285.jpg',
    'DSC02287.jpg', 'DSC02352.jpg', 'DSC02423.jpg', 'DSC02429.jpg', 'DSC02465.jpg', 'DSC02480.jpg',
    'DSC02481.jpg', 'DSC02486.jpg', 'DSC02542.jpg', 'DSC02576.jpg', 'DSC02589.jpg', 'DSC02593.jpg',
    'DSC02656.jpg', 'DSC02715.jpg', 'DSC02720.jpg', 'DSC02725.jpg', 'DSC02727.jpg', 'DSC02728.jpg',
    'DSC02733.jpg', 'DSC02751.jpg', 'DSC02995.jpg', 'DSC03001.jpg', 'DSC03067.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/BANDA/${filename}`, 
    description: generatePhotoDescription(filename, 'BANDA'), 
    category: 'BANDA' 
  })),
  
  TITO: [
    // 9 fotos de Tito
    'DSC01120.jpg', 'DSC01868.jpg', 'DSC01884.jpg', 'DSC01995.jpg', 'DSC02041.jpg',
    'DSC02063.jpg', 'DSC02070.jpg', 'DSC03047.jpg', 'DSC03052.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/TITO/${filename}`, 
    description: generatePhotoDescription(filename, 'TITO'), 
    category: 'TITO' 
  })),
  
  COKE: [
    // 8 fotos de Coke
    'DSC01542.jpg', 'DSC01885.jpg', 'DSC01886.jpg', 'DSC01932.jpg',
    'DSC02116.jpg', 'DSC02198.jpg', 'DSC02818.jpg', 'DSC03039.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/COKE/${filename}`, 
    description: generatePhotoDescription(filename, 'COKE'), 
    category: 'COKE' 
  })),
  
  MAURI: [
    // 6 fotos de Mauri
    'DSC01254.jpg', 'DSC01333.jpg', 'DSC01954.jpg', 'DSC02017.jpg', 'DSC03016.jpg', 'DSC03023.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/MAURI/${filename}`, 
    description: generatePhotoDescription(filename, 'MAURI'), 
    category: 'MAURI' 
  })),
  
  YALO: [
    // 2 fotos de Yalo
    'DSC02031.jpg', 'DSC02158.jpg'
  ].map(filename => ({ 
    src: `/fotos-optimized/YALO/${filename}`, 
    description: generatePhotoDescription(filename, 'YALO'), 
    category: 'YALO' 
  }))
}

// Lista específica de fotos HORIZONTALES para el carrusel (solo fotos horizontales confirmadas)
const horizontalPhotos: Photo[] = [
  // BANDA - Fotos horizontales seleccionadas
  { src: '/fotos-optimized/BANDA/DSC02751.jpg', description: 'Energía pura en el escenario', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02720.jpg', description: 'Conexión con el público', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02656.jpg', description: 'Momentos únicos', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02486.jpg', description: 'La banda completa', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02589.jpg', description: 'Show en vivo', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02576.jpg', description: 'Momento especial', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02542.jpg', description: 'En el escenario', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02733.jpg', description: 'Jaqueando la cumbia', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC02995.jpg', description: 'Energía total', category: 'BANDA' },
  { src: '/fotos-optimized/BANDA/DSC03001.jpg', description: 'La banda en acción', category: 'BANDA' },
  
  // ANDY - Fotos horizontales seleccionadas  
  { src: '/fotos-optimized/ANDY/DSC02151.jpg', description: 'Andy Jaque en acción', category: 'ANDY' },
  { src: '/fotos-optimized/ANDY/DSC02080.jpg', description: 'Momento especial de Andy', category: 'ANDY' },
  { src: '/fotos-optimized/ANDY/DSC00989.jpg', description: 'Andy en el escenario', category: 'ANDY' },
  { src: '/fotos-optimized/ANDY/DSC00971.jpg', description: 'La pasión por la música', category: 'ANDY' },
  { src: '/fotos-optimized/ANDY/DSC02055.jpg', description: 'Andy dirigiendo', category: 'ANDY' },
  { src: '/fotos-optimized/ANDY/DSC02243.jpg', description: 'Concentración total', category: 'ANDY' },
  
  // TITO - Solo fotos horizontales confirmadas (6000x4000) - REMOVIDAS las verticales DSC01884 y DSC01995
  { src: '/fotos-optimized/TITO/DSC01120.jpg', description: 'Tito en concentración', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC01868.jpg', description: 'Tito y su instrumento', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC02041.jpg', description: 'Tito en el escenario', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC02063.jpg', description: 'Tito en acción', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC02070.jpg', description: 'Tito con pasión', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC03047.jpg', description: 'Tito en el show', category: 'TITO' },
  { src: '/fotos-optimized/TITO/DSC03052.jpg', description: 'Tito en vivo', category: 'TITO' },
  
  // COKE - Fotos horizontales
  { src: '/fotos-optimized/COKE/DSC02198.jpg', description: 'Coke y su instrumento', category: 'COKE' },
  { src: '/fotos-optimized/COKE/DSC01932.jpg', description: 'Coke en concentración', category: 'COKE' },
  { src: '/fotos-optimized/COKE/DSC01886.jpg', description: 'Coke en el escenario', category: 'COKE' },
  
  // MAURI - Fotos horizontales  
  { src: '/fotos-optimized/MAURI/DSC02017.jpg', description: 'Mauri y su instrumento', category: 'MAURI' },
  { src: '/fotos-optimized/MAURI/DSC01333.jpg', description: 'Mauri en el escenario', category: 'MAURI' },
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

// Función para cargar galería completa (aleatorio)
function loadGallery() {
  isLoadingMore.value = true
  
  setTimeout(() => {
    const allPhotos = Object.values(photoCollections).flat()
    shuffledPhotos.value = shuffleArray(allPhotos) // Volvemos a usar orden aleatorio
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
  // CARRUSEL: Solo fotos horizontales (aleatorias)
  const shuffledHorizontal = shuffleArray(horizontalPhotos)
  featuredPhotos.value = shuffledHorizontal.slice(0, 8) // 8 fotos horizontales aleatorias para el carrusel
  
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