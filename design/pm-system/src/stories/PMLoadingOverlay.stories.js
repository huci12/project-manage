import PMLoadingOverlay from '@/components/UI/PMLoadingOverlay.vue'

export default {
  title: 'UI/PMLoadingOverlay',
  component: PMLoadingOverlay,
  parameters: {
    docs: {
      description: {
        component: '전체 화면을 덮는 로딩 오버레이 컴포넌트입니다. 데이터 로딩 중 사용자 인터랙션을 차단하고 로딩 상태를 표시합니다.'
      }
    }
  },
  argTypes: {
    visible: {
      control: { type: 'boolean' },
      description: '로딩 오버레이 표시 여부'
    },
    text: {
      control: { type: 'text' },
      description: '로딩 메시지 텍스트'
    }
  }
}

const Template = (args) => ({
  components: { PMLoadingOverlay },
  setup() {
    return { args }
  },
  template: `
    <div style="position: relative; height: 400px; background: #F0EFF7; padding: 24px; border-radius: 8px;">
      <h2 style="margin: 0 0 16px 0; color: #2D3748;">페이지 콘텐츠</h2>
      <p style="color: #718096; line-height: 1.6;">
        로딩 오버레이가 표시되면 이 콘텐츠는 반투명 배경으로 가려지고 클릭할 수 없게 됩니다.
      </p>
      <button style="margin-top: 16px; padding: 8px 16px; background: #667EEA; color: white; border: none; border-radius: 6px; cursor: pointer;">
        클릭 불가능한 버튼
      </button>
      
      <PMLoadingOverlay v-bind="args" />
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  visible: true,
  text: '데이터를 불러오는 중...'
}

export const Hidden = Template.bind({})
Hidden.args = {
  visible: false,
  text: '데이터를 불러오는 중...'
}

export const CustomText = Template.bind({})
CustomText.args = {
  visible: true,
  text: '프로젝트를 생성하는 중...'
}

// 인터랙티브 데모
export const InteractiveDemo = () => ({
  components: { PMLoadingOverlay },
  data() {
    return {
      isLoading: false,
      loadingText: '데이터를 불러오는 중...',
      customText: ''
    }
  },
  methods: {
    startLoading(text) {
      this.loadingText = text || this.customText || '데이터를 불러오는 중...'
      this.isLoading = true
      
      // 3초 후 자동으로 로딩 종료
      setTimeout(() => {
        this.isLoading = false
      }, 3000)
    }
  },
  template: `
    <div>
      <div style="padding: 24px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="margin: 0 0 24px 0; color: #2D3748;">로딩 오버레이 테스트</h2>
        
        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #4A5568; font-size: 16px;">빠른 실행</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button 
              @click="startLoading('데이터를 불러오는 중...')"
              style="padding: 8px 16px; background: #667EEA; color: white; border: none; border-radius: 6px; cursor: pointer;">
              데이터 로딩
            </button>
            <button 
              @click="startLoading('저장하는 중...')"
              style="padding: 8px 16px; background: #48BB78; color: white; border: none; border-radius: 6px; cursor: pointer;">
              저장하기
            </button>
            <button 
              @click="startLoading('파일을 업로드하는 중...')"
              style="padding: 8px 16px; background: #ED8936; color: white; border: none; border-radius: 6px; cursor: pointer;">
              파일 업로드
            </button>
            <button 
              @click="startLoading('삭제하는 중...')"
              style="padding: 8px 16px; background: #F56565; color: white; border: none; border-radius: 6px; cursor: pointer;">
              삭제하기
            </button>
          </div>
        </div>
        
        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; color: #4A5568; font-size: 16px;">커스텀 텍스트</h3>
          <div style="display: flex; gap: 8px;">
            <input 
              v-model="customText"
              type="text"
              placeholder="로딩 메시지를 입력하세요"
              style="flex: 1; padding: 8px 12px; border: 1px solid #E2E8F0; border-radius: 6px; font-size: 14px;"
            >
            <button 
              @click="startLoading()"
              :disabled="!customText"
              style="padding: 8px 16px; background: #667EEA; color: white; border: none; border-radius: 6px; cursor: pointer; opacity: 1;"
              :style="{ opacity: customText ? 1 : 0.5, cursor: customText ? 'pointer' : 'not-allowed' }">
              실행
            </button>
          </div>
        </div>
        
        <div style="padding: 16px; background: #F7FAFC; border-radius: 6px;">
          <p style="margin: 0 0 8px 0; color: #4A5568; font-size: 14px;">
            <strong>현재 상태:</strong> {{ isLoading ? '로딩 중' : '대기 중' }}
          </p>
          <p style="margin: 0; color: #718096; font-size: 13px;">
            로딩이 시작되면 3초 후 자동으로 종료됩니다.
          </p>
        </div>
      </div>
      
      <PMLoadingOverlay :visible="isLoading" :text="loadingText" />
    </div>
  `
})

// 다양한 상황 예시
export const MultipleScenarios = () => ({
  components: { PMLoadingOverlay },
  data() {
    return {
      scenarios: [
        { id: 1, text: '프로젝트 목록을 불러오는 중...', duration: 2000 },
        { id: 2, text: '대용량 파일을 처리하는 중...', duration: 5000 },
        { id: 3, text: '데이터를 분석하는 중...', duration: 3000 },
        { id: 4, text: '보고서를 생성하는 중...', duration: 4000 }
      ],
      currentScenario: null,
      isLoading: false
    }
  },
  methods: {
    runScenario(scenario) {
      this.currentScenario = scenario
      this.isLoading = true
      
      setTimeout(() => {
        this.isLoading = false
        this.currentScenario = null
      }, scenario.duration)
    }
  },
  template: `
    <div style="padding: 24px;">
      <h2 style="margin: 0 0 24px 0; color: #2D3748;">다양한 로딩 시나리오</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
        <div v-for="scenario in scenarios" :key="scenario.id"
             style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 8px 0; color: #2D3748; font-size: 16px;">
            시나리오 {{ scenario.id }}
          </h3>
          <p style="margin: 0 0 12px 0; color: #718096; font-size: 14px;">
            {{ scenario.text }}
          </p>
          <p style="margin: 0 0 16px 0; color: #A0AEC0; font-size: 13px;">
            소요 시간: {{ scenario.duration / 1000 }}초
          </p>
          <button 
            @click="runScenario(scenario)"
            :disabled="isLoading"
            style="padding: 8px 16px; background: #667EEA; color: white; border: none; border-radius: 6px; cursor: pointer; width: 100%;"
            :style="{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }">
            {{ isLoading && currentScenario?.id === scenario.id ? '실행 중...' : '실행' }}
          </button>
        </div>
      </div>
      
      <PMLoadingOverlay 
        :visible="isLoading" 
        :text="currentScenario?.text || '처리 중...'" 
      />
    </div>
  `
})
