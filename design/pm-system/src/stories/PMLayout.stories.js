import PMLayout from '@/components/layout/PMLayout.vue'

export default {
  title: 'Layout/PMLayout',
  component: PMLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '사이드바와 메인 콘텐츠 영역을 포함한 전체 레이아웃 컴포넌트입니다. 사이드바가 축소/확장될 때 메인 콘텐츠 영역이 자동으로 조정됩니다.'
      }
    }
  },
  argTypes: {
    activeItem: {
      control: { type: 'select' },
      options: ['dashboard', 'projects', 'teams', 'schedule', 'settings'],
      description: '현재 활성화된 네비게이션 항목'
    }
  }
}

const Template = (args) => ({
  components: { PMLayout },
  setup() {
    return { args }
  },
  methods: {
    onNavClick(item) {
      console.log('Navigation clicked:', item)
    },
    onSidebarToggle(collapsed) {
      console.log('Sidebar toggled:', collapsed)
    },
    onQuickPanelToggle(collapsed) {
      console.log('Quick panel toggled:', collapsed)
    },
    onCreateProject() {
      console.log('Create project clicked')
    },
    onInviteTeam() {
      console.log('Invite team clicked')
    },
    onLogout() {
      console.log('Logout clicked')
    }
  },
  template: `
    <PMLayout 
      v-bind="args" 
      @nav-click="onNavClick" 
      @sidebar-toggle="onSidebarToggle"
      @quick-panel-toggle="onQuickPanelToggle"
      @create-project="onCreateProject"
      @invite-team="onInviteTeam"
      @logout="onLogout"
    >
      <div style="padding: 40px;">
        <h1 style="margin: 0 0 24px 0; color: #1A202C;">대시보드</h1>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; margin-bottom: 32px;">
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 8px 0; color: #2D3748;">전체 프로젝트</h3>
            <p style="margin: 0; font-size: 32px; font-weight: 700; color: #667EEA;">12개</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 8px 0; color: #2D3748;">진행 중</h3>
            <p style="margin: 0; font-size: 32px; font-weight: 700; color: #48BB78;">8개</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 8px 0; color: #2D3748;">완료된 작업</h3>
            <p style="margin: 0; font-size: 32px; font-weight: 700; color: #F6AD55;">156개</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 8px 0; color: #2D3748;">팀 멤버</h3>
            <p style="margin: 0; font-size: 32px; font-weight: 700; color: #9F7AEA;">24명</p>
          </div>
        </div>
        
        <div style="background: white; padding: 32px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <h2 style="margin: 0 0 16px 0; color: #1A202C;">최근 활동</h2>
          <p style="margin: 0; color: #718096; line-height: 1.6;">
            좌측 사이드바와 우측 빠른 작업 패널의 토글 버튼을 클릭하여 화면을 넓게 사용해보세요. 
            메인 콘텐츠 영역이 자동으로 조정됩니다.
          </p>
        </div>
      </div>
    </PMLayout>
  `
})

export const Default = Template.bind({})
Default.args = {
  activeItem: 'dashboard',
  showQuickPanel: true
}

export const WithoutQuickPanel = Template.bind({})
WithoutQuickPanel.args = {
  activeItem: 'dashboard',
  showQuickPanel: false
}

// 프로젝트 페이지 예시
export const ProjectsPage = () => ({
  components: { PMLayout },
  template: `
    <PMLayout active-item="projects" :show-quick-panel="true">
      <div style="padding: 40px;">
        <h1 style="margin: 0 0 24px 0; color: #1A202C;">프로젝트</h1>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
          <div v-for="i in 6" :key="i" 
               style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; margin-bottom: 16px;">
              <div style="width: 48px; height: 48px; background: #667EEA; border-radius: 8px; margin-right: 16px;"></div>
              <div>
                <h3 style="margin: 0; color: #2D3748;">프로젝트 {{ i }}</h3>
                <p style="margin: 0; color: #718096; font-size: 14px;">진행 중</p>
              </div>
            </div>
            <div style="background: #F7FAFC; height: 8px; border-radius: 4px; overflow: hidden;">
              <div :style="{
                width: (i * 15) + '%',
                height: '100%',
                background: '#667EEA',
                transition: 'width 0.3s ease'
              }"></div>
            </div>
            <p style="margin: 12px 0 0 0; color: #718096; font-size: 14px;">
              진행률: {{ i * 15 }}%
            </p>
          </div>
        </div>
      </div>
    </PMLayout>
  `
})

