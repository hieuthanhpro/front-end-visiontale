<template>
  <div class="seradiel-character" :class="characterState" :style="themeCSS">
    <div class="seradiel-body">
      <!-- Main fairy body -->
      <div class="fairy-head">
        <!-- Witch hat -->
        <div class="witch-hat">
          <div class="hat-brim"></div>
          <div class="hat-cone"></div>
          <div class="hat-star">✨</div>
          <div class="hat-sparkles">
            <span class="sparkle" v-for="i in 3" :key="i">✨</span>
          </div>
        </div>
        
        <div class="fairy-hair">
          <div class="hair-strand" v-for="i in 5" :key="i"></div>
        </div>
        <div class="fairy-face">
          <div class="cheeks">
            <div class="cheek left"></div>
            <div class="cheek right"></div>
          </div>
          <div class="eyes">
            <div class="eye left" :class="{ 'blinking': isBlinking, 'closed': isEyesClosed }">
              <div class="eyelash"></div>
            </div>
            <div class="eye right" :class="{ 'blinking': isBlinking, 'closed': isEyesClosed }">
              <div class="eyelash"></div>
            </div>
          </div>
          <div class="mouth" :class="mouthState"></div>
        </div>
      </div>
      
      <div class="fairy-body-main">
        <div class="dress">
          <div class="dress-pattern"></div>
          <div class="dress-bow"></div>
        </div>
        <div class="arms">
          <div class="arm left">
            <div class="hand"></div>
          </div>
          <div class="arm right">
            <div class="hand"></div>
          </div>
        </div>
        <div class="legs">
          <div class="leg left"></div>
          <div class="leg right"></div>
        </div>
      </div>
      
      <!-- Wings -->
      <div class="wings">
        <div class="wing left"></div>
        <div class="wing right"></div>
      </div>
      
      <!-- Magic wand - always visible -->
      <div class="wand">
        <div class="wand-stick"></div>
        <div class="wand-star">✨</div>
        <div class="magic-sparkles">
          <span class="sparkle" v-for="i in 3" :key="i">✨</span>
        </div>
      </div>
    </div>
    
    <!-- Sparkles -->
    <div class="sparkles" v-if="state !== 'idle'">
      <span class="sparkle" v-for="i in 5" :key="i">✨</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useThemeStore } from '@/store/useThemeStore'

type CharacterState = 'idle' | 'talking' | 'thinking' | 'excited'

const props = defineProps<{
  state: CharacterState
}>()

// Get theme from store
const themeStore = useThemeStore()
const currentTheme = computed(() => themeStore.currentTheme)

const isBlinking = ref(false)
const isEyesClosed = ref(false)

const mouthState = computed(() => {
  switch (props.state) {
    case 'talking':
      return 'talking'
    case 'excited':
      return 'happy'
    case 'thinking':
      return 'small'
    default:
      return 'gentle-smile' // Hiền từ
  }
})

const characterState = computed(() => {
  return `state-${props.state}`
})

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
    '--seradiel-hat-brim': themeColors.hat.brim,
    '--seradiel-hat-cone': themeColors.hat.cone,
    '--seradiel-hat-star': themeColors.hat.star,
    '--seradiel-dress': themeColors.dress,
    '--seradiel-wings': themeColors.wings,
    '--seradiel-wand': themeColors.wand,
  }
})

