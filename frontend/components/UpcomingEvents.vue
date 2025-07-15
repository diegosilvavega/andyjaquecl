<template>
  <section id="upcoming-events" class="py-16 bg-gray-900 text-white">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-capture text-yellow-400 mb-4 text-shadow-lg glow-effect">
          PRÓXIMAS FECHAS
        </h2>
        <div class="bg-red-600/20 border-2 border-red-500 rounded-lg p-4 backdrop-blur-sm max-w-2xl mx-auto">
          <p class="text-base md:text-lg font-capture text-red-400 font-bold mb-2">
            ¡ATENCIÓN!!
          </p>
          <p class="text-sm md:text-base text-white font-capture-2 leading-relaxed">
            Seguimos agendando fechas a nuestro tour 
            <span class="text-yellow-400 font-bold">"JAQUEANDO LA CUMBIA"</span>
          </p>
          <p class="text-sm md:text-base text-white font-capture-2 leading-relaxed mt-2">
            No te lo pierdas, <span class="text-yellow-400 font-bold">el repertorio mas grande de Chile</span> 🎹
          </p>
        </div>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div 
          v-for="event in events" 
          :key="event.id"
          class="card"
        >
          <!-- Date -->
          <div class="flex items-center mb-3">
            <div class="bg-yellow-400 text-black rounded-lg p-2 text-center min-w-[70px] mr-3 shadow-lg">
              <div class="text-xs font-capture font-bold">{{ formatMonth(event.date) }}</div>
              <div class="text-xl font-capture font-bold">{{ formatDay(event.date) }}</div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-capture text-white mb-1">{{ event.venue }}</h3>
              <p class="text-gray-300 flex items-center font-body text-sm">
                <span class="text-yellow-400 mr-2">📍</span>
                {{ event.city }}
              </p>
              <p v-if="event.specialText" class="text-yellow-400 text-xs font-capture-2 mt-1">
                🎉 {{ event.specialText }}
              </p>
              <p v-if="event.isPrivate" class="text-yellow-400 text-xs font-capture-2 mt-1">
                🔒 Evento Privado
              </p>
            </div>
          </div>

                      <!-- Event Details -->
            <div class="space-y-1 mb-3">
              <p class="text-gray-300 text-xs flex items-center font-body">
                <span class="text-yellow-400 mr-2">🕘</span>
                {{ formatTime(event.time) }}
              </p>
              <p class="text-yellow-400 text-xs flex items-center font-capture-2">
                <span class="mr-2">🎫</span>
                Información próximamente
              </p>
            </div>

          <!-- Action Button -->
          <div class="flex gap-2">
            <a
              v-if="event.ticketUrl"
              :href="event.ticketUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary flex-1 text-center font-capture"
            >
              🎫 COMPRAR TICKETS
            </a>
            <button
              v-else-if="event.isPrivate"
              disabled
              class="btn-secondary flex-1 opacity-50 cursor-not-allowed font-capture"
            >
              🔒 EVENTO PRIVADO
            </button>
            <button
              v-else
              disabled
              class="btn-secondary flex-1 opacity-70 cursor-not-allowed font-capture"
            >
              🎵 PRÓXIMAMENTE
            </button>
          </div>
        </div>
      </div>

      <!-- Contact for Events -->
      <div class="text-center py-8 max-w-xl mx-auto">
        <div class="bg-black/30 rounded-lg p-6 border border-yellow-400/20">
          <h3 class="text-xl font-capture text-yellow-400 mb-3">
            💫 ¿QUIERES AGENDAR UN EVENTO?
          </h3>
          <p class="text-gray-300 mb-4 font-body text-sm">
            Para eventos privados, cumpleaños, matrimonios y más. 
            ¡Contáctanos directamente!
          </p>
          <div class="space-y-3">
            <a
              href="tel:+56965933017"
              class="btn-primary inline-flex items-center gap-2 font-body text-sm px-4 py-2"
            >
              📱 LLAMAR: +56 9 6593 3017
            </a>
            <p class="text-xs text-gray-400 font-body">
              También puedes contactarnos por WhatsApp o redes sociales
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Datos reales de los eventos de Andy Jaque
const allEvents = [
  {
    id: 1,
    date: new Date('2025-07-12'),
    time: '22:00',
    venue: 'Pub Delorean',
    city: 'Vicuña',
    price: null,
    ticketUrl: null,
    isSpecial: false
  },
  {
    id: 2,
    date: new Date('2025-07-19'),
    time: '21:30',
    venue: 'Ovalle Casino Resort',
    city: 'Ovalle',
    price: null,
    ticketUrl: null,
    isSpecial: false
  },
  {
    id: 3,
    date: new Date('2025-08-02'),
    time: '20:00',
    venue: 'OVO Beach Coquimbo',
    city: 'Coquimbo',
    price: null,
    ticketUrl: null,
    isSpecial: true,
    specialText: 'Aniversario Andy Jaque y su Banda'
  },
  {
    id: 4,
    date: new Date('2025-08-09'),
    time: '21:00',
    venue: 'Enjoy Antofagasta',
    city: 'Antofagasta',
    price: null,
    ticketUrl: null,
    isSpecial: false
  },
  {
    id: 5,
    date: new Date('2025-08-15'),
    time: '21:30',
    venue: 'Fraternidad La Diablada',
    city: 'Calama',
    price: null,
    ticketUrl: null,
    isSpecial: false
  },
  {
    id: 6,
    date: new Date('2025-08-29'),
    time: '22:00',
    venue: 'Salón Refugio Tropical',
    city: 'Copiapó',
    price: null,
    ticketUrl: null,
    isSpecial: false
  },
  {
    id: 7,
    date: new Date('2025-08-30'),
    time: '20:00',
    venue: 'Evento Privado',
    city: 'Copiapó',
    price: null,
    ticketUrl: null,
    isSpecial: false,
    isPrivate: true
  },
  {
    id: 8,
    date: new Date('2025-09-01'),
    time: '21:00',
    venue: 'Evento Privado',
    city: 'La Serena',
    price: null,
    ticketUrl: null,
    isSpecial: false,
    isPrivate: true
  }
]

// Filtrar eventos futuros y ordenar por fecha
const events = computed(() => {
  const now = new Date()
  return allEvents
    .filter(event => event.date >= now)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
})

const formatMonth = (date: Date) => {
  return date.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()
}

const formatDay = (date: Date) => {
  return date.getDate().toString().padStart(2, '0')
}

const formatTime = (time: string) => {
  return `${time} hrs`
}

// TODO: Conectar con Firestore para datos dinámicos
// const { getUpcomingEvents } = useFirestore()
// const { data: events } = await getUpcomingEvents()
</script>

<style scoped>
/* Estilos específicos del componente si es necesario */
</style> 