// 반응형 데모
export const ResponsiveDemo = () => ({
  components: { PMLayout },
  data() {
    return {
      activeItem: 'dashboard',
      isCollapsed: false,
      currentView: 'desktop'
    }
  },
  methods: {
    handleNavClick(item) {
      this.activeItem = item.id
    },
    handleSidebarToggle(collapsed) {
      this.isCollapsed = collapsed
    },
    switchView(view) {
      this.currentView = view
    }
  },
  template: `
    <div style="position: relative; width: 100%; min-height: 100vh;">
      <!-- 뷰 전환 컨트롤 -->
      <div style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%); z-index: 1001; background: white; padding: 12px 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="display: flex; gap: 12px; align-items: center;">
          <span style="font-size: 14px; color: #4A5568; font-weight: 500;">뷰:</span>
          <button 
            @click="switchView('desktop')" 
            :style="{
              padding: '6px 12px',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              background: currentView === 'desktop' ? '#667EEA' : '#FFFFFF',
              color: currentView === 'desktop' ? '#FFFFFF' : '#4A5568',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500'
            }"
          >
            데스크톱
          </button>
          <button 
            @click="switchView('tablet')" 
            :style="{
              padding: '6px 12px',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              background: currentView === 'tablet' ? '#667EEA' : '#FFFFFF',
              color: currentView === 'tablet' ? '#FFFFFF' : '#4A5568',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500'
            }"
          >
            태블릿
          </button>
        </div>
      </div>
      
      <!-- 레이아웃 컨테이너 -->
      <div :style="{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        transform: currentView === 'tablet' ? 'scale(0.75)' : 'scale(1)',
        transformOrigin: 'center center',
        transition: 'transform 0.3s ease'
      }">
        <PMLayout 
          :active-item="activeItem" 
          :show-quick-panel="currentView === 'desktop'"
          @nav-click="handleNavClick"
          @sidebar-toggle="handleSidebarToggle"
          @logout="onLogout"
        >
          <div style="padding: 40px; height: 100vh; overflow-y: auto;">
            <!-- 상태 표시 -->
            <div style="background: rgba(102, 126, 234, 0.1); padding: 16px; border-radius: 8px; margin-bottom: 24px; border-left: 4px solid #667EEA;">
              <h2 style="margin: 0 0 8px 0; color: #2D3748; font-size: 18px;">
                {{ currentView === 'desktop' ? '데스크톱 레이아웃' : '태블릿 레이아웃' }}
              </h2>
              <p style="margin: 0; color: #4A5568; font-size: 14px;">
                활성 메뉴: <strong>{{ activeItem }}</strong> | 
                사이드바: <strong>{{ isCollapsed ? '축소됨' : '확장됨' }}</strong> |
                퀵패널: <strong>{{ currentView === 'desktop' ? '표시됨' : '숨김' }}</strong>
              </p>
            </div>
            
            <!-- 메인 콘텐츠 -->
            <h1 style="margin: 0 0 24px 0; color: #1A202C; font-size: 28px;">
              {{ currentView === 'desktop' ? '데스크톱 대시보드' : '태블릿 대시보드' }}
            </h1>
            
            <!-- 통계 카드들 -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
              <div v-for="(stat, index) in stats" :key="index"
                   style="background: white; padding: 24px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <div :style="{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }">
                    <div style="width: 20px; height: 20px; background: white; border-radius: 4px; opacity: 0.9;"></div>
                  </div>
                  <h3 style="margin: 0; color: #2D3748; font-size: 14px; font-weight: 600;">{{ stat.title }}</h3>
                </div>
                <p style="margin: 0; font-size: 24px; font-weight: 700; color: #1A202C;">{{ stat.value }}</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #718096;">{{ stat.change }}</p>
              </div>
            </div>
            
            <!-- 프로젝트 목록 -->
            <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); border: 1px solid #E2E8F0;">
              <h2 style="margin: 0 0 20px 0; color: #1A202C; font-size: 20px;">최근 프로젝트</h2>
              <div style="display: grid; gap: 16px;">
                <div v-for="project in projects" :key="project.id"
                     style="display: flex; align-items: center; padding: 16px; background: #F7FAFC; border-radius: 8px; border: 1px solid #E2E8F0;">
                  <div :style="{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: project.color,
                    marginRight: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }">
                    <div style="width: 24px; height: 24px; background: white; border-radius: 4px; opacity: 0.9;"></div>
                  </div>
                  <div style="flex: 1;">
                    <h4 style="margin: 0 0 4px 0; color: #2D3748; font-size: 16px; font-weight: 600;">{{ project.name }}</h4>
                    <p style="margin: 0 0 8px 0; color: #718096; font-size: 14px;">{{ project.description }}</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="flex: 1; height: 6px; background: #E2E8F0; border-radius: 3px; overflow: hidden;">
                        <div :style="{
                          width: project.progress + '%',
                          height: '100%',
                          background: project.color,
                          transition: 'width 0.3s ease'
                        }"></div>
                      </div>
                      <span style="font-size: 12px; color: #718096; font-weight: 500;">{{ project.progress }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 레이아웃 정보 -->
            <div style="margin-top: 32px; padding: 20px; background: #F0FFF4; border-radius: 8px; border: 1px solid #9AE6B4;">
              <h3 style="margin: 0 0 12px 0; color: #22543D; font-size: 16px;">💡 레이아웃 팁</h3>
              <ul style="margin: 0; padding-left: 20px; color: #22543D; line-height: 1.6; font-size: 14px;">
                <li v-if="currentView === 'desktop'">사이드바 토글 버튼으로 더 넓은 작업 공간을 확보하세요</li>
                <li v-if="currentView === 'desktop'">퀵패널의 토글 버튼으로 빠른 작업 영역을 숨길 수 있습니다</li>
                <li v-if="currentView === 'desktop'">메인 콘텐츠의 스크롤바는 퀵패널 왼쪽에 위치합니다</li>
                <li v-if="currentView === 'tablet'">태블릿 뷰에서는 퀵패널이 자동으로 숨겨집니다</li>
                <li>반응형 디자인으로 다양한 화면 크기에 최적화되어 있습니다</li>
              </ul>
            </div>
          </div>
        </PMLayout>
      </div>
    </div>
  `,
  computed: {
    stats() {
      return [
        { title: '전체 프로젝트', value: '12개', change: '+2 이번 달', color: '#667EEA' },
        { title: '진행 중', value: '8개', change: '+1 이번 주', color: '#48BB78' },
        { title: '완료된 작업', value: '156개', change: '+12 오늘', color: '#F6AD55' },
        { title: '팀 멤버', value: '24명', change: '+3 이번 달', color: '#9F7AEA' }
      ]
    },
    projects() {
      return [
        { id: 1, name: '웹사이트 리뉴얼', description: 'UI/UX 개선 및 반응형 디자인 적용', progress: 75, color: '#667EEA' },
        { id: 2, name: '모바일 앱 개발', description: '크로스 플랫폼 앱 개발 프로젝트', progress: 45, color: '#48BB78' },
        { id: 3, name: 'API 서버 구축', description: 'RESTful API 및 데이터베이스 설계', progress: 90, color: '#F6AD55' },
        { id: 4, name: '관리자 대시보드', description: '통계 및 관리 기능 구현', progress: 30, color: '#9F7AEA' }
      ]
    }
  }
})
