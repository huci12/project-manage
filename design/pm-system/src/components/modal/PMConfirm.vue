<template>
  <PMModal
    :visible="visible"
    :title="title"
    size="small"
    :closable="closable"
    :close-on-overlay="closeOnOverlay"
    :show-cancel="true"
    :show-confirm="true"
    :confirm-text="confirmText"
    :cancel-text="cancelText"
    @update:visible="$emit('update:visible', $event)"
    @confirm="handleConfirm"
    @cancel="handleCancel"
    @close="handleClose"
  >
    <div class="pm-confirm">
      <div class="pm-confirm__icon">
        <div 
          class="pm-confirm__icon-wrapper"
          :class="`pm-confirm__icon-wrapper--${type}`"
        >
          <!-- Question Icon -->
          <svg 
            v-if="type === 'question'" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
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
          
          <!-- Error/Danger Icon -->
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
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
      </div>
      
      <div class="pm-confirm__content">
        <p class="pm-confirm__message">{{ message }}</p>
        <p v-if="description" class="pm-confirm__description">{{ description }}</p>
      </div>
    </div>
  </PMModal>
</template>

<script>
import PMModal from './PMModal.vue'

export default {
  name: 'PMConfirm',
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
      default: 'question', // question, warning, danger
      validator: (value) => ['question', 'warning', 'danger'].includes(value)
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
    cancelText: {
      type: String,
      default: '취소'
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
  emits: ['update:visible', 'confirm', 'cancel', 'close'],
  computed: {
    defaultTitle() {
      const titles = {
        question: '확인',
        warning: '경고',
        danger: '주의'
      }
      return this.title || titles[this.type]
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('confirm')
      this.$emit('update:visible', false)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.pm-confirm {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 8px 0;
}

.pm-confirm__icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.pm-confirm__icon-wrapper--question {
  background-color: #E6FFFA;
  color: #234E52;
}

.pm-confirm__icon-wrapper--warning {
  background-color: #FEEBC8;
  color: #C05621;
}

.pm-confirm__icon-wrapper--danger {
  background-color: #FED7D7;
  color: #742A2A;
}

.pm-confirm__content {
  flex: 1;
}

.pm-confirm__message {
  margin: 0 0 8px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  color: #1A202C;
}

.pm-confirm__description {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: #718096;
}
</style>
