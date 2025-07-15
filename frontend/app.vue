<template>
  <div>
    <!-- Navigation (only for public pages) -->
    <Navigation v-if="!isAdminRoute" />
    
    <!-- Page Content -->
    <NuxtPage />
    
    <!-- Music Player (only for public pages) -->
    <MusicPlayer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
// Detectar si estamos en una ruta de admin
const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
useHead({
  title: 'Andy Jaque - Tour Jaqueando la Cumbia 2025',
  meta: [
    { name: 'description', content: 'Sitio oficial de Andy Jaque. Tour Jaqueando la Cumbia 2025. Próximas fechas, agenda tu evento y más.' },
    { name: 'keywords', content: 'Andy Jaque, cumbia, tecladista, música, Chile, eventos, tour 2025, agenda evento' },
    { property: 'og:title', content: 'Andy Jaque - Tour Jaqueando la Cumbia 2025' },
    { property: 'og:description', content: 'El tour más esperado del año. Andy Jaque recorre Chile con su Tour Jaqueando la Cumbia 2025.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #111827;
  color: #ffffff;
}

html {
  scroll-behavior: smooth;
}
</style>
