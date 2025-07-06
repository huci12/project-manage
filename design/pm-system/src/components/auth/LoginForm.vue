<template>
  <div class="login-form">
    <div class="login-header">
      <div class="logo">
        <div class="logo-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="8" fill="#667EEA"/>
            <!-- PM System 로고 패턴 -->
            <circle cx="12" cy="12" r="4" fill="white"/>
            <circle cx="22" cy="12" r="4" fill="white"/>
            <circle cx="32" cy="12" r="4" fill="white"/>
            <circle cx="12" cy="22" r="4" fill="white"/>
            <rect x="22" y="22" width="18" height="8" rx="4" fill="white"/>
            <rect x="12" y="32" width="28" height="8" rx="4" fill="white"/>
          </svg>
        </div>
        <h1 class="logo-text">PM System</h1>
      </div>
      <p class="login-subtitle">프로젝트 관리 시스템에 로그인하세요</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="email" class="form-label">이메일 주소</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="form-input"
          :class="{ 'form-input--error': errors.email }"
          placeholder="이메일 주소를 입력하세요"
          required
          autocomplete="email"
        >
        <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">비밀번호</label>
        <div class="password-input">
          <input
            id="password"
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            class="form-input"
            :class="{ 'form-input--error': errors.password }"
            placeholder="비밀번호를 입력하세요"
            required
            autocomplete="current-password"
          >
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            :aria-label="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
          >
            <svg v-if="showPassword" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>
        <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input
            v-model="formData.rememberMe"
            type="checkbox"
            class="checkbox-input"
          >
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">로그인 상태 유지</span>
        </label>
      </div>

      <PMButton
        type="submit"
        variant="primary"
        size="large"
        :disabled="isLoading"
        full-width
        class="submit-button"
      >
        <template v-if="isLoading" #icon>
          <div class="loading-spinner">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="50.265" stroke-dashoffset="50.265">
                <animate attributeName="stroke-dasharray" dur="1s" values="0 50.265;25.133 25.133;0 50.265" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="1s" values="0;-25.133;-50.265" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </template>
        {{ isLoading ? '로그인 중...' : '로그인' }}
      </PMButton>

      <div v-if="errors.general" class="form-error form-error--general">
        {{ errors.general }}
      </div>
    </form>

    <div class="login-footer">
      <div class="divider">
        <span class="divider-text">또는</span>
      </div>

      <div class="social-login">
        <PMButton
          variant="outline"
          size="large"
          full-width
          @click="handleSocialLogin('google')"
        >
          <template #icon>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.8 10.2c0-.6-.1-1.3-.2-1.9H10v3.6h5.6c-.2 1.3-.9 2.4-2 3.1v2.6h3.2c1.9-1.7 3-4.3 3-7.4z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.9-.9 6.6-2.4l-3.2-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H1v2.7C2.7 17.3 6.1 20 10 20z" fill="#34A853"/>
              <path d="M4.4 12c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.3H1C.4 6.6 0 8.3 0 10s.4 3.4 1 4.7l3.4-2.7z" fill="#FBBC05"/>
              <path d="M10 3.9c1.5 0 2.8.5 3.9 1.5l2.9-2.9C14.9.9 12.7 0 10 0 6.1 0 2.7 2.7 1 5.3l3.4 2.7C5.2 5.7 7.4 3.9 10 3.9z" fill="#EA4335"/>
            </svg>
          </template>
          Google로 로그인
        </PMButton>
      </div>

      <div class="forgot-password">
        <a href="#" @click.prevent="$emit('forgot-password')" class="forgot-link">
          비밀번호를 잊으셨나요?
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import PMButton from '@/components/UI/PMButton.vue'

export default {
  name: 'LoginForm',
  components: {
    PMButton
  },
  emits: ['submit', 'social-login', 'forgot-password'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
        rememberMe: false
      },
      errors: {},
      showPassword: false,
      isLoading: false
    }
  },
  methods: {
    validateForm() {
      const errors = {}

      // 이메일 검증
      if (!this.formData.email) {
        errors.email = '이메일 주소를 입력해주세요.'
      } else if (!this.isValidEmail(this.formData.email)) {
        errors.email = '올바른 이메일 주소를 입력해주세요.'
      }

      // 비밀번호 검증
      if (!this.formData.password) {
        errors.password = '비밀번호를 입력해주세요.'
      } else if (this.formData.password.length < 6) {
        errors.password = '비밀번호는 최소 6자 이상이어야 합니다.'
      }

      this.errors = errors
      return Object.keys(errors).length === 0
    },

    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },

    async handleSubmit() {
      if (!this.validateForm()) return

      this.isLoading = true
      this.errors.general = ''

      try {
        await this.$emit('submit', { ...this.formData })
      } catch (error) {
        this.errors.general = error.message || '로그인에 실패했습니다.'
      } finally {
        this.isLoading = false
      }
    },

    handleSocialLogin(provider) {
      this.$emit('social-login', provider)
    }
  }
}
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 32px;
  background-color: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

@media (max-width: 480px) {
  .login-form {
    padding: 32px 24px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  }
}

/* 헤더 */
.login-header {
  text-align: center;
  margin-bottom: 32px;
}

@media (max-width: 480px) {
  .login-header {
    margin-bottom: 24px;
  }
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 480px) {
  .logo {
    gap: 12px;
    margin-bottom: 12px;
  }
  
  .logo-icon svg {
    width: 40px;
    height: 40px;
  }
}

.logo-text {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.2;
  color: #1A202C;
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 24px;
  }
}

.login-subtitle {
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: #718096;
}

/* 폼 */
.form {
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .form-group {
    margin-bottom: 20px;
  }
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  color: #2D3748;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #2D3748;
  background-color: #FFFFFF;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #293380;
  box-shadow: 0 0 0 3px rgba(41, 51, 128, 0.1);
}

.form-input--error {
  border-color: #F56565;
}

.form-input--error:focus {
  border-color: #F56565;
  box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #293380;
}

/* 체크박스 */
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #2D3748;
}

.checkbox-input {
  display: none;
}

.checkbox-custom {
  width: 18px;
  height: 18px;
  border: 2px solid #E2E8F0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.checkbox-input:checked + .checkbox-custom {
  background-color: #293380;
  border-color: #293380;
}

.checkbox-input:checked + .checkbox-custom::after {
  content: '✓';
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
}

/* 에러 메시지 */
.form-error {
  display: block;
  margin-top: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.4;
  color: #F56565;
}

.form-error--general {
  margin-top: 16px;
  text-align: center;
  padding: 12px;
  background-color: #FED7D7;
  border-radius: 8px;
  border: 1px solid #FC8181;
}

/* 로딩 */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 푸터 */
.login-footer {
  margin-top: 32px;
}

@media (max-width: 480px) {
  .login-footer {
    margin-top: 24px;
  }
}

.divider {
  position: relative;
  margin: 24px 0;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #E2E8F0;
}

.divider-text {
  background-color: #FFFFFF;
  padding: 0 16px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #718096;
}

.social-login {
  margin-bottom: 24px;
}

.forgot-password {
  text-align: center;
}

.forgot-link {
  color: #293380;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #1e2661;
  text-decoration: underline;
}

.submit-button {
  margin-bottom: 16px;
}
</style>
