import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Solo ejecutar en cliente
  if (typeof window === 'undefined') return

  try {
    // Obtener configuración de Firebase desde variables de entorno
    const config = useRuntimeConfig()
    const firebaseConfig = config.public.firebase

    // Inicializar Firebase
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    console.log('🔥 Firebase inicializado globalmente')

    // Hacer disponible globalmente
    nuxtApp.provide('firebase', app)
    nuxtApp.provide('firestore', db)
  } catch (error) {
    console.error('❌ Error crítico: Firebase no pudo inicializarse:', error)
    console.error('🚨 La aplicación requiere Firebase para funcionar correctamente')
  }
}) 