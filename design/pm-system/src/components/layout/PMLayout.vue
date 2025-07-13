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
      :class="{
        'pm-layout__main--sidebar-collapsed': sidebarCollapsed,
        'pm-layout__main--has-quickpanel': showQuickPanel,
        'pm-layout__main--quickpanel-collapsed': showQuickPanel && quickPanelCollapsed
      }"
    >
      <div class="pm-layout__content">
        <slot></slot>
      </div>
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
  min-width: 1440px; /* 전체 레이아웃 최소 너비 */
  overflow-x: auto;
}

.pm-layout__main {
  flex: 1;
  min-height: 100vh;
  transition: all 0.3s ease;
  position: relative;
  background-color: #F0EFF7;
  margin-left: 280px; /* 사이드바 너비 */
  margin-right: 0;
  min-width: 744px; /* 메인 콘텐츠 최소 너비 */
  overflow-x: hidden;
}

/* 사이드바 접힌 상태 */
.pm-layout__main--sidebar-collapsed {
  margin-left: 80px;
}

/* 퀵패널이 있을 때 */
.pm-layout__main--has-quickpanel {
  margin-right: 300px; /* 퀵패널 너비 */
}

/* 퀵패널 접힌 상태 */
.pm-layout__main--quickpanel-collapsed {
  margin-right: 60px; /* 접힌 퀵패널 너비 */
}

.pm-layout__content {
  padding: 0;
  min-width: 744px; /* 콘텐츠 최소 너비 보장 */
  overflow-x: auto;
}

/* 메인 콘텐츠 스크롤바 스타일 */
.pm-layout__content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.pm-layout__content::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.pm-layout__content::-webkit-scrollbar-thumb {
  background: #CBD5E0;
  border-radius: 4px;
}

.pm-layout__content::-webkit-scrollbar-thumb:hover {
  background: #A0AEC0;
}

/* 작은 화면에서도 최소 너비 유지 */
@media (max-width: 1600px) {
  .pm-layout {
    min-width: 1284px; /* 80px(접힌 사이드바) + 744px(콘텐츠) + 280px(퀵패널) */
  }
}

@media (max-width: 1280px) {
  .pm-layout {
    min-width: 1084px; /* 80px(접힌 사이드바) + 744px(콘텐츠) + 260px(퀵패널) */
  }
  
  /* 퀵패널이 있을 때 여유 공간 조정 */
  .pm-layout__main--has-quickpanel {
    margin-right: 260px;
  }
  
  .pm-layout__main--quickpanel-collapsed {
    margin-right: 60px;
  }
}

@media (max-width: 768px) {
  .pm-layout {
    min-width: 1064px; /* 80px(접힌 사이드바) + 744px(콘텐츠) + 240px(퀵패널) */
  }
  
  .pm-layout__main {
    margin-left: 80px; /* 모바일에서는 사이드바 기본 접힘 */
  }
  
  /* 모바일에서도 퀵패널 표시 */
  .pm-layout__main--has-quickpanel {
    margin-right: 240px;
  }
  
  .pm-layout__main--quickpanel-collapsed {
    margin-right: 60px;
  }
}
</style>
