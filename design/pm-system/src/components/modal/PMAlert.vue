<template>
  <PMModal
    :visible="visible"
    :title="title"
    size="small"
    :closable="closable"
    :close-on-overlay="closeOnOverlay"
    :show-cancel="false"
    :confirm-text="confirmText"
    @update:visible="$emit('update:visible', $event)"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <div class="pm-alert">
      <div class="pm-alert__icon">
        <div 
          class="pm-alert__icon-wrapper"
          :class="`pm-alert__icon-wrapper--${type}`"
        >
          <!-- Success Icon -->
          <svg 
            v-if="type === 'success'" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <polyline points="20,6 9,17 4,12"/>
          </svg>
          
          <!-- Error Icon -->
          <svg 
            v-else-if="type === 'error'" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          
          <!-- Warning Icon -->
          <svg 
            v-else-if="type === 'warning'" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          
          <!-- Info Icon -->
          <svg 
            v-else 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </div>
      </div>
      
      <div class="pm-alert__content">
        <p class="pm-alert__message">{{ message }}</p>
        <p v-if="description" class="pm-alert__description">{{ description }}</p>
      </div>
    </div>
  </PMModal>
</template>

<script>
import PMModal from './PMModal.vue'

export default {
  name: 'PMAlert',
  components: {
    PMModal
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info', // success, error, warning, info
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '확인'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:visible', 'confirm', 'close'],
  computed: {
    defaultTitle() {
      const titles = {
        success: '성공',
        error: '오류',
        warning: '경고',
        info: '알림'
      }
      return this.title || titles[this.type]
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.$emit('update:visible', false)
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.pm-alert {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 8px 0;
}

.pm-alert__icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-alert__icon-wrapper--success {
  background-color: #C6F6D5;
  color: #22543D;
}

.pm-alert__icon-wrapper--error {
  background-color: #FED7D7;
  color: #742A2A;
}

.pm-alert__icon-wrapper--warning {
  background-color: #FEEBC8;
  color: #C05621;
}

.pm-alert__icon-wrapper--info {
  background-color: #E6FFFA;
  color: #234E52;
}

.pm-alert__content {
  flex: 1;
}

.pm-alert__message {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: #1A202C;
}

.pm-alert__description {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: #718096;
}
</style>
