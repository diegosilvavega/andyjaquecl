<template>
  <div class="min-h-screen bg-gray-900">
    <!-- Login Form (when not authenticated) -->
    <div v-if="!isAuthenticated" class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
      <div class="max-w-md w-full mx-4">
        <div class="bg-gray-800 rounded-xl p-8 border border-yellow-400/20 shadow-2xl">
          <div class="text-center mb-8">
            <h1 class="text-3xl font-capture text-yellow-400 mb-2">
              PANEL DE ADMIN
            </h1>
            <p class="text-gray-300 font-body">
              Acceso exclusivo para Andy Jaque
            </p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Usuario
              </label>
              <input
                v-model="credentials.email"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                v-model="credentials.password"
                type="password"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              type="submit"
              :disabled="isLoggingIn"
              class="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-600 text-black font-capture font-bold py-3 px-4 rounded-lg transition-colors duration-300"
            >
              <span v-if="isLoggingIn">VERIFICANDO...</span>
              <span v-else>🔐 ACCEDER AL PANEL</span>
            </button>

            <div v-if="loginError" class="bg-red-600/20 border border-red-500 rounded-lg p-3">
              <p class="text-red-400 text-sm text-center">
                {{ loginError }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Admin Dashboard (when authenticated) -->
    <div v-else class="min-h-screen">
      <!-- Header -->
      <header class="bg-gray-800 border-b border-gray-700">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-4">
              <h1 class="text-2xl font-capture text-yellow-400">
                ADMIN PANEL
              </h1>
              <span class="text-gray-400 text-sm">
                Panel de control de Andy Jaque
              </span>
            </div>
            
            <div class="flex items-center space-x-4">
              <span class="text-gray-300 text-sm">
                Bienvenido, <span class="text-yellow-400 font-bold">Andy</span>
              </span>
              <button
                @click="handleLogout"
                class="group flex items-center space-x-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-400 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg font-capture text-sm transition-all duration-300 shadow-lg hover:shadow-red-500/20"
              >
                <svg class="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>CERRAR SESIÓN</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="container mx-auto px-4 py-8">
        <!-- Welcome Section -->
        <section class="mb-8">
          <div class="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border border-yellow-400/30 rounded-xl p-6">
            <h2 class="text-xl font-capture text-yellow-400 mb-2">
              ¡Hola Andy! 👋
            </h2>
            <p class="text-gray-300">
              Desde aquí puedes gestionar todo el contenido de tu sitio web de forma fácil y rápida.
            </p>
          </div>
        </section>

        <!-- Quick Stats -->
        <section class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Próximos Eventos</p>
                  <p class="text-2xl font-bold text-white">{{ stats.upcomingEvents }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">🎤</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Noticias Activas</p>
                  <p class="text-2xl font-bold text-white">{{ stats.activeNews }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">📰</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Cursos Activos</p>
                  <p class="text-2xl font-bold text-white">{{ stats.activeCourses }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">📚</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Servicios Activos</p>
                  <p class="text-2xl font-bold text-white">{{ stats.activeServices }}</p>
                </div>
                <div class="text-yellow-400 text-2xl">🎵</div>
              </div>
            </div>
          </div>
        </section>


        <!-- Admin Sections Grid -->
        <section>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Events Management -->
            <NuxtLink to="/admin/events" class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-colors group cursor-pointer block">
              <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🎤</div>
                <h3 class="text-xl font-capture text-yellow-400 mb-2">EVENTOS</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Gestiona fechas del tour, venues y venta de tickets
                </p>
                <div class="space-y-2 text-xs text-gray-400">
                  <p>• Agregar/editar fechas</p>
                  <p>• Configurar precios</p>
                  <p>• Enlaces de tickets</p>
                </div>
                <div class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-capture font-bold py-2 px-4 rounded-lg transition-colors">
                  GESTIONAR EVENTOS
                </div>
              </div>
            </NuxtLink>

            <!-- Prices Management -->
            <NuxtLink to="/admin/prices" class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-colors group cursor-pointer block">
              <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">💰</div>
                <h3 class="text-xl font-capture text-yellow-400 mb-2">PRECIOS</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Actualiza precios de cursos y servicios de producción
                </p>
                <div class="space-y-2 text-xs text-gray-400">
                  <p>• Cursos de teclado</p>
                  <p>• Servicios de producción</p>
                  <p>• Ofertas promocionales</p>
                </div>
                <div class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-capture font-bold py-2 px-4 rounded-lg transition-colors">
                  GESTIONAR PRECIOS
                </div>
              </div>
            </NuxtLink>

            <!-- Content Management -->
            <NuxtLink to="/admin/content" class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-colors group cursor-pointer block">
              <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">📰</div>
                <h3 class="text-xl font-capture text-yellow-400 mb-2">CONTENIDO</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Gestiona noticias, biografía y estadísticas
                </p>
                <div class="space-y-2 text-xs text-gray-400">
                  <p>• Crear/editar noticias</p>
                  <p>• Actualizar biografía</p>
                  <p>• Gestionar estadísticas</p>
                </div>
                <div class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-capture font-bold py-2 px-4 rounded-lg transition-colors">
                  GESTIONAR CONTENIDO
                </div>
              </div>
            </NuxtLink>

            <!-- Multimedia Module -->
            <NuxtLink to="/admin/media" class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-colors group cursor-pointer block">
              <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">🎵</div>
                <h3 class="text-xl font-capture text-yellow-400 mb-2">MULTIMEDIA</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Gestiona música, videos y configuración del reproductor
                </p>
                <div class="space-y-2 text-xs text-gray-400">
                  <p>• {{ mediaStats.activeSongs }} canciones activas</p>
                  <p>• {{ mediaStats.activeVideos }} videos disponibles</p>
                  <p>• {{ mediaStats.activePlaylists }} playlists configuradas</p>
                </div>
                <div class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-capture font-bold py-2 px-4 rounded-lg transition-colors">
                  GESTIONAR MULTIMEDIA
                </div>
              </div>
            </NuxtLink>

            <!-- Contact Management -->
            <NuxtLink to="/admin/contact" class="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-400/50 transition-colors group cursor-pointer block">
              <div class="text-center">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">📞</div>
                <h3 class="text-xl font-capture text-yellow-400 mb-2">CONTACTO</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Gestiona información de contacto y redes sociales
                </p>
                <div class="space-y-2 text-xs text-gray-400">
                  <p>• {{ contactStats.activeSocialMedia }} redes sociales activas</p>
                  <p>• {{ contactStats.publicProfessionalContacts }} contactos profesionales</p>
                  <p>• Configuraciones de contacto</p>
                </div>
                <div class="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-capture font-bold py-2 px-4 rounded-lg transition-colors">
                  GESTIONAR CONTACTO
                </div>
              </div>
            </NuxtLink>
          </div>
        </section>


      </main>
    </div>

    <!-- Notifications -->
    <AdminNotificationToast />
  </div>
</template>

<script setup lang="ts">
import type { LoginCredentials } from '~/types/admin'

// SEO
useHead({
  title: 'Panel de Administración - Andy Jaque',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Authentication state
const isAuthenticated = ref(false)
const isLoggingIn = ref(false)
const loginError = ref('')

// Login credentials
const credentials = ref<LoginCredentials>({
  email: '',
  password: ''
})

// Real stats from composables
const { getEventStats, loadEvents } = useAdminEvents()
const { getPriceStats, loadPrices } = useAdminPrices()
const { getMediaStats, loadMedia } = useAdminMedia()
const { getContentStats, loadContent } = useAdminContent()
const { contactStats, loadAllContactData } = useAdminContact()

const stats = computed(() => ({
  upcomingEvents: getEventStats.value.upcoming,
  activeNews: getContentStats.value.publishedNews,
  activeCourses: getPriceStats.value.activeCourses,
  activeServices: getPriceStats.value.activeServices,
  lastUpdate: new Date()
}))

const mediaStats = computed(() => getMediaStats.value)



// Login handler
const handleLogin = async () => {
  isLoggingIn.value = true
  loginError.value = ''

  try {
    // Simple authentication (in production, this should be more secure)
    if (credentials.value.email === 'andy' && credentials.value.password === 'jaque2025') {
      isAuthenticated.value = true
      // Store auth state in localStorage
      localStorage.setItem('admin_authenticated', 'true')
    } else {
      loginError.value = 'Usuario o contraseña incorrectos'
    }
  } catch (error) {
    loginError.value = 'Error al iniciar sesión'
  } finally {
    isLoggingIn.value = false
  }
}

// Logout handler
const handleLogout = () => {
  isAuthenticated.value = false
  localStorage.removeItem('admin_authenticated')
  credentials.value = { email: '', password: '' }
}

// Format date helper
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Load data when component mounts
onMounted(async () => {
  // Check authentication first
  if (typeof window !== 'undefined') {
    const authState = localStorage.getItem('admin_authenticated')
    if (authState === 'true') {
      isAuthenticated.value = true
      
      // Load data for dashboard stats
      await loadEvents()
      await loadPrices()
      await loadContent()
      await loadMedia()
      await loadAllContactData()
    }
  }
})


</script>

<style scoped>
/* Reset link styles for admin cards */
a.group {
  text-decoration: none !important;
  color: inherit !important;
}

a.group:visited {
  color: inherit !important;
  text-decoration: none !important;
}

a.group:hover {
  color: inherit !important;
  text-decoration: none !important;
}

/* Ensure titles stay yellow */
a.group h3 {
  color: #facc15 !important; /* text-yellow-400 */
}

a.group:visited h3 {
  color: #facc15 !important; /* text-yellow-400 */
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style> 