// Map app themes to Seradiel colors
const getThemeColors = (themeId: string) => {
  const themeMap: Record<string, any> = {
    forest: {
      primary: '#8FB6A0',
      secondary: '#6B8F74',
      accent: '#C9D9CC',
      background: '#21332A',
      text: '#E6F0EB',
      hat: { brim: '#8FB6A0', cone: '#6B8F74', star: '#FDE047' },
      dress: '#8FB6A0',
      wings: '#C9D9CC',
      wand: '#FDE047'
    },
    moon: {
      primary: '#B9C8E6',
      secondary: '#7A8FB0',
      accent: '#DDE9FF',
      background: '#0B1530',
      text: '#F5F9FF',
      hat: { brim: '#B9C8E6', cone: '#7A8FB0', star: '#FDE047' },
      dress: '#B9C8E6',
      wings: '#DDE9FF',
      wand: '#FDE047'
    },
    spring: {
      primary: '#5FB09E',
      secondary: '#D0A0B0',
      accent: '#B0D9CC',
      background: '#F8EEF0',
      text: '#2D1B1F',
      hat: { brim: '#5FB09E', cone: '#D0A0B0', star: '#FDE047' },
      dress: '#5FB09E',
      wings: '#B0D9CC',
      wand: '#FDE047'
    },
    mist: {
      primary: '#7B8A94',
      secondary: '#A8ADB3',
      accent: '#9BA5AD',
      background: '#F2F4F5',
      text: '#2C3338',
      hat: { brim: '#7B8A94', cone: '#A8ADB3', star: '#FDE047' },
      dress: '#7B8A94',
      wings: '#9BA5AD',
      wand: '#FDE047'
    },
    candle: {
      primary: '#FFD9A6',
      secondary: '#B8865B',
      accent: '#F6E7D6',
      background: '#2E1B10',
      text: '#FFF8F0',
      hat: { brim: '#FFD9A6', cone: '#B8865B', star: '#FDE047' },
      dress: '#FFD9A6',
      wings: '#F6E7D6',
      wand: '#FDE047'
    },
    tide: {
      primary: '#8FB2B9',
      secondary: '#2B6E7F',
      accent: '#F5CBA7',
      background: '#0F3A47',
      text: '#F0F8F9',
      hat: { brim: '#8FB2B9', cone: '#2B6E7F', star: '#FDE047' },
      dress: '#8FB2B9',
      wings: '#F5CBA7',
      wand: '#FDE047'
    },
    cosmic: {
      primary: '#A88CE0',
      secondary: '#4A2B6B',
      accent: '#EBD8FF',
      background: '#04040B',
      text: '#F8F5FF',
      hat: { brim: '#A88CE0', cone: '#4A2B6B', star: '#FDE047' },
      dress: '#A88CE0',
      wings: '#EBD8FF',
      wand: '#FDE047'
    },
    autumn: {
      primary: '#EFD6A2',
      secondary: '#D98C3F',
      accent: '#C9A78E',
      background: '#3B2E2A',
      text: '#FFF5EB',
      hat: { brim: '#EFD6A2', cone: '#D98C3F', star: '#FDE047' },
      dress: '#EFD6A2',
      wings: '#C9A78E',
      wand: '#FDE047'
    },
    library: {
      primary: '#D9C9B1',
      secondary: '#8F7A66',
      accent: '#F5F0E8',
      background: '#2E2A25',
      text: '#F8F5F0',
      hat: { brim: '#D9C9B1', cone: '#8F7A66', star: '#FDE047' },
      dress: '#D9C9B1',
      wings: '#F5F0E8',
      wand: '#FDE047'
    },
    glass: {
      primary: '#4FB89D',
      secondary: '#9DD5C9',
      accent: '#7BCDB9',
      background: '#F7FBFA',
      text: '#0D3D34',
      hat: { brim: '#4FB89D', cone: '#9DD5C9', star: '#FDE047' },
      dress: '#4FB89D',
      wings: '#7BCDB9',
      wand: '#FDE047'
    }
  }
  
  return themeMap[themeId] || themeMap.forest
}

// Random blinking and gentle eye closing
onMounted(() => {
  // Normal blinking
  setInterval(() => {
    isBlinking.value = true
    setTimeout(() => {
      isBlinking.value = false
    }, 200)
  }, 3000 + Math.random() * 2000)
  
  // Gentle eye closing (hiền từ)
  setInterval(() => {
    isEyesClosed.value = true
    setTimeout(() => {
      isEyesClosed.value = false
    }, 1000 + Math.random() * 2000)
  }, 5000 + Math.random() * 5000)
})
</script>

<style scoped>
.seradiel-character {
  position: relative;
  width: 120px;
  height: 140px;
  margin: 0 auto;
  overflow: hidden; /* Prevent any overflow issues */
}

/* Idle state - gentle floating */
.state-idle .seradiel-body {
  animation: float-gentle 4s ease-in-out infinite;
}

@keyframes float-gentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-6px) rotate(1deg); }
}

/* Talking state - bouncy */
.state-talking .seradiel-body {
  animation: talk-bounce 0.8s ease-in-out infinite;
}

@keyframes talk-bounce {
  0%, 100% { transform: scale(1) translateY(0); }
  50% { transform: scale(1.03) translateY(-3px); }
}

/* Thinking state - tilt head */
.state-thinking .seradiel-body {
  animation: think-tilt 3s ease-in-out infinite;
}

