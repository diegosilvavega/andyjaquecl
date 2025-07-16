import { collection, getDocs, query, orderBy, Timestamp, type Firestore } from 'firebase/firestore'

// Composable para usar Firebase globalmente inicializado
export const useFirebaseGlobal = () => {
  const { $firestore } = useNuxtApp()
  const db = $firestore as Firestore

  // Verificar si Firebase está disponible
  const isAvailable = computed(() => !!db)

  // ===== EVENTOS =====
  const loadEvents = async () => {
    if (!isAvailable.value) {
      console.log('🔄 Firebase no disponible, usando fallback')
      return []
    }

    try {
      const eventsRef = collection(db, 'events')
      const q = query(eventsRef, orderBy('date', 'asc'))
      const querySnapshot = await getDocs(q)
      
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate ? doc.data().date.toDate() : new Date(doc.data().date)
      }))
      
      console.log('✅ Eventos cargados desde Firebase (público):', events.length)
      return events
    } catch (error) {
      console.error('❌ Error cargando eventos desde Firebase:', error)
      return []
    }
  }

  // ===== MEDIA =====
  const loadMedia = async () => {
    if (!isAvailable.value) {
      console.log('🔄 Firebase no disponible, usando fallback')
      return { songs: [], videos: [], playlists: [] }
    }

    try {
      // Cargar canciones
      const songsRef = collection(db, 'songs')
      const songsQuery = query(songsRef, orderBy('order', 'asc'))
      const songsSnapshot = await getDocs(songsQuery)
      
      const songs = songsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        releaseDate: doc.data().releaseDate?.toDate ? doc.data().releaseDate.toDate() : new Date(doc.data().releaseDate || Date.now())
      }))

      // Cargar videos
      const videosRef = collection(db, 'videos')
      const videosQuery = query(videosRef, orderBy('order', 'asc'))
      const videosSnapshot = await getDocs(videosQuery)
      
      const videos = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadDate: doc.data().uploadDate?.toDate ? doc.data().uploadDate.toDate() : new Date(doc.data().uploadDate || Date.now())
      }))

      // Cargar playlists
      const playlistsRef = collection(db, 'playlists')
      const playlistsSnapshot = await getDocs(playlistsRef)
      
      const playlists = playlistsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('✅ Media cargada desde Firebase (público):', { songs: songs.length, videos: videos.length, playlists: playlists.length })
      return { songs, videos, playlists }
    } catch (error) {
      console.error('❌ Error cargando media desde Firebase:', error)
      return { songs: [], videos: [], playlists: [] }
    }
  }

  // ===== CONTENIDO =====
  const loadContent = async () => {
    if (!isAvailable.value) {
      console.log('🔄 Firebase no disponible, usando fallback')
      return { news: [], biography: null, statistics: [] }
    }

    try {
      // Cargar noticias
      const newsRef = collection(db, 'news')
      const newsQuery = query(newsRef, orderBy('publishDate', 'desc'))
      const newsSnapshot = await getDocs(newsQuery)
      
      const news = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishDate: doc.data().publishDate?.toDate ? doc.data().publishDate.toDate() : new Date(doc.data().publishDate || Date.now())
      }))

      // Cargar biografía
      const bioRef = collection(db, 'biography')
      const bioSnapshot = await getDocs(bioRef)
      const biography = bioSnapshot.docs.length > 0 ? {
        id: bioSnapshot.docs[0].id,
        ...bioSnapshot.docs[0].data()
      } : null

      // Nota: Estadísticas eliminadas de la funcionalidad
      
      console.log('✅ Contenido cargado desde Firebase (público):', { news: news.length, biography: !!biography })
      return { news, biography, statistics: [] }
    } catch (error) {
      console.error('❌ Error cargando contenido desde Firebase:', error)
      return { news: [], biography: null, statistics: [] }
    }
  }

  // ===== PRECIOS =====
  const loadPrices = async () => {
    if (!isAvailable.value) {
      console.log('🔄 Firebase no disponible, usando fallback')
      return { courses: [], services: [] }
    }

    try {
      // Cargar cursos
      const coursesRef = collection(db, 'courses')
      const coursesSnapshot = await getDocs(coursesRef)
      
      const courses = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Cargar servicios
      const servicesRef = collection(db, 'services')
      const servicesSnapshot = await getDocs(servicesRef)
      
      const services = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('✅ Precios cargados desde Firebase (público):', { courses: courses.length, services: services.length })
      return { courses, services }
    } catch (error) {
      console.error('❌ Error cargando precios desde Firebase:', error)
      return { courses: [], services: [] }
    }
  }

  // ===== CONTACTO =====
  const loadContact = async () => {
    if (!isAvailable.value) {
      console.log('🔄 Firebase no disponible, usando fallback')
      return { socialMedia: [], contactInfo: null }
    }

    try {
      // Cargar redes sociales
      const socialMediaRef = collection(db, 'socialMedia')
      const socialMediaSnapshot = await getDocs(socialMediaRef)
      
      const socialMedia = socialMediaSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Cargar información de contacto
      const contactInfoRef = collection(db, 'contactInfo')
      const contactInfoSnapshot = await getDocs(contactInfoRef)
      const contactInfo = contactInfoSnapshot.docs.length > 0 ? {
        id: contactInfoSnapshot.docs[0].id,
        ...contactInfoSnapshot.docs[0].data()
      } : null
      
      console.log('✅ Contacto cargado desde Firebase (público):', { socialMedia: socialMedia.length, contactInfo: !!contactInfo })
      return { socialMedia, contactInfo }
    } catch (error) {
      console.error('❌ Error cargando contacto desde Firebase:', error)
      return { socialMedia: [], contactInfo: null }
    }
  }

  return {
    isAvailable,
    loadEvents,
    loadMedia,
    loadContent,
    loadPrices,
    loadContact
  }
} 