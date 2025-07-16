import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator, collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, Timestamp, type Firestore } from 'firebase/firestore'

// Composable para operaciones Firebase del panel admin
export const useFirestoreAdmin = () => {
  const db = ref<Firestore | null>(null)
  const isConnected = ref(false)

  // Inicializar Firebase
  const initFirebase = async () => {
    try {
      // Obtener configuración de Firebase desde variables de entorno
      const config = useRuntimeConfig()
      const firebaseConfig = config.public.firebase

      const app = initializeApp(firebaseConfig, 'admin-app')
      db.value = getFirestore(app)
      isConnected.value = true
      
      console.log('✅ Firebase conectado correctamente')
      return true
    } catch (error) {
      console.log('🔄 Error conectando Firebase:', error)
      isConnected.value = false
      return false
    }
  }

  // ===== EVENTOS =====
  const saveEvents = async (events: any[]) => {
    if (!isConnected.value || !db.value) return false
    
    try {
      const eventsRef = collection(db.value, 'events')
      
      // Limpiar eventos existentes y agregar nuevos
      for (const event of events) {
        // Convertir fecha de manera segura
        let eventDate = Timestamp.now()
        if (event.date) {
          try {
            const dateValue = event.date instanceof Date 
              ? event.date 
              : new Date(event.date)
            if (!isNaN(dateValue.getTime())) {
              eventDate = Timestamp.fromDate(dateValue)
            }
          } catch (e) {
            console.warn('⚠️ Error convirtiendo fecha de evento, usando fecha actual')
          }
        }

        const eventData = {
          ...event,
          date: eventDate,
          updatedAt: Timestamp.now()
        }
        
        await addDoc(eventsRef, eventData)
      }
      
      console.log('✅ Eventos guardados en Firebase')
      return true
    } catch (error) {
      console.error('❌ Error guardando eventos:', error)
      return false
    }
  }

  const loadEvents = async () => {
    if (!isConnected.value || !db.value) return []
    
    try {
      const eventsRef = collection(db.value, 'events')
      const q = query(eventsRef, orderBy('date', 'asc'))
      const querySnapshot = await getDocs(q)
      
      const events = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }))
      
      console.log('✅ Eventos cargados desde Firebase:', events.length)
      return events
    } catch (error) {
      console.error('❌ Error cargando eventos:', error)
      return []
    }
  }

  // ===== MULTIMEDIA =====
  const saveMedia = async (songs: any[], videos: any[], playlists: any[]) => {
    if (!isConnected.value || !db.value) return false
    
    try {
      // Guardar canciones
      const songsRef = collection(db.value, 'songs')
      for (const song of songs) {
        // Convertir fecha de manera segura
        let releaseDate = Timestamp.now()
        if (song.releaseDate) {
          try {
            const dateValue = song.releaseDate instanceof Date 
              ? song.releaseDate 
              : new Date(song.releaseDate)
            if (!isNaN(dateValue.getTime())) {
              releaseDate = Timestamp.fromDate(dateValue)
            }
          } catch (e) {
            console.warn('⚠️ Error convirtiendo fecha de canción, usando fecha actual')
          }
        }

        const songData = {
          ...song,
          releaseDate,
          updatedAt: Timestamp.now()
        }
        await addDoc(songsRef, songData)
      }

      // Guardar videos
      const videosRef = collection(db.value, 'videos')
      for (const video of videos) {
        // Convertir fecha de manera segura
        let uploadDate = Timestamp.now()
        if (video.uploadDate) {
          try {
            const dateValue = video.uploadDate instanceof Date 
              ? video.uploadDate 
              : new Date(video.uploadDate)
            if (!isNaN(dateValue.getTime())) {
              uploadDate = Timestamp.fromDate(dateValue)
            }
          } catch (e) {
            console.warn('⚠️ Error convirtiendo fecha de video, usando fecha actual')
          }
        }

        const videoData = {
          ...video,
          uploadDate,
          updatedAt: Timestamp.now()
        }
        await addDoc(videosRef, videoData)
      }
      
      console.log('✅ Media guardada en Firebase')
      return true
    } catch (error) {
      console.error('❌ Error guardando media:', error)
      return false
    }
  }

  const loadMedia = async () => {
    if (!isConnected.value || !db.value) return { songs: [], videos: [], playlists: [] }
    
    try {
      // Cargar canciones
      const songsRef = collection(db.value, 'songs')
      const songsQuery = query(songsRef, orderBy('order', 'asc'))
      const songsSnapshot = await getDocs(songsQuery)
      
      const songs = songsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        releaseDate: doc.data().releaseDate?.toDate() || new Date()
      }))

      // Cargar videos
      const videosRef = collection(db.value, 'videos')
      const videosQuery = query(videosRef, orderBy('order', 'asc'))
      const videosSnapshot = await getDocs(videosQuery)
      
      const videos = videosSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        uploadDate: doc.data().uploadDate?.toDate() || new Date()
      }))
      
      console.log('✅ Media cargada desde Firebase')
      return { songs, videos, playlists: [] }
    } catch (error) {
      console.error('❌ Error cargando media:', error)
      return { songs: [], videos: [], playlists: [] }
    }
  }

  // ===== PRECIOS =====
  const savePrices = async (courses: any[], services: any[]) => {
    if (!isConnected.value || !db.value) return false
    
    try {
      // Guardar cursos
      const coursesRef = collection(db.value, 'courses')
      for (const course of courses) {
        const courseData = {
          ...course,
          updatedAt: Timestamp.now()
        }
        await addDoc(coursesRef, courseData)
      }

      // Guardar servicios
      const servicesRef = collection(db.value, 'services')
      for (const service of services) {
        const serviceData = {
          ...service,
          updatedAt: Timestamp.now()
        }
        await addDoc(servicesRef, serviceData)
      }
      
      console.log('✅ Precios guardados en Firebase')
      return true
    } catch (error) {
      console.error('❌ Error guardando precios:', error)
      return false
    }
  }

  const loadPrices = async () => {
    if (!isConnected.value || !db.value) return { courses: [], services: [] }
    
    try {
      // Cargar cursos
      const coursesRef = collection(db.value, 'courses')
      const coursesSnapshot = await getDocs(coursesRef)
      
      const courses = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Cargar servicios
      const servicesRef = collection(db.value, 'services')
      const servicesSnapshot = await getDocs(servicesRef)
      
      const services = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      console.log('✅ Precios cargados desde Firebase')
      return { courses, services }
    } catch (error) {
      console.error('❌ Error cargando precios:', error)
      return { courses: [], services: [] }
    }
  }

  // ===== CONTACTO =====
  const saveContact = async (socialMedia: any[], professionalContacts: any[], contactInfo: any) => {
    if (!isConnected.value || !db.value) return false
    
    try {
      // Guardar redes sociales
      const socialRef = collection(db.value, 'socialMedia')
      for (const social of socialMedia) {
        const socialData = {
          ...social,
          updatedAt: Timestamp.now()
        }
        await addDoc(socialRef, socialData)
      }

      // Nota: Contactos profesionales eliminados de la funcionalidad

      // Guardar información de contacto general
      if (contactInfo) {
        const infoRef = collection(db.value, 'contactInfo')
        const infoData = {
          ...contactInfo,
          updatedAt: Timestamp.now()
        }
        await addDoc(infoRef, infoData)
      }
      
      console.log('✅ Contacto guardado en Firebase')
      return true
    } catch (error) {
      console.error('❌ Error guardando contacto:', error)
      return false
    }
  }

  const loadContact = async () => {
    if (!isConnected.value || !db.value) return { socialMedia: [], professionalContacts: [], contactInfo: null }
    
    try {
      // Cargar redes sociales
      const socialRef = collection(db.value, 'socialMedia')
      const socialSnapshot = await getDocs(socialRef)
      
      const socialMedia = socialSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      // Nota: Contactos profesionales eliminados de la funcionalidad

      // Cargar información de contacto
      const infoRef = collection(db.value, 'contactInfo')
      const infoSnapshot = await getDocs(infoRef)
      const contactInfo = infoSnapshot.docs.length > 0 ? {
        id: infoSnapshot.docs[0].id,
        ...infoSnapshot.docs[0].data()
      } : null
      
      console.log('✅ Contacto cargado desde Firebase')
      return { socialMedia, professionalContacts: [], contactInfo }
    } catch (error) {
      console.error('❌ Error cargando contacto:', error)
      return { socialMedia: [], professionalContacts: [], contactInfo: null }
    }
  }

  // ===== CONTENIDO =====
  const saveContent = async (news: any[], biography: any, statistics: any[] = []) => {
    if (!isConnected.value || !db.value) return false
    
    try {
      // Guardar noticias
      const newsRef = collection(db.value, 'news')
      for (const newsItem of news) {
        // Convertir fecha de manera segura
        let publishDate = Timestamp.now()
        if (newsItem.publishDate) {
          try {
            const dateValue = newsItem.publishDate instanceof Date 
              ? newsItem.publishDate 
              : new Date(newsItem.publishDate)
            if (!isNaN(dateValue.getTime())) {
              publishDate = Timestamp.fromDate(dateValue)
            }
          } catch (e) {
            console.warn('⚠️ Error convirtiendo fecha de noticia, usando fecha actual')
          }
        }

        const newsData = {
          ...newsItem,
          publishDate,
          updatedAt: Timestamp.now()
        }
        await addDoc(newsRef, newsData)
      }

      // Guardar biografía
      if (biography) {
        const bioRef = collection(db.value, 'biography')
        const bioData = {
          ...biography,
          updatedAt: Timestamp.now()
        }
        await addDoc(bioRef, bioData)
      }

      // Nota: Estadísticas eliminadas de la funcionalidad
      
      console.log('✅ Contenido guardado en Firebase')
      return true
    } catch (error) {
      console.error('❌ Error guardando contenido:', error)
      return false
    }
  }

  const loadContent = async () => {
    if (!isConnected.value || !db.value) return { news: [], biography: null, statistics: [] }
    
    try {
      // Cargar noticias
      const newsRef = collection(db.value, 'news')
      const newsQuery = query(newsRef, orderBy('publishDate', 'desc'))
      const newsSnapshot = await getDocs(newsQuery)
      
      const news = newsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishDate: doc.data().publishDate?.toDate() || new Date()
      }))

      // Cargar biografía
      const bioRef = collection(db.value, 'biography')
      const bioSnapshot = await getDocs(bioRef)
      const biography = bioSnapshot.docs.length > 0 ? {
        id: bioSnapshot.docs[0].id,
        ...bioSnapshot.docs[0].data()
      } : null

      // Nota: Estadísticas eliminadas de la funcionalidad
      
      console.log('✅ Contenido cargado desde Firebase')
      return { news, biography, statistics: [] }
    } catch (error) {
      console.error('❌ Error cargando contenido:', error)
      return { news: [], biography: null, statistics: [] }
    }
  }



  return {
    initFirebase,
    isConnected: readonly(isConnected),
    
    // Eventos
    saveEvents,
    loadEvents,
    
    // Media
    saveMedia,
    loadMedia,
    
    // Precios
    savePrices,
    loadPrices,
    
    // Contacto
    saveContact,
    loadContact,
    
    // Contenido
    saveContent,
    loadContent
  }
} 