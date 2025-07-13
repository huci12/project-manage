<template>
  <div class="main-layout" :class="{ 'main-layout--sidebar-collapsed': sidebarCollapsed }">
    <!-- 사이드바 - 항상 표시 -->
    <PMSidebar 
      :collapsed="sidebarCollapsed"
      :active-item="activeNavItem"
      @nav-click="handleNavClick"
      @toggle="handleSidebarToggle"
      @logout="handleLogout"
      class="main-sidebar"
    />

    <!-- 메인 콘텐츠 영역 -->
    <div class="main-content">
      <!-- 페이지 콘텐츠 -->
      <main class="page-content">
        <slot>
          <router-view v-if="$route" />
        </slot>
      </main>
    </div>
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
      sidebarCollapsed: false
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
    // 초기 화면 크기에 따라 사이드바 상태 설정
    this.checkInitialScreenSize()
  },
  methods: {
    checkInitialScreenSize() {
      // 768px 이하에서는 사이드바를 접은 상태로 시작
      if (window.innerWidth <= 768) {
        this.sidebarCollapsed = true
      }
    },

    handleSidebarToggle(collapsed) {
      this.sidebarCollapsed = collapsed
    },

    handleNavClick(item) {
      console.log('Navigation clicked:', item)
      
      // 768px 이하에서는 네비게이션 클릭 시 사이드바 접기
      if (window.innerWidth <= 768 && !this.sidebarCollapsed) {
        this.sidebarCollapsed = true
      }

      // 라우터 이동
      if (this.$router && item.href !== this.$route.path) {
        this.$router.push(item.href)
      }
    },

    handleLogout() {
      console.log('Logout clicked')
      // 로그아웃 처리
      if (this.$router) {
        this.$router.push('/')
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
  position: relative;
  /* 최소 너비: 사이드바 + 콘텐츠 + 퀵패널 */
  min-width: 1084px; /* 80px + 744px + 260px */
}

/* 사이드바 - 항상 표시 */
.main-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 1000;
  transition: width 0.3s ease;
}

/* 메인 콘텐츠 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  min-width: 0;
  position: relative;
}

.main-layout--sidebar-collapsed .main-content {
  margin-left: 80px;
}

/* 페이지 콘텐츠 */
.page-content {
  flex: 1;
  background-color: #F0EFF7;
  min-height: 100vh;
  overflow-x: auto;
  min-width: 744px; /* 콘텐츠 최소 너비 유지 */
  width: 100%;
}

/* 사이드바 상태와 관계없이 콘텐츠 최소 너비 유지 */
.main-layout--sidebar-collapsed .page-content {
  min-width: 744px; /* 동일한 최소 너비 유지 */
}

/* 작은 화면에서도 레이아웃 유지 */
@media (max-width: 1280px) {
  .main-layout {
    /* 사이드바 + 콘텐츠 최소 너비 */
    min-width: 824px; /* 80px(접힌 사이드바) + 744px(콘텐츠) */
  }
  
  .page-content {
    min-width: 744px; /* 콘텐츠 최소 너비 유지 */
  }
}

@media (max-width: 768px) {
  /* 모바일에서도 콘텐츠 최소 너비 유지 */
  .main-layout {
    min-width: 824px; /* 80px(접힌 사이드바) + 744px(콘텐츠) */
  }
  
  /* 사이드바 펼쳐진 상태 */
  .main-content {
    margin-left: 280px;
  }
  
  /* 사이드바 접힌 상태 */
  .main-layout--sidebar-collapsed .main-content {
    margin-left: 80px;
  }
  
  .page-content {
    min-width: 744px; /* 콘텐츠 최소 너비 유지 */
    width: 100%;
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

/* 애니메이션 최적화 */
@media (prefers-reduced-motion: reduce) {
  .main-content,
  .main-sidebar {
    transition: none;
  }
}

/* 가로 스크롤 표시기 */
.page-content {
  position: relative;
}

.page-content::after {
  content: '';
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: linear-gradient(to right, transparent, #F0EFF7);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.page-content:hover::after {
  opacity: 1;
}

/* 인쇄 시 스타일 */
@media print {
  .main-sidebar {
    display: none !important;
  }
  
  .main-content {
    margin-left: 0 !important;
  }
  
  .page-content {
    min-width: 100% !important;
  }
}
</style>
