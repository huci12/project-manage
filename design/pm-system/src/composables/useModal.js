import { ref, createApp } from 'vue'
import PMAlert from '@/components/modal/PMAlert.vue'
import PMConfirm from '@/components/modal/PMConfirm.vue'

export function useModal() {
  // 프로그래밍 방식으로 Alert 표시
  const showAlert = (options) => {
    return new Promise((resolve) => {
      const {
        type = 'info',
        title = '',
        message = '',
        description = '',
        confirmText = '확인'
      } = options

      const div = document.createElement('div')
      document.body.appendChild(div)

      const app = createApp(PMAlert, {
        visible: true,
        type,
        title,
        message,
        description,
        confirmText,
        onConfirm: () => {
          resolve(true)
          cleanup()
        },
        onClose: () => {
          resolve(false)
          cleanup()
        },
        'onUpdate:visible': (visible) => {
          if (!visible) {
            resolve(false)
            cleanup()
          }
        }
      })

      const cleanup = () => {
        setTimeout(() => {
          app.unmount()
          document.body.removeChild(div)
        }, 300)
      }

      app.mount(div)
    })
  }

  // 프로그래밍 방식으로 Confirm 표시
  const showConfirm = (options) => {
    return new Promise((resolve) => {
      const {
        type = 'question',
        title = '',
        message = '',
        description = '',
        confirmText = '확인',
        cancelText = '취소'
      } = options

      const div = document.createElement('div')
      document.body.appendChild(div)

      const app = createApp(PMConfirm, {
        visible: true,
        type,
        title,
        message,
        description,
        confirmText,
        cancelText,
        onConfirm: () => {
          resolve(true)
          cleanup()
        },
        onCancel: () => {
          resolve(false)
          cleanup()
        },
        onClose: () => {
          resolve(false)
          cleanup()
        },
        'onUpdate:visible': (visible) => {
          if (!visible) {
            resolve(false)
            cleanup()
          }
        }
      })

      const cleanup = () => {
        setTimeout(() => {
          app.unmount()
          document.body.removeChild(div)
        }, 300)
      }

      app.mount(div)
    })
  }

  // 편의 메서드들
  const alert = {
    success: (message, options = {}) => showAlert({ type: 'success', message, ...options }),
    error: (message, options = {}) => showAlert({ type: 'error', message, ...options }),
    warning: (message, options = {}) => showAlert({ type: 'warning', message, ...options }),
    info: (message, options = {}) => showAlert({ type: 'info', message, ...options })
  }

  const confirm = {
    question: (message, options = {}) => showConfirm({ type: 'question', message, ...options }),
    warning: (message, options = {}) => showConfirm({ type: 'warning', message, ...options }),
    danger: (message, options = {}) => showConfirm({ type: 'danger', message, ...options })
  }

  return {
    showAlert,
    showConfirm,
    alert,
    confirm
  }
}
