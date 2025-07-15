import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, limit } from 'firebase/firestore'
import { useFirestore as useFirestoreVue } from 'vuefire'

export const useFirestore = () => {
  const db = useFirestoreVue()

  // Obtener eventos próximos
  const getUpcomingEvents = async () => {
    try {
      const eventsRef = collection(db, 'events')
      const q = query(eventsRef, orderBy('date', 'asc'), limit(10))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  // Obtener releases/música
  const getReleases = async () => {
    try {
      const releasesRef = collection(db, 'releases')
      const q = query(releasesRef, orderBy('releaseDate', 'desc'), limit(5))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching releases:', error)
      return []
    }
  }

  // Crear booking
  const createBooking = async (bookingData: any) => {
    try {
      const bookingsRef = collection(db, 'bookings')
      const docRef = await addDoc(bookingsRef, {
        ...bookingData,
        createdAt: new Date(),
        status: 'pending'
      })
      return docRef.id
    } catch (error) {
      console.error('Error creating booking:', error)
      throw error
    }
  }

  return {
    getUpcomingEvents,
    getReleases,
    createBooking
  }
} 