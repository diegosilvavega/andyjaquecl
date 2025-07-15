# Andy Jaque — Sitio Web Oficial

> **Proyecto:** Sitio web oficial del tecladista de cumbia Andy Jaque
> **Stack:** Nuxt 3 + UnoCSS + TypeScript
> **Estado:** Proyecto completo y funcional

---

## 🎵 Sobre el Proyecto

Sitio web oficial de **Andy Jaque**, tecladista de cumbia de la Región de Coquimbo, Chile. El sitio presenta información sobre sus shows, música, videos, fotos, biografía, noticias y merchandise.

**Características principales:**
- Diseño moderno y responsive
- Navegación intuitiva entre secciones
- Galería de fotos con carrusel
- Reproductor de música de fondo
- Información actualizada de tour y eventos
- Integración con redes sociales

---

## 🚀 Instalación y Configuración

### Requisitos previos
- Node.js 18 LTS o superior
- npm o pnpm

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd andyjaquecl
   ```

2. **Instalar dependencias**
   ```bash
   cd frontend
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Acceder al sitio**
   ```
   http://localhost:3000
   ```

---

## 🎨 Características Implementadas

### ✅ Navegación Principal
- Header fijo con navegación entre secciones
- Secciones: TOUR, MÚSICA, VIDEOS, FOTOS, BIO, NEWS, MERCH
- Diseño responsive con efectos hover

### ✅ Página Principal (TOUR)
- Hero section con imagen de fondo
- Información del tour "Jaqueando la Cumbia 2025"
- Lista de próximos eventos y fechas
- Botones de CTA para ver fechas y agendar eventos
- Redes sociales integradas

### ✅ Sección Música
- Integración con Spotify
- Información sobre releases y singles
- Links a plataformas musicales

### ✅ Sección Videos
- Galería de videos de YouTube
- Últimos lanzamientos embebidos
- Enlaces a canal oficial

### ✅ Sección Fotos
- Carrusel principal con 6 fotos horizontales
- Galería expandible con todas las fotos
- Modal para vista ampliada de imágenes
- Fotos organizadas por categorías (Andy, Banda, Miembros)
- Animaciones de carga y efectos visuales

### ✅ Biografía
- Historia completa de Andy Jaque
- Información sobre la banda
- Trayectoria musical

### ✅ Noticias
- Últimas novedades del tour
- Información sobre eventos especiales
- Actualizaciones de la banda

### ✅ Merchandise
- Página de productos oficiales
- Información de contacto para compras

### ✅ Reproductor de Música
- Reproductor flotante en esquina inferior
- Música de fondo con controles
- Funciones: play/pause, volumen, mute
- Modo minimizado/expandido
- Marquee con nombre de canción

### ✅ Funcionalidades Adicionales
- Diseño completamente responsive
- Animaciones y transiciones suaves
- Sistema de loading para imágenes
- Efectos hover y estados interactivos
- SEO optimizado

---

## 📁 Estructura del Proyecto

```
andyjaquecl/
├── frontend/                    # Aplicación Nuxt 3
│   ├── components/             # Componentes Vue
│   │   ├── Hero.vue           # Sección principal
│   │   ├── Navigation.vue     # Navegación principal
│   │   ├── UpcomingEvents.vue # Lista de eventos
│   │   ├── LatestRelease.vue  # Últimos lanzamientos
│   │   ├── MusicPlayer.vue    # Reproductor de música
│   │   └── Footer.vue         # Footer con contacto
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── index.vue         # Página principal (Tour)
│   │   ├── musica.vue        # Página de música
│   │   ├── video.vue         # Página de videos
│   │   ├── foto.vue          # Página de fotos
│   │   ├── bio.vue           # Página de biografía
│   │   ├── news.vue          # Página de noticias
│   │   └── merch.vue         # Página de merchandise
│   ├── public/               # Archivos estáticos
│   │   ├── audio/           # Archivos de audio
│   │   ├── fotos/           # Galería de fotos
│   │   ├── images/          # Imágenes del sitio
│   │   └── fonts/           # Fuentes personalizadas
│   ├── assets/css/          # Estilos globales
│   ├── app.vue              # Aplicación raíz
│   ├── nuxt.config.ts       # Configuración Nuxt
│   ├── uno.config.ts        # Configuración UnoCSS
│   └── package.json         # Dependencias
└── README.md                # Este archivo
```

---

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo (puerto 3000)
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
npm run lint         # Linter ESLint
```

---

## 🎨 Diseño y Estilo

### Paleta de Colores
- **Negro**: `#000000` - Fondo principal
- **Gris 900**: `#111827` - Fondo secundario
- **Gris 800**: `#1f2937` - Cards y elementos
- **Amarillo 400**: `#facc15` - Color de marca/acentos
- **Blanco**: `#ffffff` - Texto principal

### Fuentes
- **Capture It**: Fuente principal para títulos
- **Capture It 2**: Fuente secundaria para subtítulos
- **System fonts**: Fuente del sistema para texto de cuerpo

### Características Visuales
- Diseño dark mode moderno
- Gradientes sutiles
- Efectos de hover y transiciones
- Componentes con backdrop blur
- Skeleton loading animations

---

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1024px y superior
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

Características responsive:
- Navegación adaptativa
- Grillas flexibles
- Imágenes optimizadas
- Texto escalable
- Botones y controles touch-friendly

---

## 🎵 Audio y Multimedia

### Reproductor de Música
- Archivo: `frontend/public/audio/background-music.mp3`
- Formato: MP3, 128kbps+
- Funcionalidades: Play/pause, volumen, mute, loop
- Comportamiento: Inicia colapsado, se expande al reproducir

### Galería de Fotos
- Ubicación: `frontend/public/fotos/`
- Organizadas por carpetas: ANDY, BANDA, TITO, COKE, MAURI, YALO
- Formatos: JPG optimizados
- Funcionalidades: Carrusel, modal, lazy loading

### Videos
- Plataforma: YouTube embebido
- Responsive: Iframe adaptativos
- Enlaces: Directos al canal oficial

---

## 🚀 Deployment

### Desarrollo Local
```bash
cd frontend
npm run dev
```

### Producción
```bash
cd frontend
npm run build
npm run preview
```

### Deployment Options
- **Vercel**: Recomendado para Nuxt 3
- **Netlify**: Alternativa con form handling
- **Google Cloud Run**: Para deployment containerizado

---

## 📧 Contacto

- **Teléfono/WhatsApp**: +56 9 6593 3017
- **Email**: managerandyjaque@gmail.com
- **Instagram**: @andy_jaque
- **Facebook**: AndyjaqueJ
- **TikTok**: @andyjaqueoficial
- **YouTube**: @Andy_Jaque
- **Spotify**: Andy Jaque

---

## 🏆 Créditos

- **Artista**: Andy Jaque
- **Desarrollo**: Sitio web oficial
- **Región**: Coquimbo, Chile 🇨🇱
- **Género**: Cumbia chilena
- **Tour**: "Jaqueando la Cumbia 2025"

---

## 📄 Licencia

© 2025 Andy Jaque. Todos los derechos reservados.
Sitio web oficial del artista de cumbia chileno.
