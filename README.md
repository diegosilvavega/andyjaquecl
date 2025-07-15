# 🎵 Andy Jaque - Sitio Web Oficial

> **Sitio web oficial de Andy Jaque** - Cantante de cumbia chilena  
> **Framework:** Nuxt 3.17.7 + UnoCSS + TypeScript  
> **Deploy:** https://andyjaquecl.vercel.app  
> **Puerto local:** http://localhost:3001

---

## 🌟 Características del Sitio

### Páginas Principales
- **🏠 TOUR** - Página principal con próximos eventos
- **🎵 MÚSICA** - Reproductor y discografía  
- **📸 FOTOS** - Galería optimizada con 78 fotos (47MB total)
- **🎬 VIDEO** - Videos oficiales y contenido multimedia
- **👤 BIO** - Biografía e información del artista
- **📰 NEWS** - Últimas noticias y colaboraciones
- **🛍️ MERCH** - Merchandising oficial
- **🎓 CURSOS** - Cursos de canto con precios promocionales
- **🎤 PRODUCCIÓN** - Servicios de producción musical

### Optimizaciones Implementadas ✨

#### **Rendimiento Visual**
- ✅ Navegación optimizada (altura reducida 20%, mayor transparencia)
- ✅ Eliminación de héroes innecesarios en FOTOS, BIO y NEWS
- ✅ Espaciado optimizado en todas las páginas
- ✅ Títulos amarillos oversized removidos

#### **Optimización de Imágenes** 🖼️
- ✅ **95% reducción de tamaño**: 1.0GB → 47MB total
- ✅ 78 fotos optimizadas con sips (macOS): 1920px, 95% calidad
- ✅ Estructura organizada por categorías: ANDY, BANDA, TITO, COKE, MAURI, YALO
- ✅ Carrusel horizontal con filtro automático
- ✅ Lazy loading y skeleton loading

#### **Estrategia de Precios Promocionales** 💰
- ✅ **CURSOS**: Descuentos del 29-33%
  - Curso Básico: ~~$45.000~~ → **$30.000**
  - Curso Avanzado: ~~$140.000~~ → **$100.000**
- ✅ **PRODUCCIÓN**: Descuentos del 32-33%
  - Grabación: ~~$220.000~~ → **$150.000**
  - Producción Completa: ~~$450.000~~ → **$300.000**
- ✅ Badges de descuento en rojo para urgencia psicológica

#### **Contenido Actualizado** 📰
- ✅ Últimas noticias sobre colaboración con Super Banda Tropikal
- ✅ Badge animado "¡NUEVO!" para contenido reciente
- ✅ Enlaces externos a noticias relevantes

---

## 🚀 Inicio Rápido

```bash
# Clonar repositorio
git clone [repository-url] andyjaquecl
cd andyjaquecl

# Instalar dependencias
cd frontend
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Acceder al sitio
# http://localhost:3001
```

## 📦 Tecnologías Utilizadas

- **Frontend**: Nuxt 3.17.7 (Vue.js con SSR)
- **Estilos**: UnoCSS + CSS personalizado
- **Tipado**: TypeScript 5.8.3
- **UI**: Nuxt UI 3.2.0
- **Imágenes**: Nuxt Image 1.10.0
- **Iconos**: Iconify MDI
- **Deploy**: Vercel (Framework automático)

## 📁 Estructura del Proyecto

