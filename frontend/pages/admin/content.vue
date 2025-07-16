<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Header -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/admin" class="text-yellow-400 hover:text-yellow-300">
              ← Volver al Panel
            </NuxtLink>
            <h1 class="text-2xl font-capture text-yellow-400">
              GESTIÓN DE CONTENIDO
            </h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-yellow-400 text-4xl mb-4">📰</div>
        <p class="text-gray-300">Cargando contenido...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600/20 border border-red-500 rounded-xl p-6 mb-8">
        <p class="text-red-400">{{ error }}</p>
        <button 
          @click="loadContent" 
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture"
        >
          Reintentar
        </button>
      </div>

      <!-- Content -->
      <div v-else>
        <!-- Quick Stats -->
        <section class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Noticias Publicadas</p>
                  <p class="text-2xl font-bold text-white">{{ contentStats.publishedNews }}</p>
                </div>
                <div class="text-blue-400 text-2xl">📰</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Total Noticias</p>
                  <p class="text-2xl font-bold text-green-400">{{ contentStats.totalNews }}</p>
                </div>
                <div class="text-green-400 text-2xl">✨</div>
              </div>
            </div>



            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Biografía</p>
                  <p class="text-sm font-bold text-white">{{ biography ? formatDate(biography.updatedAt) : 'No actualizada' }}</p>
                </div>
                <div class="text-orange-400 text-2xl">👤</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tabs -->
        <div class="mb-8">
          <div class="bg-gray-800 rounded-xl p-2 inline-flex space-x-2">
            <button
              @click="activeTab = 'news'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'news'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>📰</span>
                <span>NOTICIAS</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ news.length }}</span>
              </span>
            </button>
            <button
              @click="activeTab = 'biography'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'biography'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>👤</span>
                <span>BIOGRAFÍA</span>
              </span>
            </button>

          </div>
        </div>

        <!-- News Tab -->
        <section v-if="activeTab === 'news'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Gestión de Noticias</h2>
            <button
              @click="openNewsModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVA NOTICIA
            </button>
          </div>

          <div class="p-6">
            <div v-if="news.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">📰</div>
              <p class="text-gray-400 mb-4">No hay noticias registradas</p>
              <button
                @click="openNewsModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMERA NOTICIA
              </button>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="newsItem in news"
                :key="newsItem.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <h3 class="text-lg font-capture text-white">{{ newsItem.title }}</h3>
                      <span 
                        v-if="newsItem.isNew"
                        class="bg-red-500 text-white px-2 py-1 rounded text-xs font-capture"
                      >
                        ¡NUEVO!
                      </span>
                      <span 
                        :class="newsItem.isPublished ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'"
                        class="px-2 py-1 rounded text-xs font-capture"
                      >
                        {{ newsItem.isPublished ? 'Publicada' : 'Borrador' }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-400 mb-2">{{ newsItem.excerpt }}</p>
                    <div class="flex items-center gap-4 text-xs text-gray-500">
                      <span>{{ formatDate(newsItem.publishDate) }}</span>
                      <span v-if="newsItem.tags.length > 0" class="flex items-center gap-1">
                        🏷️ {{ newsItem.tags.slice(0, 2).join(', ') }}
                        <span v-if="newsItem.tags.length > 2">+{{ newsItem.tags.length - 2 }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2 ml-4">
                    <button
                      @click="editNews(newsItem as NewsItem)"
                      class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                    >
                      ✏️
                    </button>
                    <button
                      @click="deleteNewsConfirm(newsItem as NewsItem)"
                      class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Biography Tab -->
        <section v-if="activeTab === 'biography'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700">
            <h2 class="text-xl font-capture text-yellow-400">Gestión de Biografía</h2>
          </div>

          <div v-if="biography" class="p-6">
            <form @submit.prevent="saveBiography" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Título Principal *
                </label>
                <input
                  v-model="biographyForm.title"
                  type="text"
                  required
                  class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Ej: ARTISTA - PRODUCTOR MUSICAL - YOUTUBER"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Subtítulo
                </label>
                <input
                  v-model="biographyForm.subtitle"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Ej: Desde la Región de Coquimbo, Chile"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Texto Principal *
                </label>
                <textarea
                  v-model="biographyForm.mainText"
                  rows="6"
                  required
                  class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Biografía principal del artista..."
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Logros de Carrera (uno por línea)
                </label>
                <textarea
                  v-model="careerHighlightsText"
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="Más de 7,293 oyentes mensuales en Spotify&#10;Tour 2025 recorriendo Chile de norte a sur"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Cita Destacada *
                  </label>
                  <textarea
                    v-model="biographyForm.quote"
                    rows="3"
                    required
                    class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="Cita del artista..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">
                    Autor de la Cita
                  </label>
                  <input
                    v-model="biographyForm.quoteAuthor"
                    type="text"
                    class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                    placeholder="Andy Jaque"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  URL de Imagen
                </label>
                <input
                  v-model="biographyForm.image"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                  placeholder="/images/DSC02151.jpg"
                />
              </div>

              <div v-if="biographyFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
                <ul class="text-red-400 text-sm space-y-1">
                  <li v-for="error in biographyFormErrors" :key="error">• {{ error }}</li>
                </ul>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="saving"
                  class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
                >
                  {{ saving ? 'GUARDANDO...' : 'ACTUALIZAR BIOGRAFÍA' }}
                </button>
              </div>
            </form>
          </div>
        </section>


      </div>
    </main>

    <!-- News Modal -->
    <div 
      v-if="showNewsModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeNewsModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingNews ? 'EDITAR NOTICIA' : 'NUEVA NOTICIA' }}
          </h3>
        </div>

        <form @submit.prevent="saveNews" class="p-6 space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Título *
            </label>
            <input
              v-model="newsForm.title"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Título de la noticia"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Resumen *
            </label>
            <textarea
              v-model="newsForm.excerpt"
              rows="2"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Resumen breve de la noticia"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Contenido *
            </label>
            <textarea
              v-model="newsForm.content"
              rows="6"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Contenido completo de la noticia"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Fecha de Publicación *
              </label>
              <input
                v-model="newsForm.publishDateString"
                type="date"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                URL Externa (opcional)
              </label>
              <input
                v-model="newsForm.externalUrl"
                type="url"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Etiquetas (separadas por comas)
            </label>
            <input
              v-model="newsTagsText"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Colaboración, Tour2025, Vallenar"
            />
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="newsForm.isPublished"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Publicar noticia</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="newsForm.isNew"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Marcar como nueva</span>
            </label>
          </div>

          <div v-if="newsFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in newsFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeNewsModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingNews ? 'ACTUALIZAR' : 'CREAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeDeleteModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-md w-full">
        <div class="p-6">
          <h3 class="text-xl font-capture text-red-400 mb-4">CONFIRMAR ELIMINACIÓN</h3>
          <p class="text-gray-300 mb-6">
            ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
          </p>
          
          <div class="flex space-x-4">
            <button
              @click="closeDeleteModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              @click="confirmDelete"
              :disabled="saving"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture transition-colors disabled:opacity-50"
            >
              {{ saving ? 'ELIMINANDO...' : 'ELIMINAR' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <AdminNotificationToast />
  </div>
</template>

<script setup lang="ts">
import type { NewsItem, Biography } from '~/types/admin'

// Auth check
definePageMeta({
  layout: false
})

// Composables
const { 
  news,
  biography,
  loading, 
  saving, 
  error,
  loadContent,
  createNews,
  updateNews,
  deleteNews,
  updateBiography,
  contentStats
} = useAdminContent()

const { success, error: notifyError } = useNotifications()

// State
const activeTab = ref<'news' | 'biography'>('news')

// News Modal
const showNewsModal = ref(false)
const isEditingNews = ref(false)
const newsForm = ref<{
  id?: string
  title: string
  excerpt: string
  content: string
  publishDateString: string
  externalUrl: string
  isPublished: boolean
  isNew: boolean
}>({
  title: '',
  excerpt: '',
  content: '',
  publishDateString: '',
  externalUrl: '',
  isPublished: true,
  isNew: false
})
const newsTagsText = ref('')
const newsFormErrors = ref<string[]>([])

// Biography form
const biographyForm = ref<{
  title: string
  subtitle: string
  mainText: string
  quote: string
  quoteAuthor: string
  image: string
}>({
  title: '',
  subtitle: '',
  mainText: '',
  quote: '',
  quoteAuthor: '',
  image: ''
})
const careerHighlightsText = ref('')
const biographyFormErrors = ref<string[]>([])

// Delete Modal
const showDeleteModal = ref(false)
const itemToDelete = ref<NewsItem | null>(null)
const deleteType = ref<'news'>('news')

// Funciones auxiliares
const formatDate = (date: any) => {
  if (!date) return 'Sin fecha'
  
  try {
    let d: Date
    
    // Manejar diferentes tipos de fecha de Firebase
    if (date instanceof Date) {
      d = date
    } else if (typeof date === 'string') {
      d = new Date(date)
    } else if (typeof date === 'object' && date.toDate) {
      // Timestamp de Firebase
      d = date.toDate()
    } else if (typeof date === 'object' && date.seconds) {
      // Timestamp de Firebase formato objeto
      d = new Date(date.seconds * 1000)
    } else {
      d = new Date(date)
    }
    
    if (isNaN(d.getTime())) return 'Fecha inválida'
    
    return d.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch (error) {
    console.warn('Error formateando fecha:', error, date)
    return 'Fecha inválida'
  }
}

const validateNews = (newsData: any) => {
  const errors: string[] = []
  if (!newsData.title?.trim()) errors.push('El título es requerido')
  if (!newsData.content?.trim()) errors.push('El contenido es requerido')
  return { isValid: errors.length === 0, errors }
}

const validateBiography = (bioData: any) => {
  const errors: string[] = []
  if (!bioData.title?.trim()) errors.push('El título es requerido')
  if (!bioData.mainText?.trim()) errors.push('El texto principal es requerido')
  return { isValid: errors.length === 0, errors }
}


// News Methods
const openNewsModal = (newsItem?: NewsItem) => {
  isEditingNews.value = !!newsItem
  if (newsItem) {
    newsForm.value = {
      id: newsItem.id,
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      publishDateString: newsItem.publishDate.toISOString().split('T')[0],
      externalUrl: newsItem.externalUrl || '',
      isPublished: newsItem.isPublished,
      isNew: newsItem.isNew
    }
    newsTagsText.value = newsItem.tags.join(', ')
  } else {
    resetNewsForm()
  }
  showNewsModal.value = true
}

const closeNewsModal = () => {
  showNewsModal.value = false
  resetNewsForm()
  newsFormErrors.value = []
}

const resetNewsForm = () => {
  newsForm.value = {
    title: '',
    excerpt: '',
    content: '',
    publishDateString: new Date().toISOString().split('T')[0],
    externalUrl: '',
    isPublished: true,
    isNew: false
  }
  newsTagsText.value = ''
}

const editNews = (newsItem: NewsItem) => {
  openNewsModal(newsItem)
}

const saveNews = async () => {
  newsFormErrors.value = []
  
  const newsData = {
    title: newsForm.value.title,
    excerpt: newsForm.value.excerpt,
    content: newsForm.value.content,
    publishDate: new Date(newsForm.value.publishDateString),
    externalUrl: newsForm.value.externalUrl || undefined,
    tags: newsTagsText.value.split(',').map(tag => tag.trim()).filter(tag => tag),
    isPublished: newsForm.value.isPublished,
    isNew: newsForm.value.isNew,
    image: undefined // TODO: implement image handling
  }

  const validation = validateNews(newsData)
  if (!validation.isValid) {
    newsFormErrors.value = validation.errors
    return
  }

  let result
  if (isEditingNews.value) {
    result = await updateNews(newsForm.value.id!, newsData)
  } else {
    result = await createNews(newsData as Omit<NewsItem, 'id'>)
  }

  if (result.success) {
    closeNewsModal()
    if (isEditingNews.value) {
      success('Noticia actualizada', 'Los cambios se han guardado correctamente')
    } else {
      success('Noticia creada', 'La nueva noticia se ha agregado exitosamente')
    }
  } else {
    newsFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const deleteNewsConfirm = (newsItem: NewsItem) => {
  itemToDelete.value = newsItem
  deleteType.value = 'news'
  showDeleteModal.value = true
}

// Biography Methods
const initializeBiographyForm = () => {
  if (biography.value) {
    biographyForm.value = {
      title: biography.value.title,
      subtitle: biography.value.subtitle,
      mainText: biography.value.mainText,
      quote: biography.value.quote,
      quoteAuthor: biography.value.quoteAuthor,
      image: biography.value.image
    }
    careerHighlightsText.value = biography.value.careerHighlights.join('\n')
  }
}

const saveBiography = async () => {
  biographyFormErrors.value = []

  const bioData = {
    title: biographyForm.value.title,
    subtitle: biographyForm.value.subtitle,
    mainText: biographyForm.value.mainText,
    quote: biographyForm.value.quote,
    quoteAuthor: biographyForm.value.quoteAuthor,
    image: biographyForm.value.image,
    careerHighlights: careerHighlightsText.value.split('\n').filter(h => h.trim())
  }

  const validation = validateBiography(bioData)
  if (!validation.isValid) {
    biographyFormErrors.value = validation.errors
    return
  }

  const result = await updateBiography(bioData)

  if (result.success) {
    success('Biografía actualizada', 'Los cambios se han guardado correctamente')
  } else {
    biographyFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

// Delete Methods
const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  const result = await deleteNews(itemToDelete.value.id)

  if (result.success) {
    closeDeleteModal()
    success('Noticia eliminada', 'La noticia se ha eliminado correctamente')
  } else {
    notifyError('Error al eliminar', result.error || 'Error desconocido')
  }
}

// Watch biography changes to update form
watch(biography, () => {
  if (biography.value) {
    initializeBiographyForm()
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  loadContent()
})
</script>

<style scoped>
/* Remove link underlines */
a {
  text-decoration: none !important;
}

a:visited {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}
</style> 