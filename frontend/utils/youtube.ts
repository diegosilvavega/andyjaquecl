/**
 * Utilidades para manejar videos de YouTube
 */

/**
 * Extrae el ID de video de una URL de YouTube
 * Soporta diferentes formatos:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://youtube.com/watch?v=VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null

  const patterns = [
    // Standard YouTube URL
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    // YouTube URL with additional parameters
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    // YouTube mobile URL
    /m\.youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    // YouTube short URL
    /youtu\.be\/([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Valida si una URL es de YouTube
 */
export function isYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null
}

/**
 * Genera URL de embed de YouTube
 */
export function getYouTubeEmbedUrl(videoId: string, options: {
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
  modestbranding?: boolean
  rel?: boolean
} = {}): string {
  const params = new URLSearchParams()
  
  if (options.autoplay) params.set('autoplay', '1')
  if (options.muted) params.set('mute', '1')
  if (options.controls === false) params.set('controls', '0')
  if (options.modestbranding) params.set('modestbranding', '1')
  if (options.rel === false) params.set('rel', '0')

  const queryString = params.toString()
  return `https://www.youtube.com/embed/${videoId}${queryString ? '?' + queryString : ''}`
}

/**
 * Genera URL de thumbnail de YouTube
 */
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}

/**
 * Convierte URL de YouTube a embed URL
 */
export function convertYouTubeToEmbed(url: string, options?: Parameters<typeof getYouTubeEmbedUrl>[1]): string | null {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null
  
  return getYouTubeEmbedUrl(videoId, options)
}

/**
 * Obtiene información básica de un video de YouTube desde la URL
 */
export function getYouTubeVideoInfo(url: string) {
  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return {
    id: videoId,
    url: url,
    embedUrl: getYouTubeEmbedUrl(videoId),
    thumbnailUrl: getYouTubeThumbnail(videoId),
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`
  }
} 