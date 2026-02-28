<template>
  <div class="chat-interface" :style="themeCSS">
    <div class="chat-header">
      <h3>💬 Chat với Seradiel</h3>
      <button class="close-btn" @click="$emit('close')">✕</button>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        class="message"
        :class="message.role"
      >
        <div class="message-avatar">
          <span v-if="message.role === 'assistant'">🧚‍♀️</span>
          <span v-else>👤</span>
        </div>
        <div class="message-bubble">
          <div class="message-content" v-html="formatMessage(message.content)"></div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>
      
      <!-- Typing indicator -->
      <div v-if="isTyping" class="message assistant typing-indicator">
        <div class="message-avatar">🧚‍♀️</div>
        <div class="message-bubble">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="chat-input-area">
      <!-- Quick replies (optional) -->
      <div v-if="quickReplies.length > 0" class="quick-replies">
        <button 
          v-for="(reply, index) in quickReplies"
          :key="index"
          class="quick-reply-btn"
          @click="sendQuickReply(reply)"
        >
          {{ reply }}
        </button>
      </div>
      
      <div class="chat-input">
        <input 
          v-model="inputMessage"
          type="text"
          :placeholder="placeholder"
          @keyup.enter="sendMessage"
          :disabled="isTyping"
          ref="inputField"
        />
        <button 
          class="send-btn"
          @click="sendMessage"
          :disabled="!inputMessage.trim() || isTyping"
        >
          <span v-if="!isTyping">🚀</span>
          <span v-else class="loading-spinner">⏳</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const props = defineProps<{
  messages: Message[]
  isTyping: boolean
  placeholder?: string
}>()

// Get theme from store
const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)

const emit = defineEmits<{
  (e: 'send', message: string): void
  (e: 'close'): void
}>()

const inputMessage = ref('')
const messagesContainer = ref<HTMLDivElement>()
const inputField = ref<HTMLInputElement>()

// Generate CSS variables for theme based on app theme
const themeCSS = computed(() => {
  const themeId = currentTheme.value
  const themeColors = getThemeColors(themeId)
  
  // Parse primary RGB for tinted white background (1:5 ratio = 80% white + 20% theme color)
  const primaryRgb = themeColors.primaryRgb.split(',').map((n: string) => parseInt(n.trim()))
  
  return {
    '--seradiel-primary': themeColors.primary,
    '--seradiel-secondary': themeColors.secondary,
    '--seradiel-accent': themeColors.accent,
    '--seradiel-background': themeColors.background,
    '--seradiel-text': themeColors.text,
    '--seradiel-primary-rgb': themeColors.primaryRgb,
    '--seradiel-accent-rgb': themeColors.accentRgb,
    '--seradiel-tinted-white': `rgba(${255 * 0.8 + primaryRgb[0] * 0.2}, ${255 * 0.8 + primaryRgb[1] * 0.2}, ${255 * 0.8 + primaryRgb[2] * 0.2}, 0.95)`,
    '--seradiel-tinted-white-light': `rgba(${255 * 0.85 + primaryRgb[0] * 0.15}, ${255 * 0.85 + primaryRgb[1] * 0.15}, ${255 * 0.85 + primaryRgb[2] * 0.15}, 0.9)`,
    '--seradiel-border-radius-sm': '12px',
    '--seradiel-border-radius-md': '16px',
    '--seradiel-border-radius-lg': '20px',
    '--seradiel-border-radius-xl': '24px',
    '--seradiel-border-radius-round': '50%',
  }
})

