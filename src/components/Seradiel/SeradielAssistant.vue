<template>
  <div class="seradiel-assistant">
    <!-- Bookmark trigger -->
    <BookmarkTrigger 
      :is-open="isOpen"
      @toggle="toggleChat"
    />
    
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div v-if="isOpen" class="seradiel-backdrop" @click="toggleChat"></div>
    </Transition>
    
    <!-- Chat container -->
    <Transition name="slide-down">
      <div v-if="isOpen" class="seradiel-chat-panel">
        <div class="seradiel-container" :style="themeCSS">
          <!-- Character -->
          <div class="character-section">
            <SeradielCharacter :state="characterState" />
          </div>
          
          <!-- Chat -->
          <div class="chat-section">
            <ChatInterface 
              :messages="messages"
              :is-typing="isTyping"
              :placeholder="inputPlaceholder"
              @send="handleSendMessage"
              @close="toggleChat"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'
import BookmarkTrigger from './BookmarkTrigger.vue'
import SeradielCharacter from './SeradielCharacter.vue'
import ChatInterface from './ChatInterface.vue'
import { seradielApi } from '@/api/seradiel_api'

// Get theme from store
const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)

// Generate CSS variables for theme based on app theme
const themeCSS = computed(() => {
  const themeId = currentTheme.value
  const themeColors = getThemeColors(themeId)
  return {
    '--seradiel-primary': themeColors.primary,
    '--seradiel-secondary': themeColors.secondary,
    '--seradiel-accent': themeColors.accent,
    '--seradiel-background': themeColors.background,
    '--seradiel-text': themeColors.text,
    '--seradiel-primary-rgb': themeColors.primaryRgb,
    '--seradiel-accent-rgb': themeColors.accentRgb,
  }
})

// Map app themes to Seradiel colors (matched with themes.css)
const getThemeColors = (themeId: string) => {
  const themeMap: Record<string, any> = {
    forest: {
      primary: '#8FB6A0',
      secondary: '#6B8F74',
      accent: '#C9D9CC',
      background: '#21332A',
      text: '#E6F0EB',
      primaryRgb: '143, 182, 160',
      accentRgb: '201, 217, 204'
    },
    moon: {
      primary: '#B9C8E6',
      secondary: '#7A8FB0',
      accent: '#DDE9FF',
      background: '#0B1530',
      text: '#F5F9FF',
      primaryRgb: '185, 200, 230',
      accentRgb: '221, 233, 255'
    },
    spring: {
      primary: '#5FB09E',
      secondary: '#D0A0B0',
      accent: '#B0D9CC',
      background: '#F8EEF0',
      text: '#2D1B1F',
      primaryRgb: '95, 176, 158',
      accentRgb: '176, 217, 204'
    },
    mist: {
      primary: '#7B8A94',
      secondary: '#A8ADB3',
      accent: '#9BA5AD',
      background: '#F2F4F5',
      text: '#2C3338',
      primaryRgb: '123, 138, 148',
      accentRgb: '155, 165, 173'
    },
    candle: {
      primary: '#FFD9A6',
      secondary: '#B8865B',
      accent: '#F6E7D6',
      background: '#2E1B10',
      text: '#FFF8F0',
      primaryRgb: '255, 217, 166',
      accentRgb: '246, 231, 214'
    },
    tide: {
      primary: '#8FB2B9',
      secondary: '#2B6E7F',
      accent: '#F5CBA7',
      background: '#0F3A47',
      text: '#F0F8F9',
      primaryRgb: '143, 178, 185',
      accentRgb: '245, 203, 167'
    },
    cosmic: {
      primary: '#A88CE0',
      secondary: '#4A2B6B',
      accent: '#EBD8FF',
      background: '#04040B',
      text: '#F8F5FF',
      primaryRgb: '168, 140, 224',
      accentRgb: '235, 216, 255'
    },
    autumn: {
      primary: '#EFD6A2',
      secondary: '#D98C3F',
      accent: '#C9A78E',
      background: '#3B2E2A',
      text: '#FFF5EB',
      primaryRgb: '239, 214, 162',
      accentRgb: '201, 167, 142'
    },
    library: {
      primary: '#D9C9B1',
      secondary: '#8F7A66',
      accent: '#F5F0E8',
      background: '#2E2A25',
      text: '#F8F5F0',
      primaryRgb: '217, 201, 177',
      accentRgb: '245, 240, 232'
    },
    glass: {
      primary: '#4FB89D',
      secondary: '#9DD5C9',
      accent: '#7BCDB9',
      background: '#F7FBFA',
      text: '#0D3D34',
      primaryRgb: '79, 184, 157',
      accentRgb: '123, 205, 185'
    }
  }
  
  return themeMap[themeId] || themeMap.forest
}