@keyframes think-tilt {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* Excited state - spin and bounce */
.state-excited .seradiel-body {
  animation: excited-spin 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes excited-spin {
  0% { transform: scale(0.9) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
  100% { transform: scale(1) rotate(360deg); }
}

/* Fairy body */
.seradiel-body {
  position: relative;
  width: 100%;
  height: 100%;
}

/* Head */
.fairy-head {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto;
}

/* Witch Hat */
.witch-hat {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; /* Lower than face */
}

.hat-brim {
  width: 60px;
  height: 8px;
  background: linear-gradient(135deg, var(--seradiel-hat-brim), var(--seradiel-secondary));
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
  position: relative;
  z-index: 2; /* Above cone */
}

.hat-brim::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, var(--seradiel-hat-cone), var(--seradiel-primary));
  border-radius: 50%;
  z-index: -1;
}

.hat-cone {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 35px solid var(--seradiel-hat-brim);
  position: relative;
  margin: 0 auto;
  filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3));
  z-index: 1; /* Behind the face */
  border-radius: 0 0 2px 2px; /* Smooth bottom corners */
}

/* Remove the second triangle that was covering the face */
.hat-cone::before {
  display: none;
}

.hat-star {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 18px;
  animation: twinkle 2s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(255, 255, 0, 0.9));
  z-index: 4;
}

.hat-sparkles {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 20px;
}

.hat-sparkles .sparkle {
  position: absolute;
  font-size: 10px;
  animation: float-sparkle 3s ease-in-out infinite;
  opacity: 0;
}

.hat-sparkles .sparkle:nth-child(1) { 
  top: 0; left: 5px; animation-delay: 0s; 
}
.hat-sparkles .sparkle:nth-child(2) { 
  top: 5px; right: 5px; animation-delay: 1s; 
}
.hat-sparkles .sparkle:nth-child(3) { 
  bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 2s; 
}

@keyframes twinkle {
  0%, 100% { 
    transform: translateX(-50%) scale(1) rotate(0deg);
    opacity: 1;
  }
  50% { 
    transform: translateX(-50%) scale(1.3) rotate(180deg);
    opacity: 0.9;
  }
}

@keyframes float-sparkle {
  0% { 
    transform: translateY(0) scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-15px) scale(1) rotate(360deg);
    opacity: 0;
  }
}

.fairy-hair {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 30px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 50% 50% 40% 40%;
  z-index: 5; /* Between hat and face */
  overflow: hidden;
}

.hair-strand {
  position: absolute;
  width: 3px;
  height: 15px;
  background: linear-gradient(to bottom, #FFD700, #FFA500);
  border-radius: 2px;
  animation: hair-sway 4s ease-in-out infinite;
}

.hair-strand:nth-child(1) { top: 5px; left: 8px; animation-delay: 0s; }
.hair-strand:nth-child(2) { top: 3px; left: 15px; animation-delay: 0.5s; }
.hair-strand:nth-child(3) { top: 2px; left: 22px; animation-delay: 1s; }
.hair-strand:nth-child(4) { top: 4px; left: 29px; animation-delay: 1.5s; }
.hair-strand:nth-child(5) { top: 6px; left: 36px; animation-delay: 2s; }

@keyframes hair-sway {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(2deg); }
  75% { transform: rotate(-2deg); }
}

.fairy-face {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #FFE4C4, #F4E4BC);
  border-radius: 50%;
  z-index: 10; /* Higher than hat */
  box-shadow: inset 0 2px 4px rgba(255, 192, 203, 0.3);
}

.cheeks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cheek {
  position: absolute;
  width: 8px;
  height: 6px;
  background: radial-gradient(ellipse, #FFB6C1, transparent);
  border-radius: 50%;
  top: 20px;
}

.cheek.left {
  left: 5px;
}

.cheek.right {
  right: 5px;
}

/* Eyes */
.eyes {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  display: flex;
  justify-content: space-between;
}

.eye {
  position: relative;
  width: 8px;
  height: 8px;
  background: #2C1810;
  border-radius: 50%;
  transition: height 0.1s;
  overflow: hidden;
}

.eye::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  opacity: 0.8;
}

.eyelash {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 4px;
  background: #2C1810;
  border-radius: 1px;
}

.eye.blinking {
  height: 2px;
}

.eye.closed {
  height: 2px;
  background: var(--seradiel-primary);
  border-radius: 2px;
}

.eye.closed::before {
  display: none;
}

.eye.closed .eyelash {
  display: none;
}

/* Mouth */
.mouth {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 6px;
  border-radius: 0 0 12px 12px;
  background: #FF6B9D;
  transition: all 0.3s;
}

