# 🎵 Frontend - Andy Jaque

> **Sitio web oficial de Andy Jaque** - Cantante de cumbia chilena  
> **Framework:** Nuxt 3.17.7 + UnoCSS + TypeScript  
> **Deploy:** https://andyjaquecl.vercel.app  
> **Puerto local:** http://localhost:3001

---

## 🌟 Optimizaciones Implementadas

### ✨ Rendimiento Visual Mejorado
- **Navegación optimizada**: Altura reducida de `h-20` a `h-16` (20% más compacta)
- **Mayor transparencia**: `bg-black/80` para mejor integración visual
- **Héroes eliminados**: Removidos de FOTOS, BIO y NEWS para acceso inmediato al contenido
- **Espaciado optimizado**: Reducción significativa en todas las páginas
- **Títulos optimizados**: Eliminados títulos amarillos oversized, mantenidos subtítulos descriptivos

### 🖼️ Optimización Masiva de Imágenes
- **95% reducción de tamaño**: 1.0GB → 47MB total
- **78 fotos optimizadas** usando macOS `sips`: 1920px, 95% calidad
- **Estructura organizada**:
  - **ANDY**: 24 fotos (artista principal)
  - **BANDA**: 30 fotos (banda completa)
  - **TITO**: 9 fotos (baterista)
  - **COKE**: 8 fotos (bajista)
  - **MAURI**: 6 fotos (tecladista)
  - **YALO**: 2 fotos (guitarrista)
- **Carrusel inteligente**: Filtro automático horizontal, acceso completo en modal
- **Problema crítico resuelto**: DSC01884.jpg (13MB vertical) optimizada

### 💰 Estrategia de Precios Promocionales
#### CURSOS
- **Curso Básico**: ~~$45.000~~ → **$30.000** (33% descuento)
- **Curso Avanzado**: ~~$140.000~~ → **$100.000** (29% descuento)

#### PRODUCCIÓN
- **Grabación Profesional**: ~~$220.000~~ → **$150.000** (32% descuento)
- **Producción Completa**: ~~$450.000~~ → **$300.000** (33% descuento)

#### Elementos Psicológicos
- **Precios tachados** en gris para mostrar valor original
- **Badges rojos de descuento** para urgencia
- **Calls-to-action prominentes** para conversión

### 📰 Contenido Actualizado
- **Últimas noticias**: Colaboración con Super Banda Tropikal en Vallenar
- **Badge "¡NUEVO!"** animado para contenido reciente
- **Enlaces externos** a noticias relevantes

---

## 🚀 Desarrollo Local

### Requisitos
- **Node.js**: 18 LTS o superior
- **Package Manager**: npm recomendado
- **OS**: Compatible con macOS, Linux, Windows

