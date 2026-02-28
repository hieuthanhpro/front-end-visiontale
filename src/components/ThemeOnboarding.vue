<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="640px"
    class="onboarding-dialog"
  >
    <div class="onboarding-content">
      <h1 class="welcome-title">Welcome to VisionTale</h1>
      <p class="welcome-subtitle">Choose a mood to begin your creative journey</p>

      <div class="featured-themes">
        <div
          v-for="theme in featuredThemes"
          :key="theme.id"
          :class="['featured-theme', { selected: selectedTheme === theme.id }]"
          @click="selectTheme(theme.id)"
        >
          <div class="theme-preview" :style="getPreviewStyle(theme.id)">
            <div class="preview-overlay">
              <span class="theme-emoji-large">{{ theme.mood }}</span>
            </div>
          </div>
          <h3 class="theme-name">{{ getThemeName(theme) }}</h3>
          <p class="theme-description">{{ theme.description }}</p>
        </div>
      </div>

      <div class="onboarding-footer">
        <el-button
          type="text"
          @click="showAllThemes = !showAllThemes"
          class="show-more-btn"
        >
          {{ showAllThemes ? 'Show Less' : 'Show All Themes' }}
        </el-button>
        
        <el-button
          type="primary"
          size="large"
          @click="confirm"
          :disabled="!selectedTheme"
          class="confirm-btn"
        >
          Start Creating
        </el-button>
      </div>

      <transition name="slide-fade">
        <div v-if="showAllThemes" class="all-themes-grid">
          <div
            v-for="theme in otherThemes"
            :key="theme.id"
            :class="['mini-theme', { selected: selectedTheme === theme.id }]"
            @click="selectTheme(theme.id)"
            :style="getMiniPreviewStyle(theme.id)"
          >
            <div class="mini-overlay">
              <span class="mini-emoji">{{ theme.mood }}</span>
              <span class="mini-name">{{ getThemeName(theme) }}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore, themes } from '@/store/useThemeStore'
import { useI18n } from 'vue-i18n'

const ONBOARDING_KEY = 'visiontale-onboarding-done'

const { locale } = useI18n()
const themeStore = useThemeStore()
const visible = ref(false)
const selectedTheme = ref('')
const showAllThemes = ref(false)

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

// Featured themes: Forest, Moon, Candle
const featuredThemes = computed(() => 
  themes.filter(t => ['forest', 'moon', 'candle'].includes(t.id))
)

const otherThemes = computed(() => 
  themes.filter(t => !['forest', 'moon', 'candle'].includes(t.id))
)

const getPreviewStyle = (themeId: string) => {
  return {
    backgroundImage: `url(${themeImages[themeId]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}

const getMiniPreviewStyle = (themeId: string) => {
  return {
    backgroundImage: `url(${themeImages[themeId]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
}

const selectTheme = (themeId: string) => {
  selectedTheme.value = themeId
  themeStore.setTheme(themeId)
}

const confirm = () => {
  localStorage.setItem(ONBOARDING_KEY, 'true')
  visible.value = false
}

onMounted(() => {
  const done = localStorage.getItem(ONBOARDING_KEY)
  if (!done) {
    visible.value = true
    selectedTheme.value = 'forest'
    themeStore.setTheme('forest')
  }
})
</script>

<style scoped>
.onboarding-content {
  padding: 24px;
  text-align: center;
}

.welcome-title {
  font-size: 36px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px 0;
}

.welcome-subtitle {
  font-size: 16px;
  color: var(--subtext);
  margin: 0 0 40px 0;
}

.featured-themes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.featured-theme {
  padding: 24px;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.featured-theme:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow);
  border-color: var(--accent);
}

.featured-theme.selected {
  border-color: var(--accent);
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--surface) 95%, var(--accent)),
    var(--surface)
  );
  box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 30%, transparent);
}

.theme-preview {
  width: 100%;
  height: 140px;
  margin: 0 0 16px 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 12px var(--shadow);
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.6)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.featured-theme:hover .theme-preview {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px var(--shadow);
}

.featured-theme:hover .preview-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4)
  );
}

.featured-theme.selected .preview-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.3)
  );
}

.theme-emoji-large {
  font-size: 56px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.theme-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text);
  margin: 0 0 8px 0;
}

.theme-description {
  font-size: 13px;
  color: var(--subtext);
  margin: 0;
}

.onboarding-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;
}

.show-more-btn {
  color: var(--accent);
  font-weight: 500;
}

.confirm-btn {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border: none;
  color: var(--bg);
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--accent) 30%, transparent);
}

.confirm-btn:hover {
  box-shadow: 0 6px 16px color-mix(in srgb, var(--accent) 50%, transparent);
  transform: translateY(-1px);
}

.all-themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.mini-theme {
  position: relative;
  height: 100px;
  border: 2px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--shadow);
}

.mini-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.7)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  padding: 12px;
}

.mini-theme:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
}

.mini-theme:hover .mini-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.5)
  );
}

.mini-theme.selected {
  border-color: var(--accent);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--accent) 40%, transparent);
}

.mini-theme.selected .mini-overlay {
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.4)
  );
}

.mini-emoji {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.mini-name {
  font-size: 11px;
  font-weight: 600;
  color: white;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
  line-height: 1.2;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

<style>
.onboarding-dialog .el-dialog {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  box-shadow: 0 20px 60px var(--shadow) !important;
}

.onboarding-dialog .el-dialog__header {
  display: none;
}

.onboarding-dialog .el-dialog__body {
  padding: 0 !important;
}
</style>