// Map app themes to chat colors (matched with themes.css)
const getThemeColors = (themeId: string) => {
  const themeMap: Record<string, any> = {
    forest: {
      primary: '#8FB6A0',
      secondary: '#6B8F74',
      accent: '#C9D9CC',
      background: '#21332A',
      text: '#21332A',
      primaryRgb: '143, 182, 160',
      accentRgb: '201, 217, 204'
    },
    moon: {
      primary: '#B9C8E6',
      secondary: '#7A8FB0',
      accent: '#DDE9FF',
      background: '#0B1530',
      text: '#0B1530',
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
      text: '#2E1B10',
      primaryRgb: '255, 217, 166',
      accentRgb: '246, 231, 214'
    },
    tide: {
      primary: '#8FB2B9',
      secondary: '#2B6E7F',
      accent: '#F5CBA7',
      background: '#0F3A47',
      text: '#0F3A47',
      primaryRgb: '143, 178, 185',
      accentRgb: '245, 203, 167'
    },
    cosmic: {
      primary: '#A88CE0',
      secondary: '#4A2B6B',
      accent: '#EBD8FF',
      background: '#04040B',
      text: '#04040B',
      primaryRgb: '168, 140, 224',
      accentRgb: '235, 216, 255'
    },
    autumn: {
      primary: '#EFD6A2',
      secondary: '#D98C3F',
      accent: '#C9A78E',
      background: '#3B2E2A',
      text: '#3B2E2A',
      primaryRgb: '239, 214, 162',
      accentRgb: '201, 167, 142'
    },
    library: {
      primary: '#D9C9B1',
      secondary: '#8F7A66',
      accent: '#F5F0E8',
      background: '#2E2A25',
      text: '#2E2A25',
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

// Quick reply suggestions
const quickReplies = ref<string[]>([])

const sendMessage = () => {
  if (inputMessage.value.trim() && !props.isTyping) {
    emit('send', inputMessage.value.trim())
    inputMessage.value = ''
  }
}

const sendQuickReply = (reply: string) => {
  emit('send', reply)
  quickReplies.value = []
}

const formatMessage = (content: string) => {
  // Simple markdown-like formatting
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
}

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// Auto-scroll to bottom
watch(() => props.messages.length, async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
})

// Focus input when typing stops
watch(() => props.isTyping, (isTyping) => {
  if (!isTyping) {
    nextTick(() => {
      inputField.value?.focus()
    })
  }
})

// Update quick replies based on context - always show on first message
watch(() => props.messages, (messages) => {
  // Show quick replies only when there's just the welcome message
  if (messages.length <= 1) {
    quickReplies.value = [
      '✨ Tạo câu chuyện mới',
      '📖 Kể cho tôi nghe',
      '🎨 Ý tưởng sáng tạo',
      '🌟 Hướng dẫn cho tôi'
    ]
  } else {
    quickReplies.value = []
  }
}, { immediate: true })
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 500px;
  background: linear-gradient(135deg, var(--seradiel-background), var(--seradiel-secondary));
  border-radius: 0 0 var(--seradiel-border-radius-lg) var(--seradiel-border-radius-lg);
  overflow: hidden;
  position: relative;
}

.chat-interface::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
  border-radius: 0 0 var(--seradiel-border-radius-lg) var(--seradiel-border-radius-lg);
  pointer-events: none;
  z-index: 1;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--seradiel-primary), var(--seradiel-accent));
  color: white;
  box-shadow: 0 2px 8px rgba(var(--seradiel-primary-rgb), 0.2);
  border-radius: 0;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.close-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: var(--seradiel-border-radius-round);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05) rotate(90deg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: linear-gradient(to bottom, var(--seradiel-background), var(--seradiel-secondary));
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 2;
}

.chat-messages::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--seradiel-primary), var(--seradiel-accent), transparent);
}

