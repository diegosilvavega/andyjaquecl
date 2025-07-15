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

  // Datos por defecto para canciones
  const defaultSongs: Song[] = [
    {
      id: 'song-1',
      title: 'Cumbia del Corazón',
      artist: 'Andy Jaque',
      album: 'Melodías del Alma',
      duration: 245, // 4:05
      audioUrl: '/audio/background-music.mp3',
      genre: 'Cumbia',
      releaseDate: new Date('2023-06-15'),
      isActive: true,
      isFeatured: true,
      order: 1,
      description: 'Una cumbia romántica que llega directo al corazón'
    },
    {
      id: 'song-2', 
      title: 'Noches de Fiesta',
      artist: 'Andy Jaque',
      album: 'Melodías del Alma',
      duration: 198, // 3:18
      audioUrl: '/audio/background-music.mp3',
      genre: 'Cumbia',
      releaseDate: new Date('2023-08-20'),
      isActive: true,
      isFeatured: false,
      order: 2,
      description: 'Perfecta para bailar toda la noche'
    },
    {
      id: 'song-3',
      title: 'Recuerdos de Mi Tierra',
      artist: 'Andy Jaque',
      duration: 267, // 4:27
      audioUrl: '/audio/background-music.mp3',
      genre: 'Cumbia Sureña',
      releaseDate: new Date('2023-10-10'),
      isActive: true,
      isFeatured: true,
      order: 3,
      description: 'Un homenaje a las raíces musicales del sur de Chile'
    }
  ]

  // Datos por defecto para videos
  const defaultVideos: Video[] = [
    {
      id: 'video-1',
      title: 'Cumbia del Corazón - Video Oficial',
      description: 'Video musical oficial de nuestro hit más popular',
      videoUrl: 'https://youtube.com/watch?v=example1',
      duration: 245,
      category: 'music_video',
      releaseDate: new Date('2023-06-20'),
      isActive: true,
      isFeatured: true,
      order: 1,
      viewCount: 15420
    },
    {
      id: 'video-2',
      title: 'En Vivo desde Puerto Montt',
      description: 'Presentación completa en el Festival de Verano 2023',
      videoUrl: 'https://youtube.com/watch?v=example2',
      duration: 3600, // 1 hora
      category: 'live_performance',
      releaseDate: new Date('2023-07-15'),
      isActive: true,
      isFeatured: false,
      order: 2,
      viewCount: 8750
    },
    {
      id: 'video-3',
      title: 'Detrás de Cámaras - Grabación del Álbum',
      description: 'Un vistazo al proceso creativo de "Melodías del Alma"',
      videoUrl: 'https://youtube.com/watch?v=example3',
      duration: 892, // 14:52
      category: 'behind_scenes',
      releaseDate: new Date('2023-09-05'),
      isActive: true,
      isFeatured: true,
      order: 3,
      viewCount: 3210
    }
  ]

  // Datos por defecto para playlists
  const defaultPlaylists: Playlist[] = [
    {
      id: 'playlist-1',
      name: 'Grandes Éxitos',
      description: 'Las canciones más populares de Andy Jaque',
      songs: ['song-1', 'song-3'],
      isActive: true,
      isPublic: true,
      order: 1,
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2023-10-15')
    },
    {
      id: 'playlist-2',
      name: 'Para Bailar',
      description: 'Las mejores cumbias para la pista de baile',
      songs: ['song-2', 'song-1'],
      isActive: true,
      isPublic: true,
      order: 2,
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-08-25')
    }
  ]

  // Configuración por defecto del reproductor
  const defaultPlayerSettings: PlayerSettings = {
    autoplay: false,
    volume: 75,
    showVisualizer: true,
    defaultPlaylist: 'playlist-1',
    shuffleMode: false,
    repeatMode: 'none',
    crossfade: 3
  }

  // Cargar multimedia desde localStorage
  const loadMedia = async () => {
    loading.value = true
    error.value = ''
    
    try {
      // Cargar canciones
      const savedSongs = localStorage.getItem('admin_songs')
      if (savedSongs) {
        songs.value = JSON.parse(savedSongs)
      } else {
        songs.value = [...defaultSongs]
      }

      // Cargar videos
      const savedVideos = localStorage.getItem('admin_videos')
      if (savedVideos) {
        videos.value = JSON.parse(savedVideos)
      } else {
        videos.value = [...defaultVideos]
      }

      // Cargar playlists
      const savedPlaylists = localStorage.getItem('admin_playlists')
      if (savedPlaylists) {
        playlists.value = JSON.parse(savedPlaylists)
      } else {
        playlists.value = [...defaultPlaylists]
      }

      // Cargar configuración del reproductor
      const savedPlayerSettings = localStorage.getItem('admin_player_settings')
      if (savedPlayerSettings) {
        playerSettings.value = JSON.parse(savedPlayerSettings)
      } else {
        playerSettings.value = { ...defaultPlayerSettings }
      }

      await saveMediaToStorage()
    } catch (err) {
      error.value = 'Error al cargar multimedia'
      console.error('Error loading media:', err)
      // En caso de error, cargar datos por defecto
      songs.value = [...defaultSongs]
      videos.value = [...defaultVideos]
      playlists.value = [...defaultPlaylists]
      playerSettings.value = { ...defaultPlayerSettings }
      await saveMediaToStorage()
    } finally {
      loading.value = false
    }
  }

  // Guardar multimedia en localStorage
  const saveMediaToStorage = async () => {
    try {
      localStorage.setItem('admin_songs', JSON.stringify(songs.value))
      localStorage.setItem('admin_videos', JSON.stringify(videos.value))
      localStorage.setItem('admin_playlists', JSON.stringify(playlists.value))
      localStorage.setItem('admin_player_settings', JSON.stringify(playerSettings.value))
    } catch (err) {
      console.error('Error saving media:', err)
    }
  }

  // ========== GESTIÓN DE CANCIONES ==========
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

      // Remover de playlists
      playlists.value.forEach(playlist => {
        playlist.songs = playlist.songs.filter(id => id !== songId)
      })

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

  // ========== GESTIÓN DE VIDEOS ==========
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

  // ========== GESTIÓN DE PLAYLISTS ==========
  const createPlaylist = async (playlistData: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>) => {
    saving.value = true
    error.value = ''

    try {
      const now = new Date()
      const newPlaylist: Playlist = {
        ...playlistData,
        id: Date.now().toString(),
        createdAt: now,
        updatedAt: now
      }

      playlists.value.push(newPlaylist)
      await saveMediaToStorage()
      return { success: true, data: newPlaylist }
    } catch (err) {
      error.value = 'Error al crear la playlist'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const updatePlaylist = async (playlistId: string, playlistData: Partial<Omit<Playlist, 'id' | 'createdAt'>>) => {
    saving.value = true
    error.value = ''

    try {
      const index = playlists.value.findIndex(p => p.id === playlistId)
      if (index === -1) {
        throw new Error('Playlist no encontrada')
      }

      playlists.value[index] = { 
        ...playlists.value[index], 
        ...playlistData,
        updatedAt: new Date()
      }
      await saveMediaToStorage()
      return { success: true, data: playlists.value[index] }
    } catch (err) {
      error.value = 'Error al actualizar la playlist'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  const deletePlaylist = async (playlistId: string) => {
    saving.value = true
    error.value = ''

    try {
      const index = playlists.value.findIndex(p => p.id === playlistId)
      if (index === -1) {
        throw new Error('Playlist no encontrada')
      }

      playlists.value.splice(index, 1)
      await saveMediaToStorage()
      return { success: true }
    } catch (err) {
      error.value = 'Error al eliminar la playlist'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // ========== CONFIGURACIÓN DEL REPRODUCTOR ==========
  const updatePlayerSettings = async (settings: Partial<PlayerSettings>) => {
    saving.value = true
    error.value = ''

    try {
      playerSettings.value = { 
        ...playerSettings.value!, 
        ...settings 
      }
      await saveMediaToStorage()
      return { success: true, data: playerSettings.value }
    } catch (err) {
      error.value = 'Error al actualizar configuración'
      return { success: false, error: error.value }
    } finally {
      saving.value = false
    }
  }

  // ========== UTILIDADES ==========
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const validateSong = (songData: Partial<Song>) => {
    const errors: string[] = []

    if (!songData.title?.trim()) {
      errors.push('El título es requerido')
    }

    if (!songData.artist?.trim()) {
      errors.push('El artista es requerido')
    }

    if (!songData.duration || songData.duration <= 0) {
      errors.push('La duración debe ser mayor a 0')
    }

    if (!songData.audioUrl?.trim()) {
      errors.push('La URL del audio es requerida')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  const validateVideo = (videoData: Partial<Video>) => {
    const errors: string[] = []

    if (!videoData.title?.trim()) {
      errors.push('El título es requerido')
    }

    if (!videoData.videoUrl?.trim()) {
      errors.push('La URL del video es requerida')
    }

    if (!videoData.duration || videoData.duration <= 0) {
      errors.push('La duración debe ser mayor a 0')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Obtener estadísticas
  const getMediaStats = computed(() => {
    const activeSongs = songs.value.filter(s => s.isActive).length
    const activeVideos = videos.value.filter(v => v.isActive).length
    const activePlaylists = playlists.value.filter(p => p.isActive).length
    const totalDuration = songs.value.reduce((sum, song) => sum + song.duration, 0)

    return {
      activeSongs,
      activeVideos,
      activePlaylists,
      totalSongs: songs.value.length,
      totalVideos: videos.value.length,
      totalPlaylists: playlists.value.length,
      totalDuration,
      formattedTotalDuration: formatDuration(totalDuration)
    }
  })

  return {
    // Estado
    songs: readonly(songs),
    videos: readonly(videos),
    playlists: readonly(playlists),
    playerSettings: readonly(playerSettings),
    loading: readonly(loading),
    saving: readonly(saving),
    error: readonly(error),

    // Acciones
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

    // Utilidades
    formatDuration,
    validateSong,
    validateVideo,
    getMediaStats
  }
} 