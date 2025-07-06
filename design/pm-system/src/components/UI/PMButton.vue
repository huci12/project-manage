<template>
  <button 
    :class="buttonClasses" 
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />
    <span v-if="$slots.default" class="button-text">
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'PMButton',
  emits: ['click'],
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'outline', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClasses() {
      return [
        'pm-button',
        `pm-button--${this.variant}`,
        `pm-button--${this.size}`,
        {
          'pm-button--disabled': this.disabled,
          'pm-button--full-width': this.fullWidth
        }
      ]
    }
  }
}
</script>

<style scoped>
.pm-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  outline: none;
  min-height: 44px; /* 터치 타겟 최소 크기 */
}

/* 사이즈 */
.pm-button--small {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 1.4;
  min-height: 36px;
}

.pm-button--medium {
  padding: 12px 20px;
  font-size: 16px;
  line-height: 1.5;
}

.pm-button--large {
  padding: 16px 24px;
  font-size: 18px;
  line-height: 1.4;
  min-height: 52px;
}

/* 변형 */
.pm-button--primary {
  background-color: #293380;
  color: #FFFFFF;
}

.pm-button--primary:hover:not(.pm-button--disabled) {
  background-color: #1e2661;
}

.pm-button--secondary {
  background-color: #953D60;
  color: #FFFFFF;
}

.pm-button--secondary:hover:not(.pm-button--disabled) {
  background-color: #7d3350;
}

.pm-button--outline {
  background-color: transparent;
  color: #293380;
  border: 1px solid #E2E8F0;
}

.pm-button--outline:hover:not(.pm-button--disabled) {
  background-color: #F8FAFC;
  border-color: #293380;
}

.pm-button--danger {
  background-color: #F56565;
  color: #FFFFFF;
}

.pm-button--danger:hover:not(.pm-button--disabled) {
  background-color: #e53e3e;
}

/* 상태 */
.pm-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pm-button--full-width {
  width: 100%;
}

.button-text {
  white-space: nowrap;
}
</style>
