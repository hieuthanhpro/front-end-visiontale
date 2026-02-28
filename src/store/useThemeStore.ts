import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface Theme {
  id: string
  name: string
  nameVi: string
  description: string
  mood: string
}

export const themes: Theme[] = [
  {
    id: 'forest',
    name: 'Forest After Rain',
    nameVi: 'Rừng sau cơn mưa',
    description: 'Deep, wet, contemplative',
    mood: '🌲'
  },
  {
    id: 'moon',
    name: 'Moonlit Reverie',
    nameVi: 'Đêm trăng mộng mị',
    description: 'Mystical, serene, ethereal',
    mood: '🌙'
  },
  {
    id: 'spring',
    name: 'Whispering Spring',
    nameVi: 'Xuân thì thì thầm',
    description: 'Gentle, blooming, pure',
    mood: '🌸'
  },
  {
    id: 'mist',
    name: 'Ethereal Mist',
    nameVi: 'Sương mờ vô ảnh',
    description: 'Vague, surreal, soft',
    mood: '🌫️'
  },
  {
    id: 'candle',
    name: 'Candlelight Haven',
    nameVi: 'Nơi trú dưới ánh nến',
    description: 'Warm, nostalgic, intimate',
    mood: '🕯️'
  },
  {
    id: 'tide',
    name: 'Tide of Memories',
    nameVi: 'Sóng ký ức',
    description: 'Coastal nostalgia, calm',
    mood: '🌊'
  },
  {
    id: 'cosmic',
    name: 'Cosmic Dreamscape',
    nameVi: 'Mộng không gian',
    description: 'Mystical, exploratory, vast',
    mood: '🌌'
  },
  {
    id: 'autumn',
    name: 'Autumn\'s Embrace',
    nameVi: 'Vòng tay mùa thu',
    description: 'Warm, falling leaves, quiet',
    mood: '🍂'
  },
  {
    id: 'library',
    name: 'Lost Library',
    nameVi: 'Thư viện lạc lối',
    description: 'Dusty books, timeless, mysterious',
    mood: '📚'
  },
  {
    id: 'glass',
    name: 'Glass Garden',
    nameVi: 'Khu vườn pha lê',
    description: 'Pure, crystalline, modern',
    mood: '💎'
  }
]

const STORAGE_KEY = 'visiontale-theme'

export const useThemeStore = defineStore('theme', () => {
  // Get saved theme or default to 'forest'
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'forest'
  const currentTheme = ref<string>(savedTheme)

  // Apply theme to document root
  const applyTheme = (themeId: string) => {
    const root = document.documentElement
    // Remove all theme classes
    themes.forEach(theme => {
      root.classList.remove(`theme-${theme.id}`)
    })
    // Add new theme class
    root.classList.add(`theme-${themeId}`)
  }

  // Initialize theme on load
  applyTheme(currentTheme.value)

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  })

  const setTheme = (themeId: string) => {
    if (themes.some(t => t.id === themeId)) {
      currentTheme.value = themeId
    }
  }

  const getCurrentThemeInfo = () => {
    return themes.find(t => t.id === currentTheme.value) || themes[0]
  }

  return {
    currentTheme,
    themes,
    setTheme,
    getCurrentThemeInfo
  }
})