### Instalación Rápida
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder en http://localhost:3001
```

### Scripts Disponibles
```bash
npm run dev         # Servidor desarrollo (puerto 3001)
npm run build       # Compilar para producción
npm run preview     # Vista previa de producción
npm run generate    # Generar sitio estático
npm run lint        # ESLint
npm run typecheck   # Verificar tipos TypeScript
```

---

## 🏗️ Stack Tecnológico

### Core Framework
- **Nuxt**: 3.17.7 (Vue.js con SSR/SSG)
- **Vue**: 3.5.17 (Composition API)
- **TypeScript**: 5.8.3 (Tipado estático)

### UI y Estilos
- **UnoCSS**: 66.3.3 (Utilidades CSS atómicas)
- **Nuxt UI**: 3.2.0 (Componentes preconfigurados)
- **Tailwind Typography**: 0.5.16
- **Iconify MDI**: 1.2.3 (Iconos SVG)

### Herramientas de Desarrollo
- **ESLint**: 9.31.0 (Linting)
- **Nuxt Test Utils**: 3.19.2 (Testing)
- **Nuxt Image**: 1.10.0 (Optimización de imágenes)

### Servicios Externos
- **Firebase**: 11.10.0 (Backend como servicio)
- **VueFire**: 3.2.1 (Integración Vue-Firebase)

---

## 📂 Arquitectura de Componentes

### Componentes Principales
```typescript
components/
├── Hero.vue           # Hero section con video de fondo
├── Navigation.vue     # Navegación principal optimizada
├── MusicPlayer.vue    # Reproductor flotante con controles
├── LatestRelease.vue  # Último lanzamiento musical
├── UpcomingEvents.vue # Próximos eventos y fechas
└── Footer.vue         # Footer con enlaces sociales
```

### Páginas de la Aplicación
```typescript
pages/
├── index.vue         # TOUR - Página principal (próximos eventos)
├── musica.vue        # MÚSICA - Reproductor y discografía
├── foto.vue          # FOTOS - Galería optimizada (78 fotos)
├── video.vue         # VIDEO - Videos oficiales
├── bio.vue           # BIO - Biografía del artista
├── news.vue          # NEWS - Noticias y colaboraciones
├── merch.vue         # MERCH - Merchandising oficial
├── cursos.vue        # CURSOS - Cursos con precios promocionales
└── produccion.vue    # PRODUCCIÓN - Servicios de producción
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  /* Colores principales */
  --color-primary: #facc15;        /* Amarillo 400 - Marca */
  --color-primary-dark: #f59e0b;   /* Amarillo 500 - Hover */
  
  /* Fondos */
  --color-bg-primary: #000000;     /* Negro absoluto */
  --color-bg-secondary: #111827;   /* Gris 900 */
  --color-bg-card: #1f2937;        /* Gris 800 */
  
  /* Textos */
  --color-text-primary: #ffffff;   /* Blanco */
  --color-text-secondary: #d1d5db; /* Gris 300 */
  --color-text-muted: #9ca3af;     /* Gris 400 */
  
  /* Estados */
  --color-success: #10b981;        /* Verde éxito */
  --color-error: #ef4444;          /* Rojo error */
  --color-warning: #f59e0b;        /* Amarillo advertencia */
}
```

### Tipografía Personalizada
```css
@font-face {
  font-family: 'Capture It';
  src: url('/fonts/Capture_it.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Capture It 2';
  src: url('/fonts/Capture_it_2.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}
```

### Configuración UnoCSS
```typescript
// uno.config.ts
export default defineConfig({
  shortcuts: {
    // Botones
    'btn': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer transform hover:scale-105',
    'btn-primary': 'btn bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl font-bold',
    'btn-secondary': 'btn bg-transparent text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg hover:shadow-xl',
    
    // Layouts
    'section-padding': 'px-4 sm:px-6 lg:px-8',
    'container-max': 'max-w-6xl mx-auto',
    'text-balance': 'text-wrap balance',
    
    // Estados
    'loading-skeleton': 'animate-pulse bg-gray-800 rounded',
    'transition-smooth': 'transition-all duration-300 ease-in-out',
  }
})
```

---

## 🖼️ Gestión Avanzada de Imágenes

### Optimización Automática
```bash
# Comando usado para optimización masiva (macOS)
find public/fotos -name "*.jpg" -exec sips -Z 1920 -s format jpeg -s formatOptions 95 {} \;

# Resultado: 1.0GB → 47MB (95% reducción)
```

### Estructura de la Galería
```
public/fotos-optimized/
├── ANDY/          # 24 fotos del artista principal
│   ├── DSC00971.jpg   # Optimizada: 1920px, 95% calidad
│   ├── DSC00972.jpg   # Tamaño promedio: 600KB
│   └── ...
├── BANDA/         # 30 fotos de la banda completa
├── TITO/          # 9 fotos del baterista
├── COKE/          # 8 fotos del bajista
├── MAURI/         # 6 fotos del tecladista
└── YALO/          # 2 fotos del guitarrista
```

### Componente de Galería Avanzado
```vue
<template>
  <div class="photo-gallery">
    <!-- Carrusel horizontal optimizado -->
    <div class="carousel-container">
      <div v-for="photo in horizontalPhotos" :key="photo.id" class="photo-item">
        <img 
          :src="photo.optimized" 
          :alt="photo.alt"
          loading="lazy"
          @click="openModal(photo)"
          class="cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </div>
    
    <!-- Modal fullscreen para todas las fotos -->
    <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
      <img :src="currentPhoto.full" :alt="currentPhoto.alt" class="modal-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
// Filtro automático para carrusel horizontal
const horizontalPhotos = computed(() => 
  allPhotos.value.filter(photo => photo.orientation === 'horizontal')
)

// Acceso completo en modal
const allPhotos = ref([...]) // 78 fotos completas
</script>
```

---

## 🎵 Reproductor de Música Avanzado

### Características del Reproductor
- **Posición**: Flotante (bottom-20 right-6)
- **Estados**: Colapsado/Expandido
- **Controles**: Play/Pause, Volumen, Mute, Loop
- **Efectos**: Marquee para títulos largos
- **Responsive**: Adaptativo a todos los dispositivos

### Implementación
```vue
<template>
  <div class="fixed bottom-20 right-6 z-40">
    <div class="music-player" :class="{ expanded: isExpanded }">
      <!-- Controles principales -->
      <button @click="togglePlay" class="play-button">
        <Icon :name="isPlaying ? 'mdi:pause' : 'mdi:play'" />
      </button>
      
      <!-- Información de la canción -->
      <div class="track-info" v-if="isExpanded">
        <div class="track-title marquee">{{ currentTrack.title }}</div>
        <div class="track-artist">{{ currentTrack.artist }}</div>
      </div>
      
      <!-- Controles de volumen -->
      <div class="volume-controls" v-if="isExpanded">
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="volume"
          @input="updateVolume"
          class="volume-slider"
        />
      </div>
    </div>
  </div>
</template>
```

---

## 📱 Diseño Responsive Avanzado

### Breakpoints y Estrategia
```typescript
// Breakpoints UnoCSS
const breakpoints = {
  'sm': '640px',   // Móviles grandes
  'md': '768px',   // Tablets
  'lg': '1024px',  // Laptops
  'xl': '1280px',  // Desktops
  '2xl': '1536px'  // Pantallas grandes
}
```

### Navegación Responsive
```vue
<template>
  <nav class="navigation">
    <!-- Desktop: Menú completo horizontal -->
    <div class="hidden lg:flex space-x-8">
      <NuxtLink v-for="item in menuItems" :to="item.path" class="nav-link">
        {{ item.label }}
      </NuxtLink>
    </div>
    
    <!-- Mobile: Menú compacto -->
    <div class="lg:hidden flex space-x-4">
      <NuxtLink v-for="item in menuItems" :to="item.path" class="nav-link-mobile">
        {{ item.short }}
      </NuxtLink>
    </div>
  </nav>
</template>
```

---

## 🚀 Deployment en Vercel

### Configuración Automática
```json
// vercel.json
{
  "framework": "nuxtjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public"
}
```

### Variables de Entorno
```bash
# .env.local (no commitear)
NUXT_PUBLIC_SITE_URL=https://andyjaquecl.vercel.app
FIREBASE_API_KEY=your_firebase_key
FIREBASE_PROJECT_ID=your_project_id
```

### Proceso de Deploy
```bash
# Deploy automático desde Git
git push origin main

# Deploy manual con Vercel CLI
npx vercel --prod

# Preview deploy
npx vercel
```

---

## 🧪 Testing y Calidad

### Linting y Tipado
```bash
# ESLint para código limpio
npm run lint

# TypeScript para verificar tipos
npm run typecheck

# Formato automático
npm run lint -- --fix
```

### Métricas de Rendimiento
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **Lighthouse Score**: 95+ (Performance)

---

## 🔧 Troubleshooting

### Problemas Comunes

#### Imágenes no cargan
```bash
# Verificar rutas en public/
ls -la public/fotos-optimized/

# Verificar permisos
chmod -R 755 public/
```

#### Estilos no aplican
```bash
# Limpiar caché UnoCSS
rm -rf .nuxt
npm run dev
```

#### Build fallla
```bash
# Limpiar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar TypeScript
npm run typecheck
```

---

## 📦 Scripts de Mantenimiento

### Optimización de Imágenes
```bash
# Script para re-optimizar todas las imágenes
#!/bin/bash
cd public/fotos
for dir in */; do
  cd "$dir"
  sips -Z 1920 -s format jpeg -s formatOptions 95 *.jpg
  cd ..
done
```

### Análisis de Bundle
```bash
# Analizar tamaño del bundle
npm run build -- --analyze

# Generar reporte de dependencias
npm ls --depth=0
```

---

## 💡 Mejores Prácticas

### Desarrollo
1. **Componentes pequeños**: Máximo 200 líneas por componente
2. **TypeScript estricto**: Tipado completo en toda la aplicación
3. **CSS modular**: UnoCSS para utilidades, scoped para específicos
4. **Lazy loading**: Para todas las imágenes y componentes pesados

### Rendimiento
1. **Imágenes optimizadas**: Siempre usar herramientas de compresión
2. **Code splitting**: Cargar solo lo necesario por página
3. **Caché inteligente**: Aprovechar Vercel Edge Network
4. **Preload crítico**: Hero images y CSS above-the-fold

### SEO
1. **Meta tags dinámicos**: Por página usando Nuxt SEO
2. **Schema markup**: Para eventos musicales y artista
3. **URLs semánticas**: Slugs descriptivos y amigables
4. **Sitemap automático**: Generado en build time

---

**🎵 Andy Jaque - Frontend Optimizado**  
*Desarrollado con Nuxt 3.17.7 para máximo rendimiento y experiencia de usuario* 