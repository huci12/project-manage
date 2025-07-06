import AuthPage from '@/pages/AuthPage.vue'

export default {
  title: 'Pages/AuthPage',
  component: AuthPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 관리 시스템의 인증 페이지입니다. 로그인 폼과 소셜 로그인 기능을 제공합니다.'
      }
    }
  }
}

// 라우터 목업
const createRouterMock = () => ({
  push: (path) => {
    console.log('Router push:', path)
  }
})

const Template = (args) => ({
  components: { AuthPage },
  setup() {
    return { args }
  },
  provide() {
    return {
      $router: createRouterMock()
    }
  },
  template: '<AuthPage v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {}

// 인터랙티브 데모
export const InteractiveDemo = () => ({
  components: { AuthPage },
  data() {
    return {
      loginAttempts: [],
      lastAction: null
    }
  },
  provide() {
    return {
      $router: {
        push: (path) => {
          this.lastAction = `라우터 이동: ${path}`
          console.log('Router push:', path)
        }
      }
    }
  },
  methods: {
    // AuthPage의 이벤트를 직접 받을 수 없으므로 console 출력을 오버라이드
    setupConsoleInterception() {
      const originalLog = console.log
      console.log = (...args) => {
        originalLog(...args)
        
        // 로그인 관련 메시지 처리
        if (args[0] === '로그인 시도:') {
          this.loginAttempts.push({
            timestamp: new Date().toLocaleTimeString('ko-KR'),
            email: args[1]?.email,
            success: args[1]?.email === 'kim@company.com' && args[1]?.password === 'password'
          })
          this.lastAction = `로그인 시도: ${args[1]?.email}`
        } else if (args[0] === '소셜 로그인:') {
          this.lastAction = `소셜 로그인 시도: ${args[1]}`
        } else if (args[0] === '비밀번호 찾기') {
          this.lastAction = '비밀번호 찾기 클릭'
        }
      }
    }
  },
  mounted() {
    this.setupConsoleInterception()
  },
  template: `
    <div style="display: flex; height: 100vh;">
      <!-- 인증 페이지 -->
      <div style="flex: 1; position: relative;">
        <AuthPage />
      </div>
      
      <!-- 디버그 패널 -->
      <div style="width: 400px; background: #F7FAFC; border-left: 1px solid #E2E8F0; padding: 24px; overflow-y: auto;">
        <h2 style="margin: 0 0 24px 0; color: #1A202C; font-size: 24px;">
          인증 페이지 테스트
        </h2>
        
        <!-- 테스트 정보 -->
        <div style="margin-bottom: 24px; padding: 16px; background: #E6FFFA; border-radius: 8px; border: 1px solid #81E6D9;">
          <h3 style="margin: 0 0 8px 0; color: #2D3748; font-size: 16px;">
            테스트 계정
          </h3>
          <p style="margin: 0 0 4px 0; color: #4A5568; font-size: 14px;">
            <strong>이메일:</strong> kim@company.com
          </p>
          <p style="margin: 0; color: #4A5568; font-size: 14px;">
            <strong>비밀번호:</strong> password
          </p>
        </div>
        
        <!-- 마지막 동작 -->
        <div v-if="lastAction" style="margin-bottom: 24px; padding: 16px; background: #FEF5E7; border-radius: 8px; border: 1px solid #F6D55C;">
          <h3 style="margin: 0 0 8px 0; color: #2D3748; font-size: 16px;">
            마지막 동작
          </h3>
          <p style="margin: 0; color: #4A5568; font-size: 14px;">
            {{ lastAction }}
          </p>
        </div>
        
        <!-- 로그인 시도 기록 -->
        <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #E2E8F0;">
          <h3 style="margin: 0 0 16px 0; color: #2D3748; font-size: 16px;">
            로그인 시도 기록
          </h3>
          
          <div v-if="loginAttempts.length === 0" style="color: #A0AEC0; font-size: 14px;">
            아직 로그인 시도가 없습니다.
          </div>
          
          <div v-else>
            <div v-for="(attempt, index) in loginAttempts" :key="index" 
                 style="margin-bottom: 12px; padding: 12px; background: #F7FAFC; border-radius: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #4A5568; font-size: 14px;">
                  {{ attempt.email }}
                </span>
                <span :style="{
                  color: attempt.success ? '#48BB78' : '#F56565',
                  fontSize: '12px',
                  fontWeight: '500'
                }">
                  {{ attempt.success ? '성공' : '실패' }}
                </span>
              </div>
              <div style="color: #A0AEC0; font-size: 12px; margin-top: 4px;">
                {{ attempt.timestamp }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- 테스트 안내 -->
        <div style="margin-top: 24px; padding: 16px; background: #F7FAFC; border-radius: 8px;">
          <h3 style="margin: 0 0 12px 0; color: #2D3748; font-size: 16px;">
            테스트 방법
          </h3>
          <ul style="margin: 0; padding-left: 20px; color: #4A5568; font-size: 14px;">
            <li style="margin-bottom: 8px;">테스트 계정으로 로그인을 시도해보세요.</li>
            <li style="margin-bottom: 8px;">잘못된 계정으로 로그인하면 에러가 표시됩니다.</li>
            <li style="margin-bottom: 8px;">소셜 로그인 버튼을 클릭해보세요.</li>
            <li>비밀번호 찾기 링크를 클릭해보세요.</li>
          </ul>
        </div>
      </div>
    </div>
  `
})

// 모바일 뷰
export const MobileView = () => ({
  components: { AuthPage },
  provide() {
    return {
      $router: createRouterMock()
    }
  },
  template: `
    <div style="width: 375px; height: 812px; margin: 0 auto; border: 1px solid #E2E8F0; overflow-y: auto; overflow-x: hidden; position: relative;">
      <AuthPage />
    </div>
  `
})

// 작은 모바일 뷰 (SE)
export const MobileViewSE = () => ({
  components: { AuthPage },
  provide() {
    return {
      $router: createRouterMock()
    }
  },
  template: `
    <div style="width: 320px; height: 568px; margin: 0 auto; border: 1px solid #E2E8F0; overflow-y: auto; overflow-x: hidden; position: relative;">
      <AuthPage />
    </div>
  `
})

// 태블릿 뷰
export const TabletView = () => ({
  components: { AuthPage },
  provide() {
    return {
      $router: createRouterMock()
    }
  },
  template: `
    <div style="width: 768px; height: 1024px; margin: 0 auto; border: 1px solid #E2E8F0; overflow-y: auto; overflow-x: hidden; position: relative;">
      <AuthPage />
    </div>
  `
})
