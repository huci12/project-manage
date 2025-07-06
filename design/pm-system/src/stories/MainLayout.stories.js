import MainLayout from '@/layouts/MainLayout.vue'
import DashboardPage from '@/pages/DashboardPage.vue'

export default {
  title: 'Layout/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 관리 시스템의 메인 레이아웃입니다. 사이드바와 메인 콘텐츠 영역을 포함합니다.'
      }
    }
  }
}

// 모킹된 라우터 객체
const mockRouter = {
  push: (path) => console.log('Navigate to:', path),
  currentRoute: {
    value: {
      name: 'Dashboard',
      path: '/dashboard'
    }
  }
}

// provide/inject를 사용하는 래퍼 컴포넌트
const RouterWrapper = {
  props: ['route', 'router'],
  provide() {
    return {
      $route: this.route || mockRouter.currentRoute.value,
      $router: this.router || mockRouter
    }
  },
  render() {
    return this.$slots.default()
  }
}

export const WithDashboard = () => ({
  components: { MainLayout, DashboardPage, RouterWrapper },
  setup() {
    return {
      mockRouter,
      mockRoute: mockRouter.currentRoute.value
    }
  },
  template: `
    <RouterWrapper :router="mockRouter" :route="mockRoute">
      <div style="height: 100vh;">
        <MainLayout>
          <template #default>
            <DashboardPage />
          </template>
        </MainLayout>
      </div>
    </RouterWrapper>
  `
})

export const SidebarCollapsed = () => ({
  components: { MainLayout, RouterWrapper },
  setup() {
    return {
      mockRouter,
      mockRoute: mockRouter.currentRoute.value
    }
  },
  template: `
    <RouterWrapper :router="mockRouter" :route="mockRoute">
      <div style="height: 100vh;">
        <MainLayout>
          <template #default>
            <div style="padding: 24px;">
              <h1 style="margin: 0 0 16px 0; color: #1A202C;">사이드바 축소된 상태</h1>
              <p style="margin: 0; color: #718096;">
                데스크톱에서는 사이드바 토글 버튼을 클릭하여 축소/확장할 수 있습니다.
                모바일에서는 햄버거 메뉴를 통해 사이드바를 열고 닫을 수 있습니다.
              </p>
            </div>
          </template>
        </MainLayout>
      </div>
    </RouterWrapper>
  `
})

export const MobileView = () => ({
  components: { MainLayout, RouterWrapper },
  setup() {
    return {
      mockRouter,
      mockRoute: mockRouter.currentRoute.value
    }
  },
  template: `
    <RouterWrapper :router="mockRouter" :route="mockRoute">
      <div style="height: 100vh; max-width: 375px; margin: 0 auto; border: 1px solid #E2E8F0;">
        <MainLayout>
          <template #default>
            <div style="padding: 16px;">
              <h1 style="margin: 0 0 16px 0; color: #1A202C; font-size: 20px;">모바일 뷰</h1>
              <p style="margin: 0; color: #718096; font-size: 14px; line-height: 1.6;">
                모바일 화면에서는 사이드바가 숨겨지고 상단에 헤더가 표시됩니다.
                햄버거 메뉴를 클릭하면 사이드바가 오버레이로 나타납니다.
              </p>
              
              <div style="margin: 24px 0; padding: 16px; background: #F8FAFC; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #1A202C; font-size: 16px;">모바일 특징</h3>
                <ul style="margin: 0; padding-left: 20px; color: #718096; font-size: 14px;">
                  <li>상단 모바일 헤더 표시</li>
                  <li>사이드바 오버레이 모드</li>
                  <li>터치 친화적 인터페이스</li>
                </ul>
              </div>
            </div>
          </template>
        </MainLayout>
      </div>
    </RouterWrapper>
  `
})

