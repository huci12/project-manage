<template>
  <div class="auth-page">
    <div class="auth-background">
      <div class="background-gradient"></div>
      <div class="background-pattern"></div>
    </div>

    <div class="auth-container">
      <LoginForm
        @submit="handleLogin"
        @social-login="handleSocialLogin"
        @forgot-password="handleForgotPassword"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'AuthPage',
  components: {
    LoginForm
  },
  methods: {
    async handleLogin(credentials) {
      try {
        // 실제 환경에서는 API 호출
        console.log('로그인 시도:', credentials)
        
        // 로딩 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 임시 로그인 성공 처리
        if (credentials.email === 'kim@company.com' && credentials.password === 'password') {
          // 로그인 성공 시 대시보드로 이동
          if (this.$router) {
            this.$router.push('/dashboard')
          } else {
            console.log('로그인 성공 - 라우터가 없습니다')
          }
        } else {
          throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')
        }
      } catch (error) {
        console.error('로그인 실패:', error)
        throw error
      }
    },

    handleSocialLogin(provider) {
      console.log('소셜 로그인:', provider)
      // 실제 환경에서는 OAuth 처리
      // 임시로 대시보드로 이동
      if (this.$router) {
        this.$router.push('/dashboard')
      } else {
        console.log('소셜 로그인 성공 - 라우터가 없습니다')
      }
    },

    handleForgotPassword() {
      console.log('비밀번호 찾기')
      // 실제 환경에서는 비밀번호 재설정 모달 또는 페이지로 이동
      alert('비밀번호 재설정 이메일을 보내드렸습니다.')
    }
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667EEA 0%, #764BA2 100%);
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%);
  background-size: 400px 400px, 600px 600px, 800px 800px;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

/* 반응형 */
@media (max-width: 768px) {
  .auth-page {
    padding: 16px;
    min-height: 100vh;
    min-height: 100dvh; /* 동적 뷰포트 높이 지원 */
  }

  .auth-container {
    max-width: 100%;
    padding: 16px;
  }
  
  .background-pattern {
    background-size: 300px 300px, 400px 400px, 500px 500px;
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 12px;
  }
  
  .auth-container {
    padding: 12px;
  }
}

/* 접근성 개선 */
@media (prefers-reduced-motion: reduce) {
  .background-pattern {
    animation: none;
  }
}
</style>