```
andyjaquecl/
├── frontend/                 # Aplicación Nuxt 3
│   ├── components/          # Componentes Vue reutilizables
│   │   ├── Hero.vue        # Hero section principal
│   │   ├── Navigation.vue  # Navegación optimizada
│   │   ├── MusicPlayer.vue # Reproductor flotante
│   │   ├── LatestRelease.vue
│   │   ├── UpcomingEvents.vue
│   │   └── Footer.vue
│   ├── pages/              # Páginas de la aplicación
│   │   ├── index.vue      # TOUR (página principal)
│   │   ├── musica.vue     # MÚSICA
│   │   ├── foto.vue       # FOTOS (galería optimizada)
│   │   ├── video.vue      # VIDEO
│   │   ├── bio.vue        # BIO
│   │   ├── news.vue       # NEWS
│   │   ├── merch.vue      # MERCH
│   │   ├── cursos.vue     # CURSOS (precios promocionales)
│   │   └── produccion.vue # PRODUCCIÓN (precios promocionales)
│   ├── public/             # Archivos estáticos
│   │   ├── fotos-optimized/ # Fotos optimizadas (47MB)
│   │   │   ├── ANDY/       # 24 fotos del artista
│   │   │   ├── BANDA/      # 30 fotos de la banda
│   │   │   ├── TITO/       # 9 fotos de Tito
│   │   │   ├── COKE/       # 8 fotos de Coke
│   │   │   ├── MAURI/      # 6 fotos de Mauri
│   │   │   └── YALO/       # 2 fotos de Yalo
│   │   ├── audio/          # Música de fondo
│   │   ├── videos/         # Videos del hero
│   │   ├── images/         # Imágenes del sitio
│   │   └── fonts/          # Fuentes personalizadas
│   ├── assets/css/         # Estilos globales
│   ├── composables/        # Lógica reutilizable
│   ├── app.vue            # Aplicación raíz
│   ├── nuxt.config.ts     # Configuración Nuxt
│   ├── uno.config.ts      # Configuración UnoCSS
│   ├── vercel.json        # Configuración Vercel
│   └── package.json       # Dependencias y scripts
├── package.json            # Configuración del workspace
└── README.md              # Este archivo
```

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Amarillo (#facc15) - Marca distintiva
- **Fondo**: Negro absoluto (#000000) - Elegancia
- **Secundario**: Grises (#111827, #1f2937) - Profundidad
- **Texto**: Blanco (#ffffff) - Contraste óptimo

### Tipografía
- **Principal**: Capture It, Capture It 2 (fuentes personalizadas)
- **Iconos**: Heroicons SVG
- **Efectos**: Gradientes, sombras, animaciones CSS

### Responsive Design
- **Mobile First**: Optimizado para todos los dispositivos
- **Breakpoints**: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)
- **Navegación**: Uniforme en todos los tamaños

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor desarrollo (puerto 3001)
npm run build           # Build de producción
npm run preview         # Preview del build
npm run generate        # Generar sitio estático

# Herramientas
npm run lint            # ESLint
npm run typecheck       # Verificar tipos TypeScript

# Optimización de imágenes (macOS)
sips -Z 1920 -s format jpeg -s formatOptions 95 *.jpg
```

## 🚀 Deployment en Vercel

### Configuración Automática
- **URL Principal**: https://andyjaquecl.vercel.app
- **Framework**: Nuxt.js (detección automática)
- **Build Command**: `npm run build`
- **Output Directory**: `.output/public`

### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy desde /frontend
cd frontend
vercel --prod
```

## 🎵 Características Especiales

### Reproductor de Música Flotante
- Control de volumen y silencio
- Modo colapsado/expandido
- Efecto marquee para títulos largos
- Reproducción automática opcional

### Galería de Fotos Optimizada
- **78 fotos profesionales** organizadas por categorías
- **Carrusel horizontal** con navegación fluida
- **Modal fullscreen** para vista detallada
- **Lazy loading** con skeleton placeholders
- **Filtro automático** para mantener orientación horizontal

### Sistema de Precios Promocionales
- **Precios tachados** para mostrar descuentos
- **Badges de promoción** en rojo
- **Call-to-actions** prominentes
- **Urgencia psicológica** para conversión

## 📞 Soporte y Contacto

Para consultas sobre el proyecto:
- **Desarrollo**: Información técnica en `/frontend/README.md`
- **Optimizaciones**: Documentadas en este README
- **Deploy**: Configuración en `vercel.json`

---

**🎵 Andy Jaque - Cumbia Chilena 🇨🇱**  
*Sitio web oficial optimizado para rendimiento y conversión*
