import { defineConfig } from 'unocss'
import presetWind from '@unocss/preset-wind'
import presetIcons from '@unocss/preset-icons'
import presetTypography from '@unocss/preset-typography'

export default defineConfig({
  presets: [
    presetWind(), // Incluye todas las clases de Tailwind CSS
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  theme: {
    colors: {
      // Paleta de colores personalizada para Andy Jaque
      'gray': {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      'black': '#000000',
      'white': '#ffffff',
      'yellow': {
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
      },
    },
    fontFamily: {
      // Fuentes personalizadas para el estilo cumbia
      'capture': ['Capture It', 'Bebas Neue', 'sans-serif'],
      'capture-2': ['Capture It 2', 'Bebas Neue', 'sans-serif'],
      'title': ['Capture It', 'Archivo Black', 'sans-serif'],
      'cumbia': ['Capture It', 'Fredoka One', 'sans-serif'],
      'body': ['Inter', 'Oswald', 'sans-serif'],
      'sans': ['Inter', 'system-ui', 'sans-serif'],
    },
  },
  shortcuts: {
    // Shortcuts personalizados para el sitio
    'btn': 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-300 cursor-pointer transform hover:scale-105',
    'btn-primary': 'btn bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 shadow-lg hover:shadow-xl font-bold',
    'btn-secondary': 'btn bg-transparent text-white border-2 border-yellow-400 hover:bg-yellow-400 hover:text-black shadow-lg hover:shadow-xl',
    'card': 'bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:bg-gray-700 hover:shadow-xl',
    'text-shadow': 'drop-shadow-lg',
    'text-shadow-lg': 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]',
    'gradient-dark': 'bg-gradient-to-br from-gray-900 via-black to-gray-800',
  },
}) 