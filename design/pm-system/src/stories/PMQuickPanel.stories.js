import PMQuickPanel from '@/components/layout/PMQuickPanel.vue'

export default {
  title: 'Layout/PMQuickPanel',
  component: PMQuickPanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '빠른 작업과 최근 활동을 표시하는 우측 패널 컴포넌트입니다. 축소/확장 기능을 제공합니다.'
      }
    }
  },
  argTypes: {
    collapsed: {
      control: { type: 'boolean' },
      description: '패널 축소 상태'
    }
  }
}

const Template = (args) => ({
  components: { PMQuickPanel },
  setup() {
    return { args }
  },
  data() {
    return {
      isCollapsed: args.collapsed || false
    }
  },
  methods: {
    onToggle(collapsed) {
      this.isCollapsed = collapsed
      console.log('Panel toggled:', collapsed)
    },
    onCreateProject() {
      console.log('Create project clicked')
    },
    onInviteTeam() {
      console.log('Invite team clicked')
    }
  },
  template: `
    <div style="height: 100vh; display: flex; position: relative; background: #F0EFF7;">
      <div :style="{
        flex: 1, 
        padding: '40px', 
        marginRight: isCollapsed ? '80px' : '320px',
        transition: 'margin-right 0.3s ease'
      }">
        <h2 style="margin: 0 0 16px 0; color: #1A202C;">메인 콘텐츠 영역</h2>
        <p style="margin: 0 0 24px 0; color: #718096;">
          우측의 토글 버튼을 클릭하여 빠른 작업 패널을 접고 펼 수 있습니다.
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
          <div v-for="i in 6" :key="i" 
               style="background: white; padding: 24px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 8px 0; color: #2D3748;">카드 {{ i }}</h3>
            <p style="margin: 0; color: #718096;">콘텐츠 영역이 패널 상태에 따라 자동으로 조정됩니다.</p>
          </div>
        </div>
      </div>
      
      <PMQuickPanel 
        :collapsed="isCollapsed" 
        @toggle="onToggle"
        @create-project="onCreateProject"
        @invite-team="onInviteTeam"
      />
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  collapsed: false
}

export const Collapsed = Template.bind({})
Collapsed.args = {
  collapsed: true
}

// Default 스토리 초기 상태 설정
Default.parameters = {
  docs: {
    description: {
      story: '빠른 작업 패널이 확장된 상태입니다.'
    }
  }
}

// Collapsed 스토리 초기 상태 설정
Collapsed.parameters = {
  docs: {
    description: {
      story: '빠른 작업 패널이 축소된 상태입니다. 아이콘만 표시됩니다.'
    }
  }
}

// 인터랙티브 데모
export const InteractiveDemo = () => ({
  components: { PMQuickPanel },
  data() {
    return {
      collapsed: false,
      actionLog: []
    }
  },
  methods: {
    handleToggle(collapsed) {
      this.collapsed = collapsed
      this.addLog(`패널 ${collapsed ? '축소됨' : '확장됨'}`)
    },
    handleCreateProject() {
      this.addLog('새 프로젝트 생성 클릭')
    },
    handleInviteTeam() {
      this.addLog('팀원 초대하기 클릭')
    },
    addLog(message) {
      this.actionLog.unshift({
        id: Date.now(),
        message,
        time: new Date().toLocaleTimeString('ko-KR')
      })
      if (this.actionLog.length > 10) {
        this.actionLog.pop()
      }
    }
  },
  template: `
    <div style="height: 100vh; display: flex; position: relative; background: #F0EFF7;">
      <div :style="{
        flex: 1, 
        padding: '40px', 
        marginRight: collapsed ? '80px' : '320px',
        transition: 'margin-right 0.3s ease'
      }">
        <h2 style="margin: 0 0 24px 0; color: #1A202C;">빠른 작업 패널 데모</h2>
        
        <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 16px 0; color: #2D3748;">상태 정보</h3>
          <p style="margin: 0 0 8px 0; color: #718096;">
            <strong>패널 상태:</strong> {{ collapsed ? '축소됨' : '확장됨' }}
          </p>
          <p style="margin: 0; color: #718096;">
            <strong>사용 가능 공간:</strong> 패널이 {{ collapsed ? '축소되어' : '확장되어' }} 메인 콘텐츠 영역이 {{ collapsed ? '넓어졌습니다' : '좁아졌습니다' }}.
          </p>
        </div>
        
        <div style="margin-top: 24px; background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h3 style="margin: 0 0 16px 0; color: #2D3748;">액션 로그</h3>
          <div v-if="actionLog.length === 0" style="color: #A0AEC0;">
            아직 액션이 없습니다. 우측 패널을 사용해보세요.
          </div>
          <div v-else>
            <div v-for="log in actionLog" :key="log.id" 
                 style="padding: 8px 0; border-bottom: 1px solid #E2E8F0;">
              <span style="color: #2D3748;">{{ log.message }}</span>
              <span style="color: #A0AEC0; font-size: 12px; margin-left: 8px;">{{ log.time }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <PMQuickPanel 
        :collapsed="collapsed"
        @toggle="handleToggle"
        @create-project="handleCreateProject"
        @invite-team="handleInviteTeam"
      />
    </div>
  `
})
