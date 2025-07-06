<template>
  <div class="pm-layout">
    <!-- 사이드바 -->
    <PMSidebar 
      :collapsed="sidebarCollapsed" 
      :active-item="activeItem"
      @nav-click="handleNavClick"
      @toggle="handleSidebarToggle"
      @logout="handleLogout"
    />
    
    <!-- 메인 콘텐츠 영역 -->
    <main 
      class="pm-layout__main" 
      :style="mainStyle"
    >
      <slot></slot>
    </main>
    
    <!-- 빠른 작업 패널 -->
    <PMQuickPanel
      v-if="showQuickPanel"
      :collapsed="quickPanelCollapsed"
      @toggle="handleQuickPanelToggle"
      @create-project="handleCreateProject"
      @invite-team="handleInviteTeam"
    />
  </div>
</template>

<script>
import PMSidebar from './PMSidebar.vue'
import PMQuickPanel from './PMQuickPanel.vue'

export default {
  name: 'PMLayout',
  components: {
    PMSidebar,
    PMQuickPanel
  },
  props: {
    activeItem: {
      type: String,
      default: 'dashboard'
    },
    showQuickPanel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      sidebarCollapsed: false,
      quickPanelCollapsed: false
    }
  },
  computed: {
    mainStyle() {
      const leftMargin = this.sidebarCollapsed ? '80px' : '280px'
      
      // 퀵패널이 있을 때 적당한 간격을 두고 paddingRight 사용
      if (this.showQuickPanel) {
        const quickPanelWidth = this.quickPanelCollapsed ? 60 : 300
        const baseGap = 16 // 기본 간격
        const minMargin = 10 // 최소 마진 10px
        const totalRightSpace = quickPanelWidth + baseGap + minMargin
        
        return {
          marginLeft: leftMargin,
          paddingRight: `${quickPanelWidth + baseGap}px`,
          minWidth: `${minMargin}px` // 최소 너비 보장
        }
      } else {
        return {
          marginLeft: leftMargin,
          paddingRight: '16px' // 퀵패널이 없을 때도 약간의 여백
        }
      }
    }
  },
  methods: {
    handleNavClick(item) {
      this.$emit('nav-click', item)
    },
    handleSidebarToggle(collapsed) {
      this.sidebarCollapsed = collapsed
      this.$emit('sidebar-toggle', collapsed)
    },
    handleQuickPanelToggle(collapsed) {
      this.quickPanelCollapsed = collapsed
      this.$emit('quick-panel-toggle', collapsed)
    },
    handleCreateProject() {
      this.$emit('create-project')
    },
    handleInviteTeam() {
      this.$emit('invite-team')
    },
    handleLogout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
.pm-layout {
  display: flex;
  min-height: 100vh;
  background-color: #F0EFF7;
  position: relative;
}

.pm-layout__main {
  flex: 1;
  min-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: margin 0.3s ease;
  position: relative;
  background-color: #F0EFF7;
}

/* 메인 콘텐츠 스크롤바 스타일 - 퀵패널 바로 왼쪽에 위치 */
.pm-layout__main {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 transparent;
}

.pm-layout__main::-webkit-scrollbar {
  width: 8px;
  background-color: transparent;
}

.pm-layout__main::-webkit-scrollbar-track {
  background: transparent;
}

.pm-layout__main::-webkit-scrollbar-thumb {
  background: #CBD5E0;
  border-radius: 4px;
}

.pm-layout__main::-webkit-scrollbar-thumb:hover {
  background: #A0AEC0;
}

/* 반응형 처리 */
@media (max-width: 1600px) {
  .pm-layout__main {
    padding-right: max(16px, calc(250px + 26px)) !important; /* 퀵패널 너비 + 기본 간격 + 최소 마진 */
  }
}

@media (max-width: 768px) {
  .pm-layout__main {
    margin-left: 0 !important;
    padding-right: max(16px, calc(240px + 26px)) !important; /* 모바일에서는 퀵패널이 240px */
    min-width: 10px !important; /* 최소 10px 너비 보장 */
  }
}

@media (max-width: 480px) {
  .pm-layout__main {
    padding-right: max(16px, calc(200px + 26px)) !important; /* 더 작은 화면에서는 퀵패널 더 축소 */
  }
}
</style>
