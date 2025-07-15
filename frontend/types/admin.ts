// Tipos para el Panel de Administración de Andy Jaque

// ========== EVENTOS ==========
export interface Event {
  id: string
  date: Date
  time: string
  venue: string
  city: string
  price?: number
  ticketUrl?: string
  isSpecial: boolean
  specialText?: string
  isPrivate: boolean
  status: 'active' | 'cancelled' | 'sold_out'
  description?: string
  image?: string
}

// ========== PRECIOS ==========
export interface CoursePrice {
  id: string
  name: string
  originalPrice: number
  currentPrice: number
  discountPercentage: number
  description: string
  duration: string
  features: string[]
  isActive: boolean
  isPopular?: boolean
}

export interface ProductionService {
  id: string
  name: string
  originalPrice: number
  currentPrice: number
  discountPercentage: number
  description: string
  deliveryTime: string
  includes: string[]
  isActive: boolean
  category: 'recording' | 'mixing' | 'mastering' | 'full_production'
}

// ========== NOTICIAS ==========
export interface NewsItem {
  id: string
  title: string
  content: string
  excerpt: string
  publishDate: Date
  isNew: boolean
  externalUrl?: string
  image?: string
  tags: string[]
  isPublished: boolean
}

// ========== BIOGRAFÍA ==========
export interface Biography {
  id: string
  title: string
  subtitle: string
  mainText: string
  careerHighlights: string[]
  quote: string
  quoteAuthor: string
  image: string
  updatedAt: Date
}

export interface Statistic {
  id: string
  label: string
  value: string | number
  icon: string
  description: string
  order: number
}

// ========== MÚSICA ==========
export interface MusicLink {
  id: string
  platform: 'spotify' | 'youtube' | 'apple_music' | 'deezer'
  url: string
  title: string
  description?: string
  isActive: boolean
}

export interface VideoEmbed {
  id: string
  title: string
  youtubeId: string
  description?: string
  thumbnailUrl?: string
  order: number
  isActive: boolean
  category: 'latest_release' | 'music_video' | 'live_performance'
}

export interface MusicPlayerTrack {
  id: string
  title: string
  artist: string
  fileName: string
  duration?: number
  isActive: boolean
}

// ========== MERCHANDISING ==========
export interface MerchItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: 'clothing' | 'accessories' | 'music' | 'digital'
  sizes?: string[]
  colors?: string[]
  stock: number
  isAvailable: boolean
  isComingSoon: boolean
}

// ========== CONTACTO ==========
export interface ContactInfo {
  id: string
  phone: string
  whatsapp: string
  email: string
  managerEmail: string
  location: string
  businessHours?: string
  updatedAt: Date
}

export interface SocialMedia {
  id: string
  platform: 'instagram' | 'tiktok' | 'youtube' | 'spotify' | 'facebook'
  username: string
  url: string
  displayName: string
  isActive: boolean
  order: number
}

// ========== TESTIMONIOS ==========
export interface Testimonial {
  id: string
  customerName: string
  customerImage?: string
  rating: number
  text: string
  service: 'courses' | 'production' | 'events'
  date: Date
  isPublished: boolean
  isFeatured: boolean
}

// ========== CONFIGURACIÓN GENERAL ==========
export interface SiteConfig {
  id: string
  siteName: string
  siteDescription: string
  mainSlogan: string
  tourName: string
  heroImage: string
  heroVideoUrl?: string
  alertMessage?: string
  alertType?: 'info' | 'warning' | 'success' | 'error'
  alertActive: boolean
  maintenanceMode: boolean
  seoKeywords: string[]
  updatedAt: Date
}

export interface Portfolio {
  id: string
  title: string
  artist: string
  year: number
  description: string
  image?: string
  audioSample?: string
  category: string
  tags: string[]
  isPublished: boolean
}

// ========== RESPUESTAS DE API ==========
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ========== AUTENTICACIÓN ==========
export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'editor'
  lastLogin: Date
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthSession {
  user: AdminUser
  token: string
  expiresAt: Date
}

// ========== MULTIMEDIA ==========
export interface Song {
  id: string
  title: string
  artist: string
  album?: string
  duration: number // in seconds
  audioUrl: string
  coverUrl?: string
  genre?: string
  releaseDate?: Date
  isActive: boolean
  isFeatured: boolean
  order: number
  description?: string
  lyrics?: string
}

export interface Video {
  id: string
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  duration: number // in seconds
  category: 'music_video' | 'behind_scenes' | 'live_performance' | 'interview' | 'other'
  releaseDate: Date
  isActive: boolean
  isFeatured: boolean
  order: number
  viewCount?: number
}

export interface Playlist {
  id: string
  name: string
  description?: string
  coverUrl?: string
  songs: string[] // array of song IDs
  isActive: boolean
  isPublic: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface PlayerSettings {
  autoplay: boolean
  volume: number // 0-100
  showVisualizer: boolean
  defaultPlaylist?: string
  shuffleMode: boolean
  repeatMode: 'none' | 'one' | 'all'
  crossfade: number // seconds
}

// ========== CONTACTOS PROFESIONALES ==========
export interface ProfessionalContact {
  id: string
  type: 'manager' | 'booking' | 'press' | 'label' | 'publisher'
  name: string
  email: string
  phone?: string
  company?: string
  role?: string
  isPublic: boolean
  order: number
  notes?: string
  updatedAt: Date
}

export interface ContactSettings {
  showContactForm: boolean
  showSocialMedia: boolean
  showProfessionalContacts: boolean
  contactFormEmail: string
  autoReplyEnabled: boolean
  autoReplyMessage?: string
  enableSpamProtection: boolean
}