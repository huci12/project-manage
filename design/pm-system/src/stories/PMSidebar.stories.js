import PMSidebar from '@/components/layout/PMSidebar.vue'

export default {
  title: 'Layout/PMSidebar',
  component: PMSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '프로젝트 관리 시스템의 사이드바 네비게이션 컴포넌트입니다. 축소/확장 기능과 활성 상태 표시를 지원합니다.'
      }
    }
  },
  argTypes: {
    collapsed: {
      control: { type: 'boolean' },
      description: '사이드바 축소 상태'
    },
    activeItem: {
      control: { type: 'select' },
      options: ['dashboard', 'projects', 'teams', 'schedule', 'settings'],
      description: '현재 활성화된 네비게이션 항목'
    }
  }
}

const Template = (args) => ({
  components: { PMSidebar },
  setup() {
    return { args }
  },
  data() {
    return {
      isCollapsed: args.collapsed || false
    }
  },
  methods: {
    onNavClick(item) {
      console.log('Navigation clicked:', item)
    },
    onToggle(collapsed) {
      this.isCollapsed = collapsed
      console.log('Sidebar toggled:', collapsed)
    }
  },
  template: `
    <div style="height: 100vh; display: flex; position: relative;">
      <PMSidebar v-bind="args" :collapsed="isCollapsed" @nav-click="onNavClick" @toggle="onToggle" />
      <div :style="{
        flex: 1, 
        padding: '40px', 
        background: '#F0EFF7',
        marginLeft: isCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease'
      }">
        <h2 style="margin: 0 0 16px 0; color: #1A202C;">메인 콘텐츠 영역</h2>
        <p style="margin: 0; color: #718096;">
          사이드바의 토글 버튼을 클릭하거나 네비게이션을 클릭해보세요. 콘솔에서 이벤트를 확인할 수 있습니다.
        </p>
      </div>
    </div>
  `
})

export const Default = Template.bind({})
Default.args = {
  collapsed: false,
  activeItem: 'dashboard'
}

export const Collapsed = Template.bind({})
Collapsed.args = {
  collapsed: true,
  activeItem: 'dashboard'
}

export const ProjectsActive = Template.bind({})
ProjectsActive.args = {
  collapsed: false,
  activeItem: 'projects'
}

export const InteractiveDemo = () => ({
  components: { PMSidebar },
  data() {
    return {
      collapsed: false,
      activeItem: 'dashboard',
      lastClicked: null
    }
  },
  methods: {
    onNavClick(item) {
      this.activeItem = item.id
      this.lastClicked = item
      console.log('Navigation clicked:', item)
    },
    onToggle(collapsed) {
      this.collapsed = collapsed
      console.log('Sidebar toggled:', collapsed)
    }
  },
  template: `
    <div style="height: 100vh; display: flex; position: relative;">
      <PMSidebar 
        :collapsed="collapsed" 
        :active-item="activeItem"
        @nav-click="onNavClick" 
        @toggle="onToggle"
      />
      
      <div :style="{
        flex: 1, 
        padding: '40px', 
        background: '#F0EFF7',
        marginLeft: collapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease'
      }">
        <h2 style="margin: 0 0 24px 0; color: #1A202C;">인터랙티브 사이드바 데모</h2>
        
        <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
          <h3 style="margin: 0 0 12px 0; color: #1A202C;">현재 상태</h3>
          <p style="margin: 0 0 8px 0; color: #718096;">
            <strong>축소 상태:</strong> {{ collapsed ? '축소됨' : '확장됨' }}
          </p>
          <p style="margin: 0 0 8px 0; color: #718096;">
            <strong>활성 항목:</strong> {{ activeItem }}
          </p>
          <p style="margin: 0; color: #718096;">
            <strong>마지막 클릭:</strong> {{ lastClicked ? lastClicked.label : '없음' }}
          </p>
        </div>
        
        <div style="padding: 20px; background: white; border-radius: 12px; border: 1px solid #E2E8F0;">
          <h3 style="margin: 0 0 12px 0; color: #1A202C;">사용 방법</h3>
          <ul style="margin: 0; padding-left: 20px; color: #718096;">
            <li>사이드바 오른쪽의 파란색 토글 버튼을 클릭하여 사이드바를 접고 펼 수 있습니다.</li>
            <li>네비게이션 메뉴를 클릭하면 활성 상태가 변경됩니다.</li>
            <li>사이드바가 접힌 상태에서는 아이콘만 표시되며, 마우스를 올리면 툴팁이 나타납니다.</li>
          </ul>
        </div>
      </div>
    </div>
  `
})
