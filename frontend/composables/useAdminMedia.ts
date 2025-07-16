import type { Song, Video, Playlist, PlayerSettings } from '~/types/admin'

// Estado global para multimedia
const globalSongs = ref<Song[]>([])
const globalVideos = ref<Video[]>([])
const globalPlaylists = ref<Playlist[]>([])
const globalPlayerSettings = ref<PlayerSettings | null>(null)

export const useAdminMedia = () => {
  const songs = globalSongs
  const videos = globalVideos
  const playlists = globalPlaylists
  const playerSettings = globalPlayerSettings
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')

  // Función para usar Firebase
  const useFirebaseIfAvailable = () => {
    try {
      // Intentar usar Firebase global primero (para páginas públicas)
      const globalFirebase = useFirebaseGlobal()
      if (globalFirebase.isAvailable.value) {
        return { 
          loadMedia: globalFirebase.loadMedia,
          available: true,
          isGlobal: true
        }
      }
      
      // Fallback: usar admin Firebase (para páginas admin)
      const { loadMedia: loadFirebaseMedia, saveMedia: saveFirebaseMedia, isConnected } = useFirestoreAdmin()
      if (isConnected.value) {
        return { 
          loadMedia: loadFirebaseMedia,
          saveMedia: saveFirebaseMedia,
          available: true,
          isGlobal: false
        }
      }
      
      return { available: false }
    } catch (error) {
      console.error('❌ Firebase no disponible para media')
      return { available: false }
    }
  }

  // Cargar multimedia desde Firebase
  const loadMedia = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const firebase = useFirebaseIfAvailable()
      if (!firebase.available || !firebase.loadMedia) {
        throw new Error('Firebase no disponible')
      }

      const firebaseMedia = await firebase.loadMedia()
      if (firebaseMedia && (firebaseMedia.songs.length > 0 || firebaseMedia.videos.length > 0)) {
        // Mapear y validar datos de Firebase a tipos correctos
        songs.value = firebaseMedia.songs.map((song: any) => ({
          id: song.id,
          title: song.title || 'Sin título',
          artist: song.artist || 'Andy Jaque',
          album: song.album || 'Melodías del Alma',
          duration: song.duration || 240,
          audioUrl: song.audioUrl || '/audio/background-music.mp3',
          genre: song.genre || 'Cumbia',
          releaseDate: song.releaseDate || new Date(),
          isActive: song.isActive ?? true,
          isFeatured: song.isFeatured ?? false,
          order: song.order || 1,
          description: song.description || ''
        }))

        videos.value = firebaseMedia.videos.map((video: any) => ({
          id: video.id,
          title: video.title || 'Sin título',
          description: video.description || '',
          videoUrl: video.videoUrl || '',
          thumbnailUrl: video.thumbnailUrl || '',
          duration: video.duration || 240,
          category: video.category || 'music_video',
          releaseDate: video.releaseDate || new Date(),
          isActive: video.isActive ?? true,
          isFeatured: video.isFeatured ?? false,
          order: video.order || 1,
          viewCount: video.viewCount || 0
        }))

        playlists.value = firebaseMedia.playlists.map((playlist: any) => ({
          id: playlist.id,
          name: playlist.name || 'Sin nombre',
          description: playlist.description || '',
          coverUrl: playlist.coverUrl || '',
          songs: playlist.songs || [],
          isActive: playlist.isActive ?? true,
          isPublic: playlist.isPublic ?? true,
          order: playlist.order || 1,
          createdAt: playlist.createdAt || new Date(),
          updatedAt: playlist.updatedAt || new Date()
        })) || []
      }
    } catch (err) {
      error.value = 'Error al cargar multimedia desde Firebase'
      console.error('Error loading media:', err)
      songs.value = []
      videos.value = []
      playlists.value = []
    } finally {
      loading.value = false
    }
  }

  // Guardar multimedia en Firebase
  const saveMediaToStorage = async () => {
    try {
      const firebase = useFirebaseIfAvailable()
      if (firebase.available && firebase.saveMedia) {
        await firebase.saveMedia(songs.value, videos.value, playlists.value)
      } else {
        throw new Error('Firebase no disponible para guardar')
      }
    } catch (err) {
      console.error('Error saving media:', err)
      throw err
    }
  }

  // === FUNCIONES PARA CANCIONES ===
  const createSong = async (songData: Omit<Song, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newSong: Song = {
        ...songData,
        id: Date.now().toString()
      }

      songs.value.push(newSong)
      await saveMediaToStorage()
      await reorderSongs()
      return { success: true, data: newSong }
    } catch (err) {
      error.value = 'Error al crear la canción'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const updateSong = async (songId: string, songData: Partial<Song>) => {
    saving.value = true
    error.value = ''

    try {
      const index = songs.value.findIndex(s => s.id === songId)
      if (index === -1) {
        throw new Error('Canción no encontrada')
      }

      songs.value[index] = { ...songs.value[index], ...songData }
      await saveMediaToStorage()
      await reorderSongs()
      return { success: true, data: songs.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar la canción'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const deleteSong = async (songId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = songs.value.findIndex(s => s.id === songId)
      if (index === -1) {
        throw new Error('Canción no encontrada')
      }

      songs.value.splice(index, 1)
      await saveMediaToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar la canción'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // === FUNCIONES PARA VIDEOS ===
  const createVideo = async (videoData: Omit<Video, 'id'>) => {
    saving.value = true
    error.value = ''

    try {
      const newVideo: Video = {
        ...videoData,
        id: Date.now().toString()
      }

      videos.value.push(newVideo)
      await saveMediaToStorage()
      await reorderVideos()
      return { success: true, data: newVideo }
    } catch (err) {
      error.value = 'Error al crear el video'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const updateVideo = async (videoId: string, videoData: Partial<Video>) => {
    saving.value = true
    error.value = ''

    try {
      const index = videos.value.findIndex(v => v.id === videoId)
      if (index === -1) {
        throw new Error('Video no encontrado')
      }

      videos.value[index] = { ...videos.value[index], ...videoData }
      await saveMediaToStorage()
      await reorderVideos()
      return { success: true, data: videos.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar el video'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const deleteVideo = async (videoId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = videos.value.findIndex(v => v.id === videoId)
      if (index === -1) {
        throw new Error('Video no encontrado')
      }

      videos.value.splice(index, 1)
      await saveMediaToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar el video'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // === FUNCIONES DE UTILIDAD ===
  const reorderSongs = async () => {
    songs.value.sort((a, b) => a.order - b.order)
      }

  const reorderVideos = async () => {
    videos.value.sort((a, b) => a.order - b.order)
  }

  // === DATOS COMPUTADOS ===
  const activeSongs = computed(() => 
    songs.value.filter(song => song.isActive)
  )

  const activeVideos = computed(() => 
    videos.value.filter(video => video.isActive)
  )

  const featuredSongs = computed(() => 
    songs.value.filter(song => song.isFeatured && song.isActive)
  )

  const featuredVideos = computed(() => 
    videos.value.filter(video => video.isFeatured && video.isActive)
  )

  // === ESTADÍSTICAS ===
  const mediaStats = computed(() => ({
      totalSongs: songs.value.length,
    activeSongs: activeSongs.value.length,
    featuredSongs: featuredSongs.value.length,
      totalVideos: videos.value.length,
    activeVideos: activeVideos.value.length,
    featuredVideos: featuredVideos.value.length,
    totalPlaylists: playlists.value.length
  }))

  return {
    // Estado
    songs: readonly(songs),
    videos: readonly(videos),
    playlists: readonly(playlists),
    playerSettings: readonly(playerSettings),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Datos computados
    activeSongs,
    activeVideos,
    featuredSongs,
    featuredVideos,
    mediaStats,

    // Acciones
    loadMedia,
    
    // Canciones
    createSong,
    updateSong,
    deleteSong,
    
    // Videos
    createVideo,
    updateVideo,
    deleteVideo,

    // Utilidades
    reorderSongs,
    reorderVideos
  }
} 