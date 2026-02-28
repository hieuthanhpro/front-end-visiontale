<template>
  <el-popover
    placement="bottom"
    :width="320"
    trigger="click"
    popper-class="theme-switcher-popover"
  >
    <template #reference>
      <el-button circle class="theme-trigger">
        <span class="theme-emoji">{{ currentThemeInfo.mood }}</span>
      </el-button>
    </template>

    <div class="theme-switcher">
      <h3 class="switcher-title">Choose Your Mood</h3>
      <div class="themes-grid">
        <div
          v-for="theme in themes"
          :key="theme.id"
          :class="['theme-option', { active: currentTheme === theme.id }]"
          @click="handleThemeChange(theme.id)"
        >
          <div class="theme-bg" :style="getOptionBackgroundStyle(theme.id)"></div>
          <span class="theme-mood">{{ theme.mood }}</span>
          <div class="theme-info">
            <div class="theme-name">{{ getThemeName(theme) }}</div>
            <div class="theme-desc">{{ theme.description }}</div>
          </div>
          <div v-if="currentTheme === theme.id" class="active-indicator">
            <el-icon><Check /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'
import { Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)
const themes = computed(() => themeStore.themes)
const currentThemeInfo = computed(() => themeStore.getCurrentThemeInfo())

// Check if current language is English
const isEnglish = computed(() => locale.value === 'en-US')

// Get theme name based on language
const getThemeName = (theme: any) => {
  return isEnglish.value ? theme.name : theme.nameVi
}

// Theme image mapping
const themeImages: Record<string, string> = {
  forest: '/src/images/forest_after_rain.jpg',
  moon: '/src/images/moonlit_reverie.jpeg',
  spring: '/src/images/whispering_spring.jpg',
  mist: '/src/images/ethereal_mist.jpg',
  candle: '/src/images/candlelight_haven.webp',
  tide: '/src/images/tide_of_memories.jpg',
  cosmic: '/src/images/cosmic_dreamscape.jpg',
  autumn: '/src/images/autumn_embrace.png',
  library: '/src/images/lost_library.avif',
  glass: '/src/images/glass_garden.avif'
}

const getOptionBackgroundStyle = (themeId: string) => {
  return {
    backgroundImage: `url(${themeImages[themeId]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}

const handleThemeChange = (themeId: string) => {
  themeStore.setTheme(themeId)
  const theme = themes.value.find(t => t.id === themeId)
  const themeName = theme ? getThemeName(theme) : ''
  ElMessage({
    message: `Theme changed to ${themeName}`,
    type: 'success',
    duration: 2000,
    customClass: 'theme-change-message'
  })
}
</script>

<style scoped>
.theme-trigger {
  width: 48px;
  height: 48px;
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: 0 4px 12px var(--shadow);
  transition: all 0.3s ease;
}

.theme-trigger:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 16px var(--shadow);
  border-color: var(--accent);
}

.theme-emoji {
  font-size: 24px;
  display: block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.theme-switcher {
  padding: 8px;
}

.switcher-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 16px 0;
  text-align: center;
}

.themes-grid {
  display: grid;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: 0;
  transition: opacity 0.3s ease;
}

.theme-option:hover .theme-bg {
  opacity: 0.6;
}

.theme-option:hover {
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.theme-option:hover .theme-info {
  background: rgba(255, 255, 255, 0.85);
}

.theme-option:hover .theme-mood {
  transform: scale(1.05);
}

.theme-option.active {
  border-color: var(--accent);
  border-width: 3px;
  box-shadow: 0 6px 20px color-mix(in srgb, var(--accent) 35%, transparent);
}

.theme-option.active .theme-bg {
  opacity: 0.75;
}

.theme-option.active .theme-info {
  background: rgba(255, 255, 255, 0.95);
}

.theme-mood {
  font-size: 28px;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  position: relative;
  z-index: 2;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: transform 0.3s ease;
}

.theme-info {
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 2;
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  transition: background 0.3s ease;
}

.theme-name {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.2px;
}

.theme-desc {
  font-size: 11px;
  font-weight: 500;
  color: #4a4a4a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.1px;
}

.active-indicator {
  position: relative;
  z-index: 2;
  width: 24px;
  height: 24px;
  background: var(--accent);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  font-size: 14px;
  box-shadow: 0 2px 6px color-mix(in srgb, var(--accent) 40%, transparent);
}

/* Custom scrollbar */
.themes-grid::-webkit-scrollbar {
  width: 6px;
}

.themes-grid::-webkit-scrollbar-track {
  background: var(--bg);
  border-radius: 3px;
}

.themes-grid::-webkit-scrollbar-thumb {
  background: var(--muted);
  border-radius: 3px;
}

.themes-grid::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
</style>

<style>
/* Global popover styling */
.theme-switcher-popover.el-popover {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  box-shadow: 0 12px 32px var(--shadow) !important;
  padding: 16px !important;
}

.theme-change-message {
  background: var(--surface) !important;
  border: 1px solid var(--accent) !important;
  color: var(--text) !important;
}
</style>

