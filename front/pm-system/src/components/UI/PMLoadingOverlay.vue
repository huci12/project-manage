<template>
  <Transition name="loading-fade">
    <div v-if="visible" class="pm-loading-overlay">
      <!-- 오버레이 배경 -->
      <div class="pm-loading-overlay__backdrop" @click.stop></div>
      
      <!-- 로딩 팝업 -->
      <div class="pm-loading-overlay__content">
        <div class="loading-spinner">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke="#E2E8F0" 
              stroke-width="4" 
              fill="none"
            />
            <circle 
              cx="24" 
              cy="24" 
              r="20" 
              stroke="#667EEA" 
              stroke-width="4" 
              fill="none"
              stroke-dasharray="125.664" 
              stroke-dashoffset="31.416"
              stroke-linecap="round"
              class="loading-spinner__progress"
            />
          </svg>
        </div>
        <p class="loading-text">{{ text }}</p>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'PMLoadingOverlay',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '데이터를 불러오는 중...'
    }
  }
}
</script>

<style scoped>
.pm-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pm-loading-overlay__backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
}

.pm-loading-overlay__content {
  position: relative;
  background: #FFFFFF;
  padding: 32px 48px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 1;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

.loading-spinner__progress {
  transform-origin: center;
}

.loading-text {
  margin: 0;
  color: #2D3748;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
}

/* 애니메이션 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 트랜지션 */
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

.loading-fade-enter-active .pm-loading-overlay__content,
.loading-fade-leave-active .pm-loading-overlay__content {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.loading-fade-enter-from .pm-loading-overlay__content {
  transform: scale(0.9);
  opacity: 0;
}

.loading-fade-leave-to .pm-loading-overlay__content {
  transform: scale(0.9);
  opacity: 0;
}

/* 접근성 */
@media (prefers-reduced-motion: reduce) {
  .loading-spinner {
    animation: none;
  }
  
  .loading-spinner__progress {
    opacity: 0.8;
  }
}

/* 반응형 */
@media (max-width: 480px) {
  .pm-loading-overlay__content {
    padding: 24px 32px;
    margin: 16px;
  }
  
  .loading-spinner {
    width: 40px;
    height: 40px;
    margin-bottom: 16px;
  }
  
  .loading-spinner svg {
    width: 40px;
    height: 40px;
  }
  
  .loading-text {
    font-size: 14px;
  }
}
</style>
