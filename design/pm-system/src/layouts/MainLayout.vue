<template>
  <div class="main-layout" :class="{ 'main-layout--sidebar-collapsed': sidebarCollapsed }">
    <!-- 사이드바 -->
    <PMSidebar 
      :collapsed="sidebarCollapsed"
      :active-item="activeNavItem"
      @nav-click="handleNavClick"
      class="main-sidebar"
    />

    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 상단 헤더 (모바일용) -->
      <header class="mobile-header">
        <button 
          class="sidebar-toggle"
          @click="toggleSidebar"
          :aria-label="sidebarCollapsed ? '사이드바 열기' : '사이드바 닫기'"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>

        <div class="mobile-logo">
          <span class="logo-text">PM System</span>
        </div>

        <div class="mobile-user">
          <div class="user-avatar">
            <span class="avatar-text">김</span>
          </div>
        </div>
      </header>

      <!-- 페이지 콘텐츠 -->
      <main class="page-content">
        <slot>
          <router-view v-if="$route" />
        </slot>
      </main>
    </div>

    <!-- 모바일 사이드바 오버레이 -->
    <div 
      v-if="sidebarOpen && isMobile"
      class="sidebar-overlay"
      @click="closeSidebar"
    ></div>
  </div>
</template>

<script>
import PMSidebar from '@/components/layout/PMSidebar.vue'

export default {
  name: 'MainLayout',
  components: {
    PMSidebar
  },
  data() {
    return {
      sidebarCollapsed: false,
      sidebarOpen: false,
      isMobile: false
    }
  },
  computed: {
    activeNavItem() {
      if (!this.$route) return 'dashboard'
      
      const routeName = this.$route.name
      const routeMapping = {
        'Dashboard': 'dashboard',
        'Projects': 'projects',
        'ProjectDetail': 'projects',
        'Teams': 'teams',
        'TeamDetail': 'teams',
        'Schedule': 'schedule',
        'Settings': 'settings'
      }
      return routeMapping[routeName] || 'dashboard'
    }
  },
  mounted() {
    this.checkScreenSize()
    window.addEventListener('resize', this.checkScreenSize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize)
  },
  methods: {
    checkScreenSize() {
      this.isMobile = window.innerWidth < 768
      if (this.isMobile) {
        this.sidebarCollapsed = true
        this.sidebarOpen = false
      } else {
        this.sidebarOpen = true
      }
    },

    toggleSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = !this.sidebarOpen
      } else {
        this.sidebarCollapsed = !this.sidebarCollapsed
      }
    },

    closeSidebar() {
      if (this.isMobile) {
        this.sidebarOpen = false
      }
    },

    handleNavClick(item) {
      console.log('Navigation clicked:', item)
      
      // 모바일에서는 네비게이션 클릭 시 사이드바 닫기
      if (this.isMobile) {
        this.sidebarOpen = false
      }

      // 라우터 이동
      if (this.$router && item.href !== this.$route.path) {
        this.$router.push(item.href)
      }
    }
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
  background-color: #F0EFF7;
}

/* 사이드바 */
.main-sidebar {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .main-sidebar {
    transform: translateX(-100%);
    z-index: 1100;
  }

  .main-layout--sidebar-open .main-sidebar {
    transform: translateX(0);
  }
}

/* 메인 콘텐츠 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  min-width: 0;
}

.main-layout--sidebar-collapsed .main-content {
  margin-left: 80px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}

/* 모바일 헤더 */
.mobile-header {
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

@media (max-width: 768px) {
  .mobile-header {
    display: flex;
  }
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #4A5568;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle:hover {
  background-color: #F7FAFC;
  color: #293380;
}

.mobile-logo {
  flex: 1;
  text-align: center;
}

.logo-text {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1A202C;
}

.mobile-user {
  flex-shrink: 0;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #293380;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
}

/* 페이지 콘텐츠 */
.page-content {
  flex: 1;
  background-color: #F0EFF7;
  min-height: calc(100vh - 80px);
  overflow-x: auto;
}

@media (max-width: 768px) {
  .page-content {
    min-height: calc(100vh - 68px);
  }
}

/* 오버레이 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* 스크롤바 스타일링 */
.page-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.page-content::-webkit-scrollbar-track {
  background: #F7FAFC;
}

.page-content::-webkit-scrollbar-thumb {
  background: #CBD5E0;
  border-radius: 3px;
}

.page-content::-webkit-scrollbar-thumb:hover {
  background: #A0AEC0;
}

/* 포커스 관리 */
.sidebar-toggle:focus {
  outline: 2px solid #293380;
  outline-offset: 2px;
}

/* 애니메이션 최적화 */
@media (prefers-reduced-motion: reduce) {
  .main-content,
  .main-sidebar,
  .sidebar-overlay {
    transition: none;
  }
  
  .sidebar-overlay {
    animation: none;
  }
}

/* 높은 해상도 디스플레이 최적화 */
@media (min-resolution: 2dppx) {
  .mobile-header {
    border-bottom-width: 0.5px;
  }
}
</style>