export const NavigationDemo = () => ({
  components: { MainLayout, RouterWrapper },
  setup() {
    return {
      mockRouter,
      mockRoute: mockRouter.currentRoute.value
    }
  },
  data() {
    return {
      currentPage: 'dashboard',
      pages: {
        dashboard: {
          title: '대시보드',
          content: '프로젝트 현황과 주요 지표를 확인할 수 있는 대시보드입니다.'
        },
        projects: {
          title: '프로젝트',
          content: '진행 중인 프로젝트 목록과 상세 정보를 관리합니다.'
        },
        teams: {
          title: '팀 관리',
          content: '팀 구성원과 역할을 관리하는 페이지입니다.'
        },
        schedule: {
          title: '일정 관리',
          content: '프로젝트 일정과 마일스톤을 관리합니다.'
        },
        settings: {
          title: '설정',
          content: '시스템 설정과 사용자 환경설정을 관리합니다.'
        }
      }
    }
  },
  methods: {
    handleNavigation(item) {
      this.currentPage = item.id
      console.log('Page changed to:', item.id)
    }
  },
  template: `
    <RouterWrapper :router="mockRouter" :route="mockRoute">
      <div style="height: 100vh;">
        <MainLayout @nav-click="handleNavigation">
          <template #default>
            <div style="padding: 24px;">
              <h1 style="margin: 0 0 16px 0; color: #1A202C;">
                {{ pages[currentPage].title }}
              </h1>
              <p style="margin: 0 0 24px 0; color: #718096;">
                {{ pages[currentPage].content }}
              </p>
              
              <div style="padding: 20px; background: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0;">
                <h3 style="margin: 0 0 12px 0; color: #1A202C;">네비게이션 테스트</h3>
                <p style="margin: 0; color: #718096; font-size: 14px;">
                  사이드바의 메뉴 항목을 클릭하여 페이지 전환을 테스트해보세요.
                  현재 선택된 페이지: <strong>{{ currentPage }}</strong>
                </p>
              </div>
            </div>
          </template>
        </MainLayout>
      </div>
    </RouterWrapper>
  `
})

export const ResponsiveTest = () => ({
  components: { MainLayout, RouterWrapper },
  setup() {
    return {
      mockRouter,
      mockRoute: mockRouter.currentRoute.value
    }
  },
  template: `
    <RouterWrapper :router="mockRouter" :route="mockRoute">
      <div style="height: 100vh;">
        <MainLayout>
          <template #default>
            <div style="padding: 24px;">
              <h1 style="margin: 0 0 24px 0; color: #1A202C;">반응형 레이아웃 테스트</h1>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                <div style="padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <h3 style="margin: 0 0 12px 0; color: #1A202C;">데스크톱 (>768px)</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #718096; font-size: 14px;">
                    <li>고정 사이드바 (280px)</li>
                    <li>축소 가능 (80px)</li>
                    <li>메인 콘텐츠 여백 자동 조정</li>
                  </ul>
                </div>
                
                <div style="padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <h3 style="margin: 0 0 12px 0; color: #1A202C;">모바일 (<768px)</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #718096; font-size: 14px;">
                    <li>숨겨진 사이드바</li>
                    <li>모바일 헤더 표시</li>
                    <li>오버레이 네비게이션</li>
                  </ul>
                </div>
                
                <div style="padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
                  <h3 style="margin: 0 0 12px 0; color: #1A202C;">터치 최적화</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #718096; font-size: 14px;">
                    <li>최소 44px 터치 타겟</li>
                    <li>스와이프 친화적</li>
                    <li>접근성 고려</li>
                  </ul>
                </div>
              </div>
              
              <div style="margin-top: 24px; padding: 16px; background: #FEF3C7; border: 1px solid #F59E0B; border-radius: 8px;">
                <p style="margin: 0; color: #92400E; font-size: 14px;">
                  💡 브라우저 창 크기를 조절해보면서 반응형 동작을 확인해보세요!
                </p>
              </div>
            </div>
          </template>
        </MainLayout>
      </div>
    </RouterWrapper>
  `
})
