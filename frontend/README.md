# Frontend - Andy Jaque

Frontend del sitio web oficial de Andy Jaque, construido con Nuxt 3, UnoCSS y TypeScript.

## 🚀 Desarrollo

### Requisitos
- Node.js 18 LTS o superior
- npm o pnpm

### Instalación rápida

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Acceder en http://localhost:3000
```

## 📋 Scripts disponibles

```bash
npm run dev         # Servidor de desarrollo (puerto 3000)
npm run build       # Compilar para producción
npm run preview     # Vista previa de producción
npm run lint        # Linter ESLint
npm run generate    # Generar sitio estático
```

## 🏗️ Tecnologías

- **Framework**: Nuxt 3 (Vue.js con SSR)
- **Estilos**: UnoCSS (utilidades CSS)
- **Tipado**: TypeScript
- **Fuentes**: Capture It, Capture It 2 (personalizadas)
- **Iconos**: Heroicons (SVG)

## 📂 Estructura de archivos

```
frontend/
├── components/          # Componentes Vue
│   ├── Hero.vue        # Sección principal
│   ├── Navigation.vue  # Navegación principal
│   ├── MusicPlayer.vue # Reproductor de música
│   └── ...
├── pages/              # Páginas de la aplicación
│   ├── index.vue      # Página principal (Tour)
│   ├── foto.vue       # Galería de fotos
│   └── ...
├── public/             # Archivos estáticos
│   ├── fotos/         # Galería de fotos
│   ├── audio/         # Archivos de audio
│   ├── images/        # Imágenes del sitio
│   └── fonts/         # Fuentes personalizadas
├── assets/css/         # Estilos globales
├── app.vue            # Aplicación raíz
├── nuxt.config.ts     # Configuración Nuxt
└── uno.config.ts      # Configuración UnoCSS
```

## 🎨 Configuración UnoCSS

### Presets habilitados
- `@unocss/preset-wind` - Utilidades tipo Tailwind
- `@unocss/preset-icons` - Iconos como clases CSS
- `@unocss/preset-typography` - Estilos de tipografía

### Shortcuts personalizados
```typescript
// uno.config.ts
'btn': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer transform hover:scale-105',
'btn-primary': 'btn bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl font-bold',
'btn-secondary': 'btn bg-transparent text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg hover:shadow-xl',
```

## 🖼️ Gestión de imágenes

### Galería de fotos
- **Ubicación**: `public/fotos/`
- **Estructura**: Carpetas por categoría (ANDY, BANDA, TITO, COKE, MAURI, YALO)
- **Formatos**: JPG optimizados
- **Funcionalidades**: Carrusel, modal, lazy loading

### Optimizaciones
- Skeleton loading para todas las imágenes
- Lazy loading en galería
- Transiciones suaves al cargar
- Compresión CSS para rendimiento

## 🎵 Reproductor de música

### Configuración
- **Archivo**: `public/audio/background-music.mp3`
- **Formato**: MP3, 128kbps mínimo
- **Funciones**: Play/pause, volumen, mute, loop
- **Estados**: Colapsado/expandido, marquee con título

### Componente MusicPlayer
```vue
<template>
  <div class="fixed bottom-20 right-6 z-40">
    <!-- Reproductor flotante -->
  </div>
</template>
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Navegación responsive
- Desktop: Menú horizontal completo
- Mobile: Mismo menú, texto más pequeño
- Todos los tamaños: Efectos hover y transiciones

## 🎨 Paleta de colores

```css
/* Colores principales */
--color-primary: #facc15;     /* Amarillo 400 */
--color-bg-primary: #000000;  /* Negro */
--color-bg-secondary: #111827; /* Gris 900 */
--color-bg-card: #1f2937;     /* Gris 800 */
--color-text-primary: #ffffff; /* Blanco */
--color-text-secondary: #d1d5db; /* Gris 300 */
```

## 🚀 Deployment

### Producción
```bash
# Compilar para producción
npm run build

# Vista previa local
npm run preview
```

### Opciones de deployment
- **Vercel**: Recomendado (soporte nativo Nuxt 3)
- **Netlify**: Alternativa con form handling
- **Cloudflare Pages**: Opción con CDN global

## 🐛 Debugging

### Logs útiles
```bash
# Modo desarrollo con logs detallados
npm run dev --verbose

# Analizar bundle
npm run build --analyze
```

### Problemas comunes
- **Imágenes no cargan**: Verificar rutas en `public/`
- **Estilos no aplican**: Revisar `uno.config.ts`
- **Componentes no reactivos**: Verificar `ref()` vs `reactive()`

## 💡 Convenciones

### Nomenclatura
- **Componentes**: PascalCase (`MusicPlayer.vue`)
- **Páginas**: kebab-case (`foto.vue`)
- **Clases CSS**: BEM o utilidades UnoCSS
- **Variables**: camelCase en JavaScript

### Estructura de componentes
```vue
<template>
  <!-- HTML -->
</template>

<script setup lang="ts">
  // Lógica TypeScript
</script>

<style scoped>
  /* Estilos CSS específicos */
</style>
```

## 📦 Dependencias principales

```json
{
  "nuxt": "^3.x",
  "@unocss/nuxt": "^0.x",
  "typescript": "^5.x"
}
```

---

**Desarrollado para Andy Jaque - Cumbia chilena 🇨🇱** 