.mouth.talking {
  width: 18px;
  height: 10px;
  border-radius: 0 0 18px 18px;
  background: linear-gradient(135deg, #FF6B9D, #EC4899); /* Fixed pink color */
  animation: talk-mouth 0.3s ease-in-out infinite alternate;
}

@keyframes talk-mouth {
  0% { height: 4px; width: 10px; }
  100% { height: 8px; width: 14px; }
}

.mouth.happy {
  width: 16px;
  height: 8px;
  border-radius: 0 0 16px 16px;
  background: linear-gradient(135deg, #FF6B9D, #EC4899); /* Fixed pink color */
}

.mouth.small {
  width: 8px;
  height: 4px;
  background: linear-gradient(135deg, #FF6B9D, #EC4899); /* Fixed pink color */
}

.mouth.gentle-smile {
  width: 14px;
  height: 6px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(135deg, #FF6B9D, #EC4899); /* Fixed pink color */
  box-shadow: 0 2px 4px rgba(255, 107, 157, 0.3);
}

/* Body */
.fairy-body-main {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 50px;
}

.dress {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--seradiel-dress), var(--seradiel-secondary));
  border-radius: 50% 50% 60% 60%;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.dress-pattern {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 20px;
  background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%);
  border-radius: 50%;
}

.dress-bow {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 8px;
  background: var(--seradiel-accent);
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.dress::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 10px;
  background: var(--seradiel-accent);
  opacity: 0.6;
  border-radius: 50%;
  filter: blur(4px);
}

/* Arms */
.arms {
  position: absolute;
  top: 10px;
  width: 100%;
}

.arm {
  position: absolute;
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #FFE4C4, #F4E4BC);
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.arm.left {
  left: -2px;
  transform: rotate(-20deg);
  transform-origin: top;
}

.arm.right {
  right: -2px;
  transform: rotate(20deg);
  transform-origin: top;
}

.hand {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #FFE4C4;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.legs {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 15px;
}

.leg {
  position: absolute;
  width: 3px;
  height: 12px;
  background: linear-gradient(to bottom, #FFE4C4, #F4E4BC);
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.leg.left {
  left: 6px;
}

.leg.right {
  right: 6px;
}

/* Wings */
.wings {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 60px;
  z-index: 0;
}

.wing {
  position: absolute;
  width: 35px;
  height: 50px;
  background: radial-gradient(ellipse at center, var(--seradiel-wings), var(--seradiel-accent));
  border-radius: 50% 70% 60% 40%;
  border: 2px solid var(--seradiel-accent);
  opacity: 0.8;
  animation: flutter 1s ease-in-out infinite;
}

.wing.left {
  left: -5px;
  transform-origin: right center;
}

.wing.right {
  right: -5px;
  transform-origin: left center;
  transform: scaleX(-1);
  animation-delay: 0.1s;
}

@keyframes flutter {
  0%, 100% { transform: rotateY(-10deg); }
  50% { transform: rotateY(10deg); }
}

/* Magic wand - always visible */
.wand {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 40px;
  height: 4px;
  transform: rotate(-45deg);
  transform-origin: bottom right;
  animation: wave-wand 2s ease-in-out infinite;
}

.wand-stick {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--seradiel-wand), #D2691E, #CD853F);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.wand-star {
  position: absolute;
  top: -10px;
  right: -8px;
  font-size: 18px;
  animation: sparkle-star 1s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(255, 255, 0, 0.8));
}

.magic-sparkles {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
}

.magic-sparkles .sparkle {
  position: absolute;
  font-size: 10px;
  animation: float-sparkle 2s ease-in-out infinite;
  opacity: 0;
}

.magic-sparkles .sparkle:nth-child(1) { 
  top: 0; left: 0; animation-delay: 0s; 
}
.magic-sparkles .sparkle:nth-child(2) { 
  top: 10px; right: 0; animation-delay: 0.7s; 
}
.magic-sparkles .sparkle:nth-child(3) { 
  bottom: 0; left: 10px; animation-delay: 1.4s; 
}

@keyframes wave-wand {
  0%, 100% { transform: rotate(-45deg); }
  50% { transform: rotate(-55deg); }
}

@keyframes sparkle-star {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

@keyframes float-sparkle {
  0% { 
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-20px) scale(1);
    opacity: 0;
  }
}

/* Sparkles */
.sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  font-size: 12px;
  animation: float-sparkle 2s ease-in-out infinite;
  opacity: 0;
}

.sparkle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.sparkle:nth-child(2) { top: 40%; right: 15%; animation-delay: 0.4s; }
.sparkle:nth-child(3) { top: 60%; left: 20%; animation-delay: 0.8s; }
.sparkle:nth-child(4) { top: 30%; right: 25%; animation-delay: 1.2s; }
.sparkle:nth-child(5) { top: 70%; left: 30%; animation-delay: 1.6s; }

@keyframes float-sparkle {
  0% { 
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-30px) scale(1);
    opacity: 0;
  }
}
</style>

