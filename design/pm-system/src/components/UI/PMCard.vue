<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="pm-card__header">
      <slot name="header" />
    </div>
    <div class="pm-card__content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pm-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PMCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'elevated', 'outlined'].includes(value)
    },
    padding: {
      type: String,
      default: 'medium',
      validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cardClasses() {
      return [
        'pm-card',
        `pm-card--${this.variant}`,
        `pm-card--padding-${this.padding}`,
        {
          'pm-card--hoverable': this.hoverable
        }
      ]
    }
  }
}
</script>

<style scoped>
.pm-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  transition: all 0.2s ease;
  overflow: hidden;
}

/* 변형 */
.pm-card--default {
  border: 1px solid #E2E8F0;
}

.pm-card--elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.pm-card--outlined {
  border: 2px solid #E2E8F0;
}

/* 패딩 */
.pm-card--padding-none {
  padding: 0;
}

.pm-card--padding-small .pm-card__header,
.pm-card--padding-small .pm-card__content,
.pm-card--padding-small .pm-card__footer {
  padding: 12px 16px;
}

.pm-card--padding-medium .pm-card__header,
.pm-card--padding-medium .pm-card__content,
.pm-card--padding-medium .pm-card__footer {
  padding: 16px 20px;
}

.pm-card--padding-large .pm-card__header,
.pm-card--padding-large .pm-card__content,
.pm-card--padding-large .pm-card__footer {
  padding: 24px 32px;
}

/* 호버 효과 */
.pm-card--hoverable {
  cursor: pointer;
}

.pm-card--hoverable:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 구성 요소 */
.pm-card__header {
  border-bottom: 1px solid #F0F2F7;
}

.pm-card__footer {
  border-top: 1px solid #F0F2F7;
}

.pm-card__content {
  flex: 1;
}
</style>
