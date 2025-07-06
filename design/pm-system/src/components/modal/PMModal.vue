<template>
  <teleport to="body">
    <div 
      v-if="visible" 
      class="pm-modal-overlay"
      @click="handleOverlayClick"
    >
      <div 
        class="pm-modal"
        :class="[
          `pm-modal--${size}`,
          { 'pm-modal--no-padding': !padding }
        ]"
        @click.stop
      >
        <!-- 헤더 -->
        <div v-if="showHeader" class="pm-modal__header">
          <h3 class="pm-modal__title">{{ title }}</h3>
          <button 
            v-if="closable"
            class="pm-modal__close"
            @click="handleClose"
            :title="closeText"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- 바디 -->
        <div class="pm-modal__body">
          <slot></slot>
        </div>

        <!-- 푸터 -->
        <div v-if="showFooter" class="pm-modal__footer">
          <slot name="footer">
            <button 
              v-if="showCancel"
              class="pm-modal__btn pm-modal__btn--cancel"
              @click="handleCancel"
            >
              {{ cancelText }}
            </button>
            <button 
              v-if="showConfirm"
              class="pm-modal__btn pm-modal__btn--confirm"
              @click="handleConfirm"
              :disabled="confirmDisabled"
            >
              {{ confirmText }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'PMModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium', // small, medium, large, extra-large
      validator: (value) => ['small', 'medium', 'large', 'extra-large'].includes(value)
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: '확인'
    },
    cancelText: {
      type: String,
      default: '취소'
    },
    closeText: {
      type: String,
      default: '닫기'
    },
    confirmDisabled: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:visible', 'confirm', 'cancel', 'close'],
  watch: {
    visible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = ''
  },
  methods: {
    handleOverlayClick() {
      if (this.closeOnOverlay) {
        this.handleClose()
      }
    },
    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleConfirm() {
      this.$emit('confirm')
    },
    handleCancel() {
      this.$emit('cancel')
      this.handleClose()
    }
  }
}
</script>

<style scoped>
.pm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.pm-modal {
  background: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
}

.pm-modal--small {
  width: 400px;
  max-width: 90vw;
}

.pm-modal--medium {
  width: 600px;
  max-width: 90vw;
}

.pm-modal--large {
  width: 800px;
  max-width: 90vw;
}

.pm-modal--extra-large {
  width: 1000px;
  max-width: 95vw;
}

.pm-modal--no-padding .pm-modal__body {
  padding: 0;
}

/* 헤더 */
.pm-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E2E8F0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.pm-modal__title {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
  color: #1A202C;
}

.pm-modal__close {
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.pm-modal__close:hover {
  background-color: #F7FAFC;
  color: #2D3748;
}

/* 바디 */
.pm-modal__body {
  flex: 1;
  padding: 0 24px;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #2D3748;
}

/* 푸터 */
.pm-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #E2E8F0;
  margin-top: 24px;
}

.pm-modal__btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.pm-modal__btn--cancel {
  background-color: #FFFFFF;
  color: #4A5568;
  border: 1px solid #E2E8F0;
}

.pm-modal__btn--cancel:hover {
  background-color: #F7FAFC;
  border-color: #CBD5E0;
}

.pm-modal__btn--confirm {
  background-color: #667EEA;
  color: #FFFFFF;
}

.pm-modal__btn--confirm:hover:not(:disabled) {
  background-color: #5A67D8;
}

.pm-modal__btn--confirm:disabled {
  background-color: #A0AEC0;
  cursor: not-allowed;
}

/* 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 반응형 */
@media (max-width: 768px) {
  .pm-modal {
    margin: 0;
    width: 100% !important;
    max-width: none !important;
    height: 100%;
    max-height: none !important;
    border-radius: 0;
  }
  
  .pm-modal__header,
  .pm-modal__body,
  .pm-modal__footer {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