.message {
  display: flex;
  gap: 12px;
  animation: slide-in 0.3s ease-out;
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: var(--seradiel-border-radius-round);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-bubble {
  max-width: 75%;
  padding: 12px 16px;
  border-radius: var(--seradiel-border-radius-md);
  animation: bubble-pop 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

@keyframes bubble-pop {
  0% { 
    transform: scale(0.8) translateY(10px);
    opacity: 0;
  }
  50% { 
    transform: scale(1.05) translateY(-2px);
    opacity: 0.9;
  }
  100% { 
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.message.assistant .message-bubble {
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  border-bottom-left-radius: 6px;
  border: 1px solid rgba(var(--seradiel-primary-rgb), 0.15);
  box-shadow: 0 2px 8px rgba(var(--seradiel-primary-rgb), 0.08);
}

.message.user .message-bubble {
  background: linear-gradient(135deg, var(--seradiel-primary), var(--seradiel-accent));
  color: white;
  border-bottom-right-radius: 6px;
  border: 1px solid rgba(var(--seradiel-accent-rgb), 0.2);
  box-shadow: 0 4px 16px rgba(var(--seradiel-accent-rgb), 0.15);
}

.message-content {
  line-height: 1.4;
  word-wrap: break-word;
  font-size: 14px;
}

.message.assistant .message-content {
  color: #1a202c;  /* Always dark text for readability on light background */
}

.message.user .message-content {
  color: white;
}

.message-time {
  font-size: 10px;
  margin-top: 3px;
  text-align: right;
}

.message.assistant .message-time {
  color: rgba(26, 32, 44, 0.5);  /* Dark with transparency */
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.7);  /* White with transparency */
}

.message.assistant .message-time {
  text-align: left;
}

.message.user .message-time {
  color: rgba(255, 255, 255, 0.7);
}

/* Typing indicator */
.typing-indicator .message-bubble {
  padding: 16px 20px;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  border-radius: var(--seradiel-border-radius-round);
  background: var(--seradiel-primary);
  animation: bounce-dot 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) { animation-delay: -0.32s; }
.typing-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce-dot {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* Chat input area */
.chat-input-area {
  border-top: 1px solid rgba(var(--seradiel-primary-rgb), 0.2);
  background: linear-gradient(135deg, var(--seradiel-background), var(--seradiel-secondary));
  position: relative;
}

.chat-input-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--seradiel-primary), var(--seradiel-accent), transparent);
}

.quick-replies {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  flex-wrap: wrap;
  border-bottom: 1px solid rgba(var(--seradiel-primary-rgb), 0.1);
}

.quick-reply-btn {
  padding: 10px 16px;
  border-radius: var(--seradiel-border-radius-lg);
  border: 1px solid rgba(var(--seradiel-primary-rgb), 0.2);
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #1a202c;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 2px 6px rgba(var(--seradiel-primary-rgb), 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.quick-reply-btn:hover {
  background: linear-gradient(135deg, var(--seradiel-primary), var(--seradiel-accent));
  color: white;
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 20px rgba(var(--seradiel-primary-rgb), 0.4);
  border-color: var(--seradiel-accent);
}

.chat-input {
  display: flex;
  gap: 12px;
  padding: 16px;
}

.chat-input input {
  flex: 1;
  padding: 14px 20px;
  border: 1px solid rgba(var(--seradiel-primary-rgb), 0.15);
  border-radius: var(--seradiel-border-radius-xl);
  font-size: 14px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  background: var(--seradiel-tinted-white);
  color: var(--seradiel-text);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 6px rgba(var(--seradiel-primary-rgb), 0.08);
}

.chat-input input:focus {
  border-color: var(--seradiel-accent);
  box-shadow: 0 0 0 3px rgba(var(--seradiel-accent-rgb), 0.12);
  transform: translateY(-1px);
  background: var(--seradiel-tinted-white);
}

.chat-input input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
}

.send-btn {
  width: 52px;
  height: 52px;
  border-radius: var(--seradiel-border-radius-round);
  border: none;
  background: linear-gradient(135deg, var(--seradiel-primary), var(--seradiel-accent));
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(var(--seradiel-primary-rgb), 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.send-btn:not(:disabled):hover {
  transform: scale(1.1) rotate(15deg);
  box-shadow: 0 8px 24px rgba(var(--seradiel-primary-rgb), 0.5);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: rgba(var(--seradiel-primary-rgb), 0.1);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(var(--seradiel-primary-rgb), 0.3);
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--seradiel-primary-rgb), 0.5);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .chat-interface {
    height: 400px;
  }
  
  .message-bubble {
    max-width: 80%;
  }
  
  .quick-reply-btn {
    font-size: 12px;
    padding: 6px 10px;
  }
}
</style>

