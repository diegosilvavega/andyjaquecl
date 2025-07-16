<template>
  <footer class="bg-black border-t border-gray-800 text-white py-16">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Logo y Slogan -->
        <div class="text-center md:text-left">
          <h3 class="text-2xl md:text-3xl font-capture text-yellow-400 mb-2">
            ANDY JAQUE
          </h3>
          <p class="text-gray-300 font-capture-2 text-lg">
            JAQUEANDO LA CUMBIA 2025 TOUR
          </p>
          <p class="text-gray-400 font-body text-sm mt-2">
            Artista-Productor musical-Youtuber
          </p>
        </div>

        <!-- Contacto -->
        <div class="text-center">
          <h4 class="text-xl font-capture text-yellow-400 mb-4">
            CONTACTO
          </h4>
          <div class="space-y-3">
            <!-- Teléfono/WhatsApp -->
            <div class="text-gray-300" v-if="contactInfo?.phone || contactInfo?.whatsapp">
              <p class="font-body text-sm mb-1">Teléfono / WhatsApp:</p>
              <a 
                :href="`tel:${contactInfo?.phone || contactInfo?.whatsapp}`"
                class="text-white text-lg font-bold hover:text-yellow-400 transition-colors"
              >
                {{ contactInfo?.phone || contactInfo?.whatsapp }}
              </a>
            </div>
            
            <!-- Email -->
            <div class="text-gray-300" v-if="contactInfo?.email">
              <p class="font-body text-sm mb-1">Email:</p>
              <a 
                :href="`mailto:${contactInfo.email}`"
                class="text-white hover:text-yellow-400 transition-colors"
              >
                {{ contactInfo.email }}
              </a>
            </div>
            
            <!-- Manager Email -->
            <div class="text-gray-300" v-if="contactInfo?.managerEmail">
              <p class="font-body text-sm mb-1">Manager:</p>
              <a 
                :href="`mailto:${contactInfo.managerEmail}`"
                class="text-white hover:text-yellow-400 transition-colors"
              >
                {{ contactInfo.managerEmail }}
              </a>
            </div>
            
            <!-- Ubicación -->
            <div class="text-gray-300" v-if="contactInfo?.location">
              <p class="font-body text-sm">
                📍 {{ contactInfo.location }}
              </p>
            </div>
            
            <!-- Fallback hardcodeado si no hay datos de Firebase -->
            <template v-if="!contactInfo">
              <div class="text-gray-300">
                <p class="font-body text-sm mb-1">Teléfono / WhatsApp:</p>
                <a 
                  href="tel:+56965933017" 
                  class="text-white text-lg font-bold hover:text-yellow-400 transition-colors"
                >
                  +56 9 6593 3017
                </a>
              </div>
              <div class="text-gray-300">
                <p class="font-body text-sm mb-1">Email:</p>
                <a 
                  href="mailto:managerandyjaque@gmail.com" 
                  class="text-white hover:text-yellow-400 transition-colors"
                >
                  managerandyjaque@gmail.com
                </a>
              </div>
              <div class="text-gray-300">
                <p class="font-body text-sm">
                  📍 Region de Coquimbo, Chile 🇨🇱
                </p>
              </div>
            </template>
          </div>
        </div>

        <!-- Redes Sociales -->
        <div class="text-center md:text-right">
          <h4 class="text-xl font-capture text-yellow-400 mb-4">
            SÍGUENOS
          </h4>
          <div class="flex justify-center md:justify-end gap-3 mb-4">
            <!-- Mostrar redes sociales dinámicas de Firebase -->
            <template v-for="social in activeSocialMedia" :key="social.id">
              <a 
                :href="social.url"
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
                :title="social.displayName"
              >
                <div class="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" :class="getSocialIconBg(social.platform)">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" v-html="getSocialIcon(social.platform)">
                  </svg>
                </div>
              </a>
            </template>
            
            <!-- Fallback hardcodeado si no hay datos de Firebase -->
            <template v-if="!activeSocialMedia || activeSocialMedia.length === 0">
              <a 
                href="https://www.instagram.com/andy_jaque/?hl=es" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
              >
                <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://www.facebook.com/AndyjaqueJ/?locale=es_LA" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
              >
                <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://www.tiktok.com/@andyjaqueoficial" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
              >
                <div class="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://www.youtube.com/@Andy_Jaque" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
              >
                <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
              </a>
              
              <a 
                href="https://open.spotify.com/intl-es/artist/2Dva1pArOWbj8tgHq6jTCw" 
                target="_blank" 
                rel="noopener noreferrer"
                class="social-icon-small"
              >
                <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </div>
              </a>
            </template>
          </div>
          
          <!-- Usernames dinámicos -->
          <div class="space-y-1 text-sm text-gray-400" v-if="activeSocialMedia && activeSocialMedia.length > 0">
            <p v-for="social in activeSocialMedia" :key="social.id">
              {{ social.username }}
            </p>
          </div>
          
          <!-- Usernames fallback -->
          <div class="space-y-1 text-sm text-gray-400" v-else>
            <p>@andy_jaque</p>
            <p>@andyjaqueoficial</p>
            <p>@Andy_Jaque</p>
          </div>
        </div>
      </div>

      <!-- Separador -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <p class="font-body">
              © 2025 Andy Jaque. Todos los derechos reservados.
            </p>
            <p class="font-body text-xs mt-1">
              Sitio web oficial del artista de cumbia chileno
            </p>
          </div>
          <div class="text-center md:text-right">
            <p class="font-body text-xs">
              Para eventos y contratos:
            </p>
            <p class="font-body text-xs">
              <a 
                :href="`mailto:${contactInfo?.managerEmail || 'managerandyjaque@gmail.com'}`"
                class="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                {{ contactInfo?.managerEmail || 'managerandyjaque@gmail.com' }}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ContactInfo, SocialMedia } from '~/types/admin'

// Estado para datos de contacto
const contactInfo = ref<ContactInfo | null>(null)
const activeSocialMedia = ref<SocialMedia[]>([])

// Cargar datos de contacto al montar el componente
onMounted(async () => {
  try {
    // Usar Firebase global para cargar datos de contacto
    const globalFirebase = useFirebaseGlobal()
    if (globalFirebase.isAvailable.value) {
      const contactData = await globalFirebase.loadContact()
      if (contactData && contactData.contactInfo) {
        contactInfo.value = contactData.contactInfo as ContactInfo
        activeSocialMedia.value = (contactData.socialMedia as SocialMedia[])
          .filter((sm: SocialMedia) => sm.isActive)
          .sort((a: SocialMedia, b: SocialMedia) => a.order - b.order)
      }
    }
  } catch (error) {
    console.error('Error cargando datos de contacto en Footer:', error)
    // Los datos de fallback ya están en el template
  }
})

// Funciones para iconos sociales (igual que en admin/contact)
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
</script>

<style scoped>
.social-icon-small {
  transition: transform 0.3s ease;
}

.social-icon-small:hover {
  transform: scale(1.1);
}
</style> 