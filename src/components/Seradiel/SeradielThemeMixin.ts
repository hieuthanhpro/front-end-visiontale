/**
 * Seradiel Theme Mixin
 * Provides theme-aware color schemes for Seradiel character
 */

export interface SeradielTheme {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
  hat: {
    brim: string
    cone: string
    star: string
  }
  dress: string
  wings: string
  wand: string
}

export const SERADIEL_THEMES: Record<string, SeradielTheme> = {
  // Default purple theme
  default: {
    primary: '#8B5CF6',
    secondary: '#A855F7', 
    accent: '#C084FC',
    background: '#F3E8FF',
    text: '#2C1810',
    hat: {
      brim: '#8B5CF6',
      cone: '#7C3AED',
      star: '#FDE047'
    },
    dress: '#8B5CF6',
    wings: '#C084FC',
    wand: '#8B4513'
  },

  // Dark theme
  dark: {
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#A78BFA',
    background: '#1E1B4B',
    text: '#F8FAFC',
    hat: {
      brim: '#6366F1',
      cone: '#4F46E5',
      star: '#FDE047'
    },
    dress: '#6366F1',
    wings: '#A78BFA',
    wand: '#92400E'
  },

  // Autumn theme
  autumn: {
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FCD34D',
    background: '#FEF3C7',
    text: '#92400E',
    hat: {
      brim: '#F59E0B',
      cone: '#D97706',
      star: '#FDE047'
    },
    dress: '#F59E0B',
    wings: '#FCD34D',
    wand: '#92400E'
  },

  // Ocean theme
  ocean: {
    primary: '#0EA5E9',
    secondary: '#0284C7',
    accent: '#7DD3FC',
    background: '#E0F2FE',
    text: '#0C4A6E',
    hat: {
      brim: '#0EA5E9',
      cone: '#0284C7',
      star: '#FDE047'
    },
    dress: '#0EA5E9',
    wings: '#7DD3FC',
    wand: '#92400E'
  },

  // Forest theme
  forest: {
    primary: '#059669',
    secondary: '#047857',
    accent: '#6EE7B7',
    background: '#D1FAE5',
    text: '#064E3B',
    hat: {
      brim: '#059669',
      cone: '#047857',
      star: '#FDE047'
    },
    dress: '#059669',
    wings: '#6EE7B7',
    wand: '#92400E'
  },

  // Rose theme
  rose: {
    primary: '#E11D48',
    secondary: '#BE123C',
    accent: '#FDA4AF',
    background: '#FFE4E6',
    text: '#881337',
    hat: {
      brim: '#E11D48',
      cone: '#BE123C',
      star: '#FDE047'
    },
    dress: '#E11D48',
    wings: '#FDA4AF',
    wand: '#92400E'
  },

  // Cosmic theme
  cosmic: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    accent: '#C084FC',
    background: '#1E1B4B',
    text: '#F8FAFC',
    hat: {
      brim: '#8B5CF6',
      cone: '#7C3AED',
      star: '#FDE047'
    },
    dress: '#8B5CF6',
    wings: '#C084FC',
    wand: '#FDE047'
  },

  // Candlelight theme
  candlelight: {
    primary: '#F59E0B',
    secondary: '#D97706',
    accent: '#FCD34D',
    background: '#451A03',
    text: '#FEF3C7',
    hat: {
      brim: '#F59E0B',
      cone: '#D97706',
      star: '#FDE047'
    },
    dress: '#F59E0B',
    wings: '#FCD34D',
    wand: '#FDE047'
  },

  // Ethereal theme
  ethereal: {
    primary: '#A78BFA',
    secondary: '#8B5CF6',
    accent: '#C4B5FD',
    background: '#F3F4F6',
    text: '#374151',
    hat: {
      brim: '#A78BFA',
      cone: '#8B5CF6',
      star: '#FDE047'
    },
    dress: '#A78BFA',
    wings: '#C4B5FD',
    wand: '#92400E'
  },

  // Glass theme
  glass: {
    primary: '#06B6D4',
    secondary: '#0891B2',
    accent: '#67E8F9',
    background: '#F0FDFA',
    text: '#134E4A',
    hat: {
      brim: '#06B6D4',
      cone: '#0891B2',
      star: '#FDE047'
    },
    dress: '#06B6D4',
    wings: '#67E8F9',
    wand: '#92400E'
  }
}

export function getSeradielTheme(themeName: string): SeradielTheme {
  return SERADIEL_THEMES[themeName] || SERADIEL_THEMES.default
}

export function generateSeradielCSS(theme: SeradielTheme): string {
  return `
    .seradiel-character {
      --seradiel-primary: ${theme.primary};
      --seradiel-secondary: ${theme.secondary};
      --seradiel-accent: ${theme.accent};
      --seradiel-background: ${theme.background};
      --seradiel-text: ${theme.text};
      --seradiel-hat-brim: ${theme.hat.brim};
      --seradiel-hat-cone: ${theme.hat.cone};
      --seradiel-hat-star: ${theme.hat.star};
      --seradiel-dress: ${theme.dress};
      --seradiel-wings: ${theme.wings};
      --seradiel-wand: ${theme.wand};
    }
  `
}
