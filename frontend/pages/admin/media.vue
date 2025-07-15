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
              GESTIÓN DE MULTIMEDIA
            </h1>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-yellow-400 text-4xl mb-4">🎵</div>
        <p class="text-gray-300">Cargando multimedia...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-600/20 border border-red-500 rounded-xl p-6 mb-8">
        <p class="text-red-400">{{ error }}</p>
        <button 
          @click="loadMedia" 
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
                  <p class="text-gray-400 text-sm">Canciones Activas</p>
                  <p class="text-2xl font-bold text-white">{{ mediaStats.activeSongs }}</p>
                </div>
                <div class="text-blue-400 text-2xl">🎵</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Videos Activos</p>
                  <p class="text-2xl font-bold text-green-400">{{ mediaStats.activeVideos }}</p>
                </div>
                <div class="text-green-400 text-2xl">🎬</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Playlists Activas</p>
                  <p class="text-2xl font-bold text-purple-400">{{ mediaStats.activePlaylists }}</p>
                </div>
                <div class="text-purple-400 text-2xl">📝</div>
              </div>
            </div>

            <div class="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 text-sm">Duración Total</p>
                  <p class="text-2xl font-bold text-orange-400">{{ mediaStats.formattedTotalDuration }}</p>
                </div>
                <div class="text-orange-400 text-2xl">⏱️</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Tabs -->
        <div class="mb-8">
          <div class="bg-gray-800 rounded-xl p-2 inline-flex space-x-2">
            <button
              @click="activeTab = 'songs'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'songs'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>🎵</span>
                <span>CANCIONES</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ songs.length }}</span>
              </span>
            </button>
            <button
              @click="activeTab = 'videos'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'videos'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>🎬</span>
                <span>VIDEOS</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ videos.length }}</span>
              </span>
            </button>
            <button
              @click="activeTab = 'playlists'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'playlists'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>📝</span>
                <span>PLAYLISTS</span>
                <span class="bg-black/20 text-xs px-2 py-1 rounded-full">{{ playlists.length }}</span>
              </span>
            </button>
            <button
              @click="activeTab = 'settings'"
              :class="[
                'px-6 py-3 rounded-lg font-capture text-sm transition-all duration-300 relative overflow-hidden',
                activeTab === 'settings'
                  ? 'bg-yellow-400 text-black shadow-lg transform scale-105'
                  : 'text-gray-100 bg-transparent hover:text-yellow-300 hover:bg-gray-700/50'
              ]"
            >
              <span class="relative z-10 flex items-center space-x-2">
                <span>⚙️</span>
                <span>REPRODUCTOR</span>
              </span>
            </button>
          </div>
        </div>

        <!-- Songs Tab -->
        <section v-if="activeTab === 'songs'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Gestión de Canciones</h2>
            <button
              @click="openSongModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVA CANCIÓN
            </button>
          </div>

          <div class="p-6">
            <div v-if="songs.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">🎵</div>
              <p class="text-gray-400 mb-4">No hay canciones registradas</p>
              <button
                @click="openSongModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMERA CANCIÓN
              </button>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="song in songs"
                :key="song.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div v-if="song.coverUrl" class="w-16 h-16 rounded-lg overflow-hidden bg-gray-600">
                      <img :src="song.coverUrl" :alt="song.title" class="w-full h-full object-cover">
                    </div>
                    <div v-else class="w-16 h-16 rounded-lg bg-gray-600 flex items-center justify-center text-2xl">
                      🎵
                    </div>
                    
                    <div>
                      <h3 class="text-lg font-capture text-white mb-1">{{ song.title }}</h3>
                      <p class="text-gray-400 text-sm">{{ song.artist }}</p>
                      <p class="text-gray-500 text-xs">{{ song.album }} • {{ formatDuration(song.duration) }}</p>
                    </div>
                  </div>

                  <div class="flex items-center space-x-4">
                    <div class="text-right">
                      <div class="flex items-center space-x-2 mb-1">
                        <span 
                          v-if="song.isFeatured"
                          class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-capture"
                        >
                          Destacada
                        </span>
                        <span 
                          :class="song.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                          class="px-2 py-1 rounded text-xs font-capture"
                        >
                          {{ song.isActive ? 'Activa' : 'Inactiva' }}
                        </span>
                      </div>
                      <p class="text-gray-400 text-xs">Orden: {{ song.order }}</p>
                    </div>

                    <div class="flex space-x-2">
                      <button
                        @click="editSong(song)"
                        class="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        @click="deleteSongConfirm(song)"
                        class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="song.description" class="mt-4 text-gray-400 text-sm">
                  {{ song.description }}
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Videos Tab -->
        <section v-if="activeTab === 'videos'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Gestión de Videos</h2>
            <button
              @click="openVideoModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVO VIDEO
            </button>
          </div>

          <div class="p-6">
            <div v-if="videos.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">🎬</div>
              <p class="text-gray-400 mb-4">No hay videos registrados</p>
              <button
                @click="openVideoModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMER VIDEO
              </button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="video in videos"
                :key="video.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div v-if="video.thumbnailUrl" class="w-full h-32 rounded-lg overflow-hidden bg-gray-600 mb-4">
                  <img :src="video.thumbnailUrl" :alt="video.title" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-full h-32 rounded-lg bg-gray-600 flex items-center justify-center text-4xl mb-4">
                  🎬
                </div>

                <div class="mb-4">
                  <h3 class="text-lg font-capture text-white mb-2">{{ video.title }}</h3>
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="bg-gray-600 text-gray-300 px-2 py-1 rounded text-xs">
                      {{ getCategoryName(video.category) }}
                    </span>
                    <span 
                      v-if="video.isFeatured"
                      class="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs font-capture"
                    >
                      Destacado
                    </span>
                    <span 
                      :class="video.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                      class="px-2 py-1 rounded text-xs font-capture"
                    >
                      {{ video.isActive ? 'Activo' : 'Inactivo' }}
                    </span>
                  </div>
                  <p v-if="video.description" class="text-gray-500 text-sm">{{ video.description }}</p>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="editVideo(video)"
                    class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    @click="deleteVideoConfirm(video)"
                    class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Playlists Tab -->
        <section v-if="activeTab === 'playlists'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-capture text-yellow-400">Gestión de Playlists</h2>
            <button
              @click="openPlaylistModal()"
              class="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-capture font-bold transition-colors"
            >
              ➕ NUEVA PLAYLIST
            </button>
          </div>

          <div class="p-6">
            <div v-if="playlists.length === 0" class="text-center py-12">
              <div class="text-gray-400 text-4xl mb-4">📝</div>
              <p class="text-gray-400 mb-4">No hay playlists registradas</p>
              <button
                @click="openPlaylistModal()"
                class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors"
              >
                ➕ CREAR PRIMERA PLAYLIST
              </button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="playlist in playlists"
                :key="playlist.id"
                class="bg-gray-700 rounded-xl p-6 border border-gray-600 hover:border-yellow-400/50 transition-colors"
              >
                <div class="mb-4">
                  <h3 class="text-lg font-capture text-white mb-2">{{ playlist.name }}</h3>
                  <p class="text-gray-400 text-sm mb-2">{{ playlist.songs.length }} canciones</p>
                  <div class="flex items-center space-x-2 mb-2">
                    <span 
                      :class="playlist.isActive ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'"
                      class="px-2 py-1 rounded text-xs font-capture"
                    >
                      {{ playlist.isActive ? 'Activa' : 'Inactiva' }}
                    </span>
                    <span 
                      :class="playlist.isPublic ? 'bg-blue-600/20 text-blue-400' : 'bg-gray-600/20 text-gray-400'"
                      class="px-2 py-1 rounded text-xs font-capture"
                    >
                      {{ playlist.isPublic ? 'Pública' : 'Privada' }}
                    </span>
                  </div>
                  <p v-if="playlist.description" class="text-gray-500 text-sm">{{ playlist.description }}</p>
                </div>

                <div class="flex space-x-2">
                  <button
                    @click="editPlaylist(playlist as Playlist)"
                    class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    @click="deletePlaylistConfirm(playlist as Playlist)"
                    class="bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 rounded-lg text-sm transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Player Settings Tab -->
        <section v-if="activeTab === 'settings'" class="bg-gray-800 rounded-xl border border-gray-700">
          <div class="p-6 border-b border-gray-700">
            <h2 class="text-xl font-capture text-yellow-400">Configuración del Reproductor</h2>
          </div>

          <div class="p-6" v-if="playerSettings">
            <form @submit.prevent="savePlayerSettings" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h3 class="text-lg font-capture text-white mb-4">Audio</h3>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Volumen por defecto
                    </label>
                    <div class="flex items-center space-x-4">
                      <input
                        v-model.number="settingsForm.volume"
                        type="range"
                        min="0"
                        max="100"
                        class="flex-1"
                      />
                      <span class="text-white w-12 text-center">{{ settingsForm.volume }}%</span>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Crossfade (segundos)
                    </label>
                    <input
                      v-model.number="settingsForm.crossfade"
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div class="space-y-4">
                  <h3 class="text-lg font-capture text-white mb-4">Comportamiento</h3>
                  
                  <label class="flex items-center">
                    <input
                      v-model="settingsForm.autoplay"
                      type="checkbox"
                      class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
                    />
                    <span class="ml-2 text-gray-300">Reproducción automática</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="settingsForm.showVisualizer"
                      type="checkbox"
                      class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
                    />
                    <span class="ml-2 text-gray-300">Mostrar visualizador</span>
                  </label>

                  <label class="flex items-center">
                    <input
                      v-model="settingsForm.shuffleMode"
                      type="checkbox"
                      class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
                    />
                    <span class="ml-2 text-gray-300">Modo aleatorio por defecto</span>
                  </label>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Modo de repetición
                    </label>
                    <select
                      v-model="settingsForm.repeatMode"
                      class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    >
                      <option value="none">Sin repetición</option>
                      <option value="one">Repetir canción</option>
                      <option value="all">Repetir lista</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2">
                      Playlist por defecto
                    </label>
                    <select
                      v-model="settingsForm.defaultPlaylist"
                      class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white"
                    >
                      <option value="">Ninguna</option>
                      <option v-for="playlist in playlists" :key="playlist.id" :value="playlist.id">
                        {{ playlist.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="saving"
                  class="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
                >
                  {{ saving ? 'GUARDANDO...' : 'GUARDAR CONFIGURACIÓN' }}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>

    <!-- Song Modal -->
    <div 
      v-if="showSongModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeSongModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingSong ? 'EDITAR CANCIÓN' : 'NUEVA CANCIÓN' }}
          </h3>
        </div>

        <form @submit.prevent="saveSong" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Título *
              </label>
              <input
                v-model="songForm.title"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Nombre de la canción"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Artista *
              </label>
              <input
                v-model="songForm.artist"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Andy Jaque"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Álbum
              </label>
              <input
                v-model="songForm.album"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Nombre del álbum"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Duración (segundos) *
              </label>
              <input
                v-model.number="songForm.duration"
                type="number"
                required
                min="1"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="240"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Género
              </label>
              <input
                v-model="songForm.genre"
                type="text"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Cumbia"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Fecha de lanzamiento
              </label>
              <input
                v-model="songForm.releaseDate"
                type="date"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              URL del Audio *
            </label>
            <input
              v-model="songForm.audioUrl"
              type="url"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="/audio/cancion.mp3"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              URL de la Portada
            </label>
            <input
              v-model="songForm.coverUrl"
              type="url"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="/images/portada.jpg"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              v-model="songForm.description"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Descripción de la canción..."
            ></textarea>
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="songForm.isActive"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Canción activa</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="songForm.isFeatured"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Canción destacada</span>
            </label>
          </div>

          <div v-if="songFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in songFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeSongModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingSong ? 'ACTUALIZAR' : 'CREAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Video Modal -->
    <div 
      v-if="showVideoModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeVideoModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingVideo ? 'EDITAR VIDEO' : 'NUEVO VIDEO' }}
          </h3>
        </div>

        <form @submit.prevent="saveVideo" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Título *
              </label>
              <input
                v-model="videoForm.title"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Nombre del video"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <select
                v-model="videoForm.category"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              >
                <option value="music_video">Video Musical</option>
                <option value="behind_scenes">Detrás de Cámaras</option>
                <option value="live_performance">Presentación en Vivo</option>
                <option value="interview">Entrevista</option>
                <option value="other">Otro</option>
              </select>
            </div>



            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Fecha de lanzamiento *
              </label>
              <input
                v-model="videoForm.releaseDate"
                type="date"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              URL del Video de YouTube *
            </label>
            <input
              v-model="videoForm.videoUrl"
              type="url"
              required
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ o https://youtu.be/dQw4w9WgXcQ"
            />
            <div v-if="videoForm.videoUrl && !isValidYouTubeUrl" class="mt-2 text-red-400 text-sm">
              ⚠️ Por favor ingresa una URL válida de YouTube
            </div>
            <div v-else-if="videoForm.videoUrl && isValidYouTubeUrl" class="mt-2 text-green-400 text-sm">
              ✅ URL de YouTube válida
            </div>
            <p class="mt-1 text-xs text-gray-500">
              Formatos soportados: youtube.com/watch?v=, youtu.be/, m.youtube.com
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              URL de la Miniatura
            </label>
            <input
              v-model="videoForm.thumbnailUrl"
              type="url"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="/images/thumbnail.jpg"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              v-model="videoForm.description"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Descripción del video..."
            ></textarea>
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="videoForm.isActive"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Video activo</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="videoForm.isFeatured"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Video destacado</span>
            </label>
          </div>

          <div v-if="videoFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in videoFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closeVideoModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingVideo ? 'ACTUALIZAR' : 'CREAR' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Playlist Modal -->
    <div 
      v-if="showPlaylistModal" 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closePlaylistModal"
    >
      <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-700">
          <h3 class="text-xl font-capture text-yellow-400">
            {{ isEditingPlaylist ? 'EDITAR PLAYLIST' : 'NUEVA PLAYLIST' }}
          </h3>
        </div>

        <form @submit.prevent="savePlaylist" class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Nombre *
              </label>
              <input
                v-model="playlistForm.name"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="Nombre de la playlist"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                URL de la Portada
              </label>
              <input
                v-model="playlistForm.coverUrl"
                type="url"
                class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                placeholder="/images/playlist-cover.jpg"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Descripción
            </label>
            <textarea
              v-model="playlistForm.description"
              rows="3"
              class="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Descripción de la playlist..."
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-4">
              Canciones ({{ playlistForm.songs.length }} seleccionadas)
            </label>
            <div class="space-y-3 max-h-64 overflow-y-auto bg-gray-700 rounded-lg p-4">
              <div v-if="songs.length === 0" class="text-gray-400 text-center py-4">
                No hay canciones disponibles
              </div>
              <label 
                v-for="song in songs" 
                :key="song.id"
                class="flex items-center space-x-3 p-2 hover:bg-gray-600 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="playlistForm.songs.includes(song.id)"
                  @change="toggleSongInPlaylist(song.id)"
                  class="rounded border-gray-500 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-700"
                />
                <div class="flex-1">
                  <p class="text-white font-medium">{{ song.title }}</p>
                  <p class="text-gray-400 text-sm">{{ song.artist }} • {{ formatDuration(song.duration) }}</p>
                </div>
              </label>
            </div>
          </div>

          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="playlistForm.isActive"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Playlist activa</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="playlistForm.isPublic"
                type="checkbox"
                class="rounded border-gray-600 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              />
              <span class="ml-2 text-gray-300">Playlist pública</span>
            </label>
          </div>

          <div v-if="playlistFormErrors.length > 0" class="bg-red-600/20 border border-red-500 rounded-lg p-4">
            <ul class="text-red-400 text-sm space-y-1">
              <li v-for="error in playlistFormErrors" :key="error">• {{ error }}</li>
            </ul>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="button"
              @click="closePlaylistModal"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-capture transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-capture font-bold transition-colors disabled:opacity-50"
            >
              {{ saving ? 'GUARDANDO...' : isEditingPlaylist ? 'ACTUALIZAR' : 'CREAR' }}
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
             ¿Estás seguro de que deseas eliminar "{{ getItemTitle(itemToDelete) }}"? Esta acción no se puede deshacer.
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
import type { Song, Video, Playlist, PlayerSettings } from '~/types/admin'
import { isYouTubeUrl } from '~/utils/youtube'

// Auth check
definePageMeta({
  layout: false
})

// Composables
const { 
  songs,
  videos,
  playlists,
  playerSettings,
  loading,
  saving,
  error,
  loadMedia,
  createSong,
  updateSong,
  deleteSong,
  createVideo,
  updateVideo,
  deleteVideo,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  updatePlayerSettings,
  formatDuration,
  validateSong,
  validateVideo,
  getMediaStats
} = useAdminMedia()

const { success, error: notifyError } = useNotifications()

// State
const activeTab = ref<'songs' | 'videos' | 'playlists' | 'settings'>('songs')

// Song Modal State
const showSongModal = ref(false)
const isEditingSong = ref(false)
const songForm = ref<{
  id?: string
  title: string
  artist: string
  album: string
  duration: number | null
  audioUrl: string
  coverUrl: string
  genre: string
  releaseDate: string
  description: string
  lyrics: string
  isActive: boolean
  isFeatured: boolean
  order: number | null
}>({
  title: '',
  artist: '',
  album: '',
  duration: null,
  audioUrl: '',
  coverUrl: '',
  genre: '',
  releaseDate: '',
  description: '',
  lyrics: '',
  isActive: true,
  isFeatured: false,
  order: null
})
const songFormErrors = ref<string[]>([])

// Video Modal State
const showVideoModal = ref(false)
const isEditingVideo = ref(false)
const videoForm = ref<{
  id?: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
  duration: number | null
  category: 'music_video' | 'behind_scenes' | 'live_performance' | 'interview' | 'other'
  releaseDate: string
  isActive: boolean
  isFeatured: boolean
  order: number | null
  viewCount: number | null
}>({
  title: '',
  description: '',
  videoUrl: '',
  thumbnailUrl: '',
  duration: null,
  category: 'music_video',
  releaseDate: '',
  isActive: true,
  isFeatured: false,
  order: null,
  viewCount: 0
})
const videoFormErrors = ref<string[]>([])

// Playlist Modal State
const showPlaylistModal = ref(false)
const isEditingPlaylist = ref(false)
const playlistForm = ref<{
  id?: string
  name: string
  description: string
  coverUrl: string
  songs: string[]
  isActive: boolean
  isPublic: boolean
  order: number | null
}>({
  name: '',
  description: '',
  coverUrl: '',
  songs: [],
  isActive: true,
  isPublic: true,
  order: null
})
const playlistFormErrors = ref<string[]>([])

// Delete Modal State
const showDeleteModal = ref(false)
const itemToDelete = ref<Song | Video | Playlist | null>(null)
const deleteType = ref<'song' | 'video' | 'playlist'>('song')

// Player Settings Form
const settingsForm = ref<PlayerSettings>({
  autoplay: false,
  volume: 75,
  showVisualizer: true,
  defaultPlaylist: '',
  shuffleMode: false,
  repeatMode: 'none',
  crossfade: 3
})

// Computed
const mediaStats = computed(() => getMediaStats.value)

// Validación de URL de YouTube
const isValidYouTubeUrl = computed(() => {
  return videoForm.value.videoUrl ? isYouTubeUrl(videoForm.value.videoUrl) : true
})

// Methods
const getCategoryName = (category: string) => {
  const names = {
    'music_video': 'Video Musical',
    'behind_scenes': 'Detrás de Cámaras',
    'live_performance': 'Presentación en Vivo',
    'interview': 'Entrevista',
    'other': 'Otro'
  }
  return names[category as keyof typeof names] || category
}

// Song methods
const openSongModal = (song?: Song) => {
  isEditingSong.value = !!song
  if (song) {
    songForm.value = {
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album || '',
      duration: song.duration,
      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl || '',
      genre: song.genre || '',
      releaseDate: song.releaseDate ? new Date(song.releaseDate).toISOString().split('T')[0] : '',
      description: song.description || '',
      lyrics: song.lyrics || '',
      isActive: song.isActive,
      isFeatured: song.isFeatured,
      order: song.order
    }
  } else {
    resetSongForm()
  }
  showSongModal.value = true
}

const closeSongModal = () => {
  showSongModal.value = false
  resetSongForm()
  songFormErrors.value = []
}

const resetSongForm = () => {
  songForm.value = {
    title: '',
    artist: 'Andy Jaque',
    album: '',
    duration: null,
    audioUrl: '',
    coverUrl: '',
    genre: '',
    releaseDate: '',
    description: '',
    lyrics: '',
    isActive: true,
    isFeatured: false,
    order: null
  }
}

const editSong = (song: Song) => {
  openSongModal(song)
}

const saveSong = async () => {
  songFormErrors.value = []
  
  const songData = {
    title: songForm.value.title,
    artist: songForm.value.artist,
    album: songForm.value.album,
    duration: songForm.value.duration || 0,
    audioUrl: songForm.value.audioUrl,
    coverUrl: songForm.value.coverUrl,
    genre: songForm.value.genre,
    releaseDate: songForm.value.releaseDate ? new Date(songForm.value.releaseDate) : undefined,
    description: songForm.value.description,
    lyrics: songForm.value.lyrics,
    isActive: songForm.value.isActive,
    isFeatured: songForm.value.isFeatured,
    order: songForm.value.order || songs.value.length + 1
  }

  const validation = validateSong(songData)
  if (!validation.isValid) {
    songFormErrors.value = validation.errors
    return
  }

  let result
  if (isEditingSong.value) {
    result = await updateSong(songForm.value.id!, songData)
  } else {
    result = await createSong(songData as Omit<Song, 'id'>)
  }

  if (result.success) {
    closeSongModal()
    if (isEditingSong.value) {
      success('Canción actualizada', 'Los cambios se han guardado correctamente')
    } else {
      success('Canción creada', 'La nueva canción se ha agregado exitosamente')
    }
  } else {
    songFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const deleteSongConfirm = (song: Song) => {
  itemToDelete.value = song
  deleteType.value = 'song'
  showDeleteModal.value = true
}

// Video methods
const openVideoModal = (video?: Video) => {
  isEditingVideo.value = !!video
  if (video) {
    videoForm.value = {
      id: video.id,
      title: video.title,
      description: video.description || '',
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
      duration: null, // No mostramos/editamos la duración
      category: video.category,
      releaseDate: new Date(video.releaseDate).toISOString().split('T')[0],
      isActive: video.isActive,
      isFeatured: video.isFeatured,
      order: video.order,
      viewCount: null // No mostramos/editamos las reproducciones
    }
  } else {
    resetVideoForm()
  }
  showVideoModal.value = true
}

const closeVideoModal = () => {
  showVideoModal.value = false
  resetVideoForm()
  videoFormErrors.value = []
}

const resetVideoForm = () => {
  videoForm.value = {
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: null,
    category: 'music_video',
    releaseDate: '',
    isActive: true,
    isFeatured: false,
    order: null,
    viewCount: null
  }
}

const editVideo = (video: Video) => {
  openVideoModal(video)
}

const saveVideo = async () => {
  videoFormErrors.value = []
  
  const videoData = {
    title: videoForm.value.title,
    description: videoForm.value.description,
    videoUrl: videoForm.value.videoUrl,
    thumbnailUrl: videoForm.value.thumbnailUrl,
    duration: 0, // Valor por defecto, no es importante para YouTube
    category: videoForm.value.category,
    releaseDate: new Date(videoForm.value.releaseDate),
    isActive: videoForm.value.isActive,
    isFeatured: videoForm.value.isFeatured,
    order: videoForm.value.order || videos.value.length + 1,
    viewCount: 0 // Valor por defecto
  }

  const validation = validateVideo(videoData)
  if (!validation.isValid) {
    videoFormErrors.value = validation.errors
    return
  }

  let result
  if (isEditingVideo.value) {
    result = await updateVideo(videoForm.value.id!, videoData)
  } else {
    result = await createVideo(videoData as Omit<Video, 'id'>)
  }

  if (result.success) {
    closeVideoModal()
    if (isEditingVideo.value) {
      success('Video actualizado', 'Los cambios se han guardado correctamente')
    } else {
      success('Video creado', 'El nuevo video se ha agregado exitosamente')
    }
  } else {
    videoFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const deleteVideoConfirm = (video: Video) => {
  itemToDelete.value = video
  deleteType.value = 'video'
  showDeleteModal.value = true
}

// Playlist methods
const openPlaylistModal = (playlist?: Playlist) => {
  isEditingPlaylist.value = !!playlist
  if (playlist) {
    playlistForm.value = {
      id: playlist.id,
      name: playlist.name,
      description: playlist.description || '',
      coverUrl: playlist.coverUrl || '',
      songs: [...playlist.songs],
      isActive: playlist.isActive,
      isPublic: playlist.isPublic,
      order: playlist.order
    }
  } else {
    resetPlaylistForm()
  }
  showPlaylistModal.value = true
}

const closePlaylistModal = () => {
  showPlaylistModal.value = false
  resetPlaylistForm()
  playlistFormErrors.value = []
}

const resetPlaylistForm = () => {
  playlistForm.value = {
    name: '',
    description: '',
    coverUrl: '',
    songs: [],
    isActive: true,
    isPublic: true,
    order: null
  }
}

const editPlaylist = (playlist: Playlist) => {
  const playlistToEdit = {
    ...playlist,
    songs: [...playlist.songs]
  }
  openPlaylistModal(playlistToEdit)
}

const savePlaylist = async () => {
  playlistFormErrors.value = []
  
  const playlistData = {
    name: playlistForm.value.name,
    description: playlistForm.value.description,
    coverUrl: playlistForm.value.coverUrl,
    songs: playlistForm.value.songs,
    isActive: playlistForm.value.isActive,
    isPublic: playlistForm.value.isPublic,
    order: playlistForm.value.order || playlists.value.length + 1
  }

  if (!playlistData.name.trim()) {
    playlistFormErrors.value = ['El nombre es requerido']
    return
  }

  let result
  if (isEditingPlaylist.value) {
    result = await updatePlaylist(playlistForm.value.id!, playlistData)
  } else {
    result = await createPlaylist(playlistData as Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>)
  }

  if (result.success) {
    closePlaylistModal()
    if (isEditingPlaylist.value) {
      success('Playlist actualizada', 'Los cambios se han guardado correctamente')
    } else {
      success('Playlist creada', 'La nueva playlist se ha agregado exitosamente')
    }
  } else {
    playlistFormErrors.value = [result.error || 'Error desconocido']
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

const deletePlaylistConfirm = (playlist: Playlist) => {
  itemToDelete.value = {
    ...playlist,
    songs: [...playlist.songs]
  }
  deleteType.value = 'playlist'
  showDeleteModal.value = true
}

const getItemTitle = (item: Song | Video | Playlist | null) => {
  if (!item) return ''
  return 'title' in item ? item.title : item.name
}

const toggleSongInPlaylist = (songId: string) => {
  const index = playlistForm.value.songs.indexOf(songId)
  if (index > -1) {
    playlistForm.value.songs.splice(index, 1)
  } else {
    playlistForm.value.songs.push(songId)
  }
}

// Delete methods
const closeDeleteModal = () => {
  showDeleteModal.value = false
  itemToDelete.value = null
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  let result
  if (deleteType.value === 'song') {
    result = await deleteSong(itemToDelete.value.id)
  } else if (deleteType.value === 'video') {
    result = await deleteVideo(itemToDelete.value.id)
  } else {
    result = await deletePlaylist(itemToDelete.value.id)
  }

  if (result.success) {
    closeDeleteModal()
    success(
      deleteType.value === 'song' ? 'Canción eliminada' : 
      deleteType.value === 'video' ? 'Video eliminado' : 'Playlist eliminada',
      'El elemento se ha eliminado correctamente'
    )
  } else {
    notifyError('Error al eliminar', result.error || 'Error desconocido')
  }
}

// Player settings
const savePlayerSettings = async () => {
  const result = await updatePlayerSettings(settingsForm.value)
  if (result.success) {
    success('Configuración guardada', 'Los ajustes del reproductor se han actualizado')
  } else {
    notifyError('Error al guardar', result.error || 'Error desconocido')
  }
}

// Initialize settings form when playerSettings loads
watch(playerSettings, (newSettings) => {
  if (newSettings) {
    settingsForm.value = { ...newSettings }
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  loadMedia()
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