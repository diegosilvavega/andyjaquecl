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
              GESTIÓN DE CONTACTO
            </h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-yellow-400 text-4xl mb-4">📞</div>
        <p class="text-gray-300">Cargando información de contacto...</p>
      </div>

      <!-- Error State - Removed -->

      <!-- Content -->
      <div v-else>
        <!-- Quick Stats -->
        <section class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Redes Sociales</p>
                  <p class="text-2xl font-bold text-white">{{ contactStats.activeSocialMedia }}/{{ contactStats.totalSocialMedia }}</p>
                </div>
                <div class="text-blue-400 text-2xl">🌐</div>
              </div>
            </div>
            

            
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Email Principal</p>
                  <p class="text-sm font-medium text-white truncate">{{ contactInfo?.email || 'No configurado' }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">📧</div>
              </div>
            </div>
            
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">WhatsApp</p>
                  <p class="text-sm font-medium text-white">{{ contactInfo?.whatsapp || 'No configurado' }}</p>
                </div>
                <div class="text-green-400 text-2xl">📱</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tabs Navigation -->
        <div class="bg-gray-800/50 rounded-2xl p-2 mb-8">
          <div class="flex space-x-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'flex items-center space-x-2 px-6 py-3 rounded-xl font-capture transition-all duration-300',
                activeTab === tab.id 
                  ? 'bg-yellow-400 text-gray-900 transform scale-105 shadow-lg' 
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700'
              ]"
            >
              <span class="text-lg">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
              <span 
                v-if="tab.count !== undefined" 
                :class="[
                  'text-xs px-2 py-1 rounded-full',
                  activeTab === tab.id ? 'bg-gray-900 text-yellow-400' : 'bg-gray-600 text-gray-100'
                ]"
              >
                {{ tab.count }}
              </span>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="bg-gray-800 rounded-xl border border-gray-700">
          <!-- Información General -->
          <div v-if="activeTab === 'info'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-capture text-yellow-400">INFORMACIÓN GENERAL</h2>
              <button
                @click="editingContact = true"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-capture flex items-center space-x-2"
              >
                <span>✏️</span>
                <span>Editar</span>
              </button>
            </div>

            <div v-if="!editingContact" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email Principal</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.email }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.phone }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">WhatsApp</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.whatsapp }}</p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email Manager</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.managerEmail }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Ubicación</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.location }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Horarios de Atención</label>
                  <p class="text-white bg-gray-700 p-3 rounded-lg">{{ contactInfo?.businessHours }}</p>
                </div>
              </div>
            </div>

            <!-- Edit Form -->
            <form v-else @submit.prevent="saveContactInfo" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email Principal *</label>
                  <input
                    v-model="contactForm.email"
                    type="email"
                    required
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
                  <input
                    v-model="contactForm.phone"
                    type="tel"
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">WhatsApp</label>
                  <input
                    v-model="contactForm.whatsapp"
                    type="tel"
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Email Manager</label>
                  <input
                    v-model="contactForm.managerEmail"
                    type="email"
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Ubicación</label>
                  <input
                    v-model="contactForm.location"
                    type="text"
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-1">Horarios de Atención</label>
                  <input
                    v-model="contactForm.businessHours"
                    type="text"
                    class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  >
                </div>
              </div>
              
              <div class="md:col-span-2 flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  @click="cancelEditContact"
                  class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-capture"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-capture"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>

          <!-- Redes Sociales -->
          <div v-else-if="activeTab === 'social'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-capture text-yellow-400">REDES SOCIALES</h2>
              <button
                @click="showSocialModal = true"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-capture flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Agregar Red Social</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="social in socialMediaList"
                :key="social.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400 transition-colors"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="getSocialIconBg(social.platform)">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" v-html="getSocialIcon(social.platform)">
                      </svg>
                    </div>
                    <span class="font-capture text-yellow-400">{{ social.platform.toUpperCase() }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span
                      :class="[
                        'w-2 h-2 rounded-full',
                        social.isActive ? 'bg-green-400' : 'bg-red-400'
                      ]"
                    ></span>
                    <span class="text-xs text-gray-400">
                      {{ social.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </div>
                </div>
                
                <div class="space-y-2 mb-4">
                  <p class="text-white font-medium">{{ social.displayName }}</p>
                  <p class="text-gray-400 text-sm">{{ social.username }}</p>
                  <a
                    :href="social.url"
                    target="_blank"
                    class="text-blue-400 hover:text-blue-300 text-sm underline"
                  >
                    Ver perfil
                  </a>
                </div>
                
                <div class="flex justify-end space-x-2">
                  <button
                    @click="editSocialMedia(social)"
                    class="text-yellow-400 hover:text-yellow-300 p-2"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    @click="confirmDeleteSocialMedia(social)"
                    class="text-red-400 hover:text-red-300 p-2"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <!-- Empty State -->
              <div
                v-if="socialMediaList.length === 0"
                class="md:col-span-2 lg:col-span-3 text-center py-12 text-gray-500"
              >
                <div class="text-4xl mb-4">🌐</div>
                <p>No hay redes sociales configuradas</p>
              </div>
            </div>
          </div>

          <!-- Configuraciones -->
          <div v-else-if="activeTab === 'settings'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-capture text-yellow-400">CONFIGURACIONES</h2>
            </div>

            <form @submit.prevent="saveContactSettings" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Configuraciones de Visualización -->
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-white mb-4">Visualización en el Sitio Web</h3>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-gray-300">Mostrar formulario de contacto</label>
                    <input
                      v-model="settingsForm.showContactForm"
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    >
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-gray-300">Mostrar redes sociales</label>
                    <input
                      v-model="settingsForm.showSocialMedia"
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    >
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-gray-300">Mostrar contactos profesionales</label>
                    <input
                      disabled
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    >
                  </div>
                </div>

                <!-- Configuraciones de Email -->
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-white mb-4">Configuración de Email</h3>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1">Email para formulario de contacto</label>
                    <input
                      v-model="settingsForm.contactFormEmail"
                      type="email"
                      class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-gray-300">Respuesta automática</label>
                    <input
                      v-model="settingsForm.autoReplyEnabled"
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    >
                  </div>
                  
                  <div v-if="settingsForm.autoReplyEnabled">
                    <label class="block text-sm font-medium text-gray-400 mb-1">Mensaje de respuesta automática</label>
                    <textarea
                      v-model="settingsForm.autoReplyMessage"
                      rows="3"
                      class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    ></textarea>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-gray-300">Protección anti-spam</label>
                    <input
                      v-model="settingsForm.enableSpamProtection"
                      type="checkbox"
                      class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    >
                  </div>
                </div>
              </div>
              
              <div class="flex justify-end pt-6">
                <button
                  type="submit"
                  class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-capture"
                >
                  Guardar Configuraciones
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <!-- Social Media Modal -->
    <div
      v-if="showSocialModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeSocialModal"
    >
      <div class="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <h3 class="text-lg font-capture text-yellow-400 mb-4">
          {{ editingSocialMedia ? 'EDITAR RED SOCIAL' : 'AGREGAR RED SOCIAL' }}
        </h3>
        
        <form @submit.prevent="saveSocialMedia" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Plataforma *</label>
            <select
              v-model="socialForm.platform"
              required
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Seleccionar plataforma</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="spotify">Spotify</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre de Usuario *</label>
            <input
              v-model="socialForm.username"
              type="text"
              required
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">URL *</label>
            <input
              v-model="socialForm.url"
              type="url"
              required
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Nombre para Mostrar *</label>
            <input
              v-model="socialForm.displayName"
              type="text"
              required
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            >
          </div>
          
          <div class="flex items-center justify-between">
            <label class="text-gray-300">Activo</label>
            <input
              v-model="socialForm.isActive"
              type="checkbox"
              class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
            >
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="closeSocialModal"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              {{ editingSocialMedia ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showConfirmModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4 border border-gray-700">
        <h3 class="text-lg font-capture text-yellow-400 mb-4">CONFIRMAR ELIMINACIÓN</h3>
        
        <p class="text-gray-300 mb-6">
          ¿Estás seguro de que quieres eliminar <strong>{{ itemToDelete?.name || itemToDelete?.displayName || itemToDelete?.platform }}</strong>?
        </p>
        
        <div class="flex justify-end space-x-4">
          <button
            @click="showConfirmModal = false"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactInfo, SocialMedia, ContactSettings } from '~/types/admin'

// Meta
definePageMeta({
  layout: false
})

// Composables
const {
  contactInfo,
  socialMediaList,
  contactSettings,
  loading,
  contactStats,
  loadContactData,
  updateContactInfo,
  addSocialMedia,
  updateSocialMedia,
  deleteSocialMedia
} = useAdminContact()

// State
const activeTab = ref('info')
const editingContact = ref(false)
const showSocialModal = ref(false)
const showConfirmModal = ref(false)
const editingSocialMedia = ref<SocialMedia | null>(null)
const itemToDelete = ref<any>(null)
const deleteType = ref<'social'>('social')

// Forms
const contactForm = ref<Partial<ContactInfo>>({})
const socialForm = ref<Partial<SocialMedia>>({
  platform: undefined,
  username: '',
  url: '',
  displayName: '',
  isActive: true,
  order: 1
})
const settingsForm = ref<Partial<ContactSettings>>({})

// Computed
const tabs = computed(() => [
  {
    id: 'info',
    label: 'Info General',
    icon: '📞',
    count: undefined
  },
  {
    id: 'social',
    label: 'Redes Sociales',
    icon: '🌐',
    count: contactStats.value.activeSocialMedia
  },
  {
    id: 'settings',
    label: 'Configuraciones',
    icon: '⚙️',
    count: undefined
  }
])

// Methods
const getSocialIcon = (platform: string) => {
  const icons: Record<string, string> = {
    instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
    facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    tiktok: '<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
    spotify: '<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>'
  }
  return icons[platform] || '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
}

const getSocialIconBg = (platform: string) => {
  const backgrounds: Record<string, string> = {
    instagram: 'bg-gradient-to-br from-purple-500 to-pink-500',
    facebook: 'bg-blue-600',
    youtube: 'bg-red-600',
    tiktok: 'bg-gradient-to-br from-red-500 to-blue-600',
    spotify: 'bg-green-500'
  }
  return backgrounds[platform] || 'bg-gray-600'
}

// Contact Info Methods
const saveContactInfo = async () => {
  try {
    await updateContactInfo(contactForm.value)
    editingContact.value = false
  } catch (err) {
    console.error('Error saving contact info:', err)
  }
}

const cancelEditContact = () => {
  editingContact.value = false
  contactForm.value = {}
}

// Social Media Methods
const editSocialMedia = (social: SocialMedia) => {
  editingSocialMedia.value = social
  socialForm.value = { ...social }
  showSocialModal.value = true
}

const saveSocialMedia = async () => {
  try {
    if (editingSocialMedia.value) {
      await updateSocialMedia(editingSocialMedia.value.id, socialForm.value)
    } else {
              await addSocialMedia(
          socialForm.value.platform!,
          socialForm.value.username!,
          socialForm.value.url!,
          socialForm.value.displayName!
        )
    }
    closeSocialModal()
  } catch (err) {
    console.error('Error saving social media:', err)
  }
}

const closeSocialModal = () => {
  showSocialModal.value = false
  editingSocialMedia.value = null
  socialForm.value = {
    platform: undefined,
    username: '',
    url: '',
    displayName: '',
    isActive: true,
    order: 1
  }
}

const confirmDeleteSocialMedia = (social: SocialMedia) => {
  itemToDelete.value = social
  deleteType.value = 'social'
  showConfirmModal.value = true
}

// Settings Methods
const saveContactSettings = async () => {
  try {
            // Funcionalidad de configuración removida temporalmente
  } catch (err) {
    console.error('Error saving contact settings:', err)
  }
}

// Confirmation Methods
const confirmDelete = async () => {
  try {
    if (deleteType.value === 'social' && itemToDelete.value) {
      await deleteSocialMedia(itemToDelete.value.id)
    }
    showConfirmModal.value = false
    itemToDelete.value = null
  } catch (err) {
    console.error('Error deleting item:', err)
  }
}

// Watchers
watch(contactInfo, (newInfo) => {
  if (newInfo && !editingContact.value) {
    contactForm.value = { ...newInfo }
  }
}, { immediate: true })

watch(contactSettings, (newSettings) => {
  if (newSettings) {
    settingsForm.value = { ...newSettings }
  }
}, { immediate: true })

// Initialize
onMounted(() => {
  loadContactData()
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