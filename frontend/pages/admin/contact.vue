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

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600/20 border border-red-500 rounded-xl p-6 mb-8">
        <p class="text-red-400">{{ error }}</p>
        <button 
          @click="loadAllContactData" 
          class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-capture"
        >
          Reintentar
        </button>
      </div>

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
                  <p class="text-gray-400 text-sm">Contactos Profesionales</p>
                  <p class="text-2xl font-bold text-white">{{ contactStats.publicProfessionalContacts }}/{{ contactStats.totalProfessionalContacts }}</p>
                </div>
                <div class="text-green-400 text-2xl">👔</div>
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
                    <span class="text-2xl">{{ getSocialIcon(social.platform) }}</span>
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

          <!-- Contactos Profesionales -->
          <div v-else-if="activeTab === 'professional'" class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-capture text-yellow-400">CONTACTOS PROFESIONALES</h2>
              <button
                @click="showProfessionalModal = true"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-capture flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Agregar Contacto</span>
              </button>
            </div>

            <div class="space-y-6">
              <div
                v-for="contact in professionalContacts"
                :key="contact.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400 transition-colors"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-3">
                      <span class="text-2xl">{{ getProfessionalIcon(contact.type) }}</span>
                      <span
                        :class="[
                          'px-3 py-1 rounded-full text-xs font-medium uppercase',
                          getProfessionalColor(contact.type)
                        ]"
                      >
                        {{ contact.type }}
                      </span>
                      <span
                        :class="[
                          'w-2 h-2 rounded-full',
                          contact.isPublic ? 'bg-green-400' : 'bg-gray-400'
                        ]"
                      ></span>
                      <span class="text-xs text-gray-400">
                        {{ contact.isPublic ? 'Público' : 'Privado' }}
                      </span>
                    </div>
                    
                    <h3 class="text-lg font-medium text-white mb-2">{{ contact.name }}</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p class="text-gray-400">Email:</p>
                        <p class="text-white">{{ contact.email }}</p>
                      </div>
                      <div v-if="contact.phone">
                        <p class="text-gray-400">Teléfono:</p>
                        <p class="text-white">{{ contact.phone }}</p>
                      </div>
                      <div v-if="contact.company">
                        <p class="text-gray-400">Empresa:</p>
                        <p class="text-white">{{ contact.company }}</p>
                      </div>
                      <div v-if="contact.role">
                        <p class="text-gray-400">Cargo:</p>
                        <p class="text-white">{{ contact.role }}</p>
                      </div>
                    </div>
                    
                    <div v-if="contact.notes" class="mt-4">
                      <p class="text-gray-400 text-sm">Notas:</p>
                      <p class="text-gray-300 text-sm">{{ contact.notes }}</p>
                    </div>
                  </div>
                  
                  <div class="flex space-x-2 ml-4">
                    <button
                      @click="editProfessionalContact(contact)"
                      class="text-yellow-400 hover:text-yellow-300 p-2"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      @click="confirmDeleteProfessionalContact(contact)"
                      class="text-red-400 hover:text-red-300 p-2"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div
                v-if="professionalContacts.length === 0"
                class="text-center py-12 text-gray-500"
              >
                <div class="text-4xl mb-4">👔</div>
                <p>No hay contactos profesionales configurados</p>
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
                      v-model="settingsForm.showProfessionalContacts"
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

    <!-- Professional Contact Modal -->
    <div
      v-if="showProfessionalModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeProfessionalModal"
    >
      <div class="bg-gray-800 rounded-xl p-6 w-full max-w-lg mx-4 border border-gray-700">
        <h3 class="text-lg font-capture text-yellow-400 mb-4">
          {{ editingProfessionalContact ? 'EDITAR CONTACTO' : 'AGREGAR CONTACTO' }}
        </h3>
        
        <form @submit.prevent="saveProfessionalContact" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Tipo *</label>
              <select
                v-model="professionalForm.type"
                required
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Seleccionar tipo</option>
                <option value="manager">Manager</option>
                <option value="booking">Booking</option>
                <option value="press">Prensa</option>
                <option value="label">Disquera</option>
                <option value="publisher">Editorial</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Nombre *</label>
              <input
                v-model="professionalForm.name"
                type="text"
                required
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Email *</label>
              <input
                v-model="professionalForm.email"
                type="email"
                required
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Teléfono</label>
              <input
                v-model="professionalForm.phone"
                type="tel"
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Empresa</label>
              <input
                v-model="professionalForm.company"
                type="text"
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Cargo</label>
              <input
                v-model="professionalForm.role"
                type="text"
                class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1">Notas</label>
            <textarea
              v-model="professionalForm.notes"
              rows="3"
              class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>
          
          <div class="flex items-center justify-between">
            <label class="text-gray-300">Público (visible en el sitio web)</label>
            <input
              v-model="professionalForm.isPublic"
              type="checkbox"
              class="w-5 h-5 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
            >
          </div>
          
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="closeProfessionalModal"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              {{ editingProfessionalContact ? 'Actualizar' : 'Crear' }}
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
import type { ContactInfo, SocialMedia, ProfessionalContact, ContactSettings } from '~/types/admin'

