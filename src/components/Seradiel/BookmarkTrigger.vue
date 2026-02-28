<template>
  <div 
    class="bookmark-wrapper"
    :class="{ 'is-open': isOpen }"
  >
    <div 
      class="bookmark-trigger"
      :class="{ 'dragging': isDragging }"
      :style="dragStyle"
      @click="handleClick"
      @mousedown="handleDragStart"
    >
      <div class="bookmark-content">
        <div class="bookmark-icon">🧚‍♀️</div>
        <div class="bookmark-text">Seradiel</div>
      </div>
      <div class="bookmark-ribbon"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const isDragging = ref(false)
const dragY = ref(0)
const startY = ref(0)

const dragStyle = computed(() => {
  if (isDragging.value) {
    return {
      top: `${Math.max(-50, dragY.value)}px`,
      cursor: 'grabbing'
    }
  }
  if (props.isOpen) {
    return {
      position: 'fixed',
      top: 'auto',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '12px 12px 0 0',
      boxShadow: '0 -8px 20px rgba(192, 107, 232, 0.8)'
    }
  }
  return {}
})

const handleClick = () => {
  if (!isDragging.value) {
    emit('toggle')
  }
}

const handleDragStart = (e: MouseEvent) => {
  isDragging.value = true
  startY.value = e.clientY
  dragY.value = -50

  const handleDragMove = (e: MouseEvent) => {
    if (isDragging.value) {
      const deltaY = e.clientY - startY.value
      const newY = Math.max(-50, Math.min(0, -50 + deltaY))
      dragY.value = newY
      
      // Auto-open if dragged down enough (like pulling a real bookmark)
      if (deltaY > 80 && !props.isOpen) {
        emit('toggle')
        handleDragEnd()
      }
    }
  }

const handleDragEnd = () => {
  isDragging.value = false
  // Snap back to original position if not opened
  if (!props.isOpen) {
    dragY.value = -50
  } else {
    // When opened, move to bottom of page (like a bookmark at the end of a book)
    dragY.value = window.innerHeight - 100 // Position at bottom
  }
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
}

  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
}
</script>

<style scoped>
.bookmark-wrapper {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  pointer-events: none;
}

.bookmark-trigger {
  position: relative;
  top: -50px;
  width: 100px;
  background: linear-gradient(135deg, #FF6B9D, #C06BE8);
  border-radius: 0 0 12px 12px;
  box-shadow: 0 4px 12px rgba(192, 107, 232, 0.4);
  cursor: pointer;
  pointer-events: all;
  transition: top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  user-select: none;
  z-index: 10000;
}

.bookmark-trigger:hover {
  top: -35px;
  box-shadow: 0 6px 16px rgba(192, 107, 232, 0.6);
}

.bookmark-wrapper.is-open .bookmark-trigger {
  top: 0;
  box-shadow: 0 8px 20px rgba(192, 107, 232, 0.8);
}

/* When opened, position at bottom of page - handled by dragStyle computed */

.bookmark-wrapper.is-open .bookmark-ribbon {
  display: none; /* Hide ribbon when at bottom */
}

.bookmark-trigger.dragging {
  transition: none;
}

.bookmark-content {
  padding: 12px 16px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bookmark-icon {
  font-size: 24px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.bookmark-text {
  color: white;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.bookmark-ribbon {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 10px solid #C06BE8;
  transition: opacity 0.3s;
}

/* Hide ribbon when at bottom */
.bookmark-wrapper.is-open .bookmark-ribbon {
  opacity: 0;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .bookmark-trigger {
    width: 80px;
  }
  
  .bookmark-icon {
    font-size: 20px;
  }
  
  .bookmark-text {
    font-size: 12px;
  }
}
</style>

