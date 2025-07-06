import DashboardPage from '@/pages/DashboardPage.vue'
import PMLoadingOverlay from '@/components/UI/PMLoadingOverlay.vue'

export default {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 관리 시스템의 대시보드 페이지입니다. 프로젝트 현황과 주요 통계를 한눈에 볼 수 있습니다.'
      }
    }
  }
}

export const Default = () => ({
  components: { DashboardPage },
  template: '<DashboardPage />'
})

export const LoadingState = () => ({
  components: { DashboardPage, PMLoadingOverlay },
  data() {
    return {
      isLoading: true
    }
  },
  mounted() {
    // 3초 후 로딩 완료
    setTimeout(() => {
      this.isLoading = false
    }, 3000)
  },
  template: `
    <div>
      <DashboardPage />
      <PMLoadingOverlay :visible="isLoading" text="대시보드 데이터를 불러오는 중..." />
    </div>
  `
})

// 인터랙티브 데모
export const InteractiveDemo = () => ({
  components: { DashboardPage, PMLoadingOverlay },
  data() {
    return {
      isLoading: false,
      actionLog: []
    }
  },
  methods: {
    showLoading(text = '데이터를 불러오는 중...') {
      this.isLoading = true
      this.addLog(`로딩 시작: ${text}`)
      
      setTimeout(() => {
        this.isLoading = false
        this.addLog('로딩 완료')
      }, 2000)
    },
    addLog(message) {
      this.actionLog.unshift({
        id: Date.now(),
        message,
        time: new Date().toLocaleTimeString('ko-KR')
      })
      if (this.actionLog.length > 5) {
        this.actionLog.pop()
      }
    }
  },
  template: `
    <div style="position: relative;">
      <DashboardPage />
      
      <!-- 플로팅 액션 패널 -->
      <div style="position: fixed; bottom: 24px; left: 24px; background: white; padding: 16px; 
                  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 100;">
        <h4 style="margin: 0 0 12px 0; color: #2D3748;">테스트 액션</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button @click="showLoading('프로젝트 데이터 동기화 중...')" 
                  style="padding: 6px 12px; background: #667EEA; color: white; border: none; 
                         border-radius: 4px; cursor: pointer; font-size: 14px;">
            데이터 동기화
          </button>
          <button @click="showLoading('통계 업데이트 중...')" 
                  style="padding: 6px 12px; background: #48BB78; color: white; border: none; 
                         border-radius: 4px; cursor: pointer; font-size: 14px;">
            통계 업데이트
          </button>
        </div>
        
        <div v-if="actionLog.length > 0" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E2E8F0;">
          <h5 style="margin: 0 0 8px 0; color: #4A5568; font-size: 12px;">액션 로그</h5>
          <div v-for="log in actionLog" :key="log.id" style="font-size: 11px; color: #718096; margin-bottom: 4px;">
            {{ log.time }} - {{ log.message }}
          </div>
        </div>
      </div>
      
      <PMLoadingOverlay :visible="isLoading" />
    </div>
  `
})