// Meta
definePageMeta({
  layout: false
})

// Composables
const {
  contactInfo,
  socialMediaList,
  professionalContacts,
  contactSettings,
  loading,
  error,
  contactStats,
  loadAllContactData,
  updateContactInfo,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  createProfessionalContact,
  updateProfessionalContact,
  deleteProfessionalContact,
  updateContactSettings
} = useAdminContact()

// State
const activeTab = ref('info')
const editingContact = ref(false)
const showSocialModal = ref(false)
const showProfessionalModal = ref(false)
const showConfirmModal = ref(false)
const editingSocialMedia = ref<SocialMedia | null>(null)
const editingProfessionalContact = ref<ProfessionalContact | null>(null)
const itemToDelete = ref<any>(null)
const deleteType = ref<'social' | 'professional'>('social')

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
const professionalForm = ref<Partial<ProfessionalContact>>({
  type: undefined,
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  isPublic: true,
  order: 1,
  notes: ''
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
    id: 'professional',
    label: 'Contactos Pro',
    icon: '👔',
    count: contactStats.value.publicProfessionalContacts
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
    instagram: '📸',
    facebook: '📘',
    youtube: '📺',
    tiktok: '🎵',
    spotify: '🎧'
  }
  return icons[platform] || '🌐'
}

const getProfessionalIcon = (type: string) => {
  const icons: Record<string, string> = {
    manager: '👨‍💼',
    booking: '📅',
    press: '📰',
    label: '💿',
    publisher: '📚'
  }
  return icons[type] || '👔'
}

const getProfessionalColor = (type: string) => {
  const colors: Record<string, string> = {
    manager: 'bg-blue-600 text-blue-100',
    booking: 'bg-green-600 text-green-100',
    press: 'bg-purple-600 text-purple-100',
    label: 'bg-red-600 text-red-100',
    publisher: 'bg-yellow-600 text-yellow-100'
  }
  return colors[type] || 'bg-gray-600 text-gray-100'
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
      await createSocialMedia(socialForm.value as Omit<SocialMedia, 'id'>)
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

// Professional Contact Methods
const editProfessionalContact = (contact: ProfessionalContact) => {
  editingProfessionalContact.value = contact
  professionalForm.value = { ...contact }
  showProfessionalModal.value = true
}

const saveProfessionalContact = async () => {
  try {
    if (editingProfessionalContact.value) {
      await updateProfessionalContact(editingProfessionalContact.value.id, professionalForm.value)
    } else {
      await createProfessionalContact(professionalForm.value as Omit<ProfessionalContact, 'id' | 'updatedAt'>)
    }
    closeProfessionalModal()
  } catch (err) {
    console.error('Error saving professional contact:', err)
  }
}

const closeProfessionalModal = () => {
  showProfessionalModal.value = false
  editingProfessionalContact.value = null
  professionalForm.value = {
    type: undefined,
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    isPublic: true,
    order: 1,
    notes: ''
  }
}

const confirmDeleteProfessionalContact = (contact: ProfessionalContact) => {
  itemToDelete.value = contact
  deleteType.value = 'professional'
  showConfirmModal.value = true
}

// Settings Methods
const saveContactSettings = async () => {
  try {
    await updateContactSettings(settingsForm.value)
  } catch (err) {
    console.error('Error saving contact settings:', err)
  }
}

// Confirmation Methods
const confirmDelete = async () => {
  try {
    if (deleteType.value === 'social' && itemToDelete.value) {
      await deleteSocialMedia(itemToDelete.value.id)
    } else if (deleteType.value === 'professional' && itemToDelete.value) {
      await deleteProfessionalContact(itemToDelete.value.id)
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
  loadAllContactData()
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