type CharacterState = 'idle' | 'talking' | 'thinking' | 'excited'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const isOpen = ref(false)
const messages = ref<Message[]>([])
const isTyping = ref(false)
const characterState = ref<CharacterState>('idle')

const inputPlaceholder = computed(() => {
  if (messages.value.length === 0) {
    return 'Bạn muốn tạo câu chuyện gì? 🌟'
  }
  return 'Nhập tin nhắn...'
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  
  if (isOpen.value && messages.value.length === 0) {
    // Welcome message - wise spirit guide tone
    setTimeout(() => {
      characterState.value = 'excited'
      addAssistantMessage('Chào bạn. Ta là Seradiel, người dẫn đường trên con đường sáng tạo. ✨\n\nTa đã thấy vô số câu chuyện được kể qua thời gian, và ta vui lòng được đồng hành cùng bạn. Hãy nói cho ta nghe - bạn muốn tạo nên điều gì hôm nay?')
      
      setTimeout(() => {
        characterState.value = 'idle'
      }, 2000)
    }, 500)
  }
}

const addAssistantMessage = (content: string) => {
  messages.value.push({
    role: 'assistant',
    content,
    timestamp: new Date()
  })
}

const addUserMessage = (content: string) => {
  messages.value.push({
    role: 'user',
    content,
    timestamp: new Date()
  })
}

const handleSendMessage = async (message: string) => {
  console.log('handleSendMessage called with:', message)
  
  // Add user message
  addUserMessage(message)
  
  // Update character state
  characterState.value = 'thinking'
  isTyping.value = true
  
  try {
    // Call Gemini API
    console.log('Calling Seradiel API...')
    const response = await seradielApi.sendMessage(message, messages.value)
    console.log('Seradiel response received:', response)
    
    if (!response) {
      console.error('Empty response from Seradiel!')
      throw new Error('Empty response')
    }
    
    // Simulate typing delay for better UX
    setTimeout(() => {
      characterState.value = 'talking'
      isTyping.value = false
      addAssistantMessage(response)
      console.log('Message added to UI')
      
      // Back to idle after talking
      setTimeout(() => {
        characterState.value = 'idle'
      }, 2000)
    }, 500)
    
  } catch (error) {
    console.error('Error sending message:', error)
    isTyping.value = false
    characterState.value = 'idle'
    
    addAssistantMessage('Ối! Ta gặp chút vấn đề rồi 😅 Bạn thử lại được không?')
  }
}
</script>

<style scoped>
.seradiel-assistant {
  position: relative;
  z-index: 9998;
}

/* Backdrop overlay for click-outside-to-close */
.seradiel-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9997;
  will-change: opacity;
}

.seradiel-chat-panel {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 600px;
  z-index: 9998;
  margin-bottom: 100px; /* Space for bookmark at bottom */
  will-change: transform, opacity;
}

.seradiel-container {
  background: linear-gradient(135deg, var(--seradiel-primary), var(--seradiel-secondary));
  border-radius: 24px;
  box-shadow: 0 16px 60px rgba(var(--seradiel-primary-rgb), 0.25);
  overflow: hidden;
  border: 3px solid var(--seradiel-primary);
  position: relative;
}

.seradiel-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 24px;
  pointer-events: none;
  z-index: 1;
}

.character-section {
  padding: 24px;
  background: linear-gradient(135deg, var(--seradiel-background), var(--seradiel-secondary));
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  position: relative;
  z-index: 2;
  border-radius: 24px 24px 0 0;
}

.chat-section {
  /* ChatInterface has its own styling */
}

/* Optimized slide down animation - faster and smoother */
.slide-down-enter-active {
  animation: slide-down 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-down-leave-active {
  animation: slide-down 0.3s cubic-bezier(0.55, 0.06, 0.68, 0.19) reverse;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Fade animation for backdrop - faster */
.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .seradiel-chat-panel {
    top: 50px;
    width: 95%;
    max-width: none;
    margin-bottom: 80px; /* Smaller space on mobile */
  }
  
  .character-section {
    padding: 15px;
  }
}
</style>


