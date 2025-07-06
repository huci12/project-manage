<template>
  <aside class="pm-sidebar" :class="{ 'pm-sidebar--collapsed': isCollapsed }">
    <!-- 로고 섹션 -->
    <div class="pm-sidebar__header">
      <div class="pm-sidebar__logo">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="6" fill="#667EEA"/>
            <!-- PM System 로고 패턴 -->
            <circle cx="9" cy="9" r="3" fill="white"/>
            <circle cx="16.5" cy="9" r="3" fill="white"/>
            <circle cx="24" cy="9" r="3" fill="white"/>
            <circle cx="9" cy="16.5" r="3" fill="white"/>
            <rect x="16.5" y="16.5" width="13.5" height="6" rx="3" fill="white"/>
            <rect x="9" y="24" width="21" height="6" rx="3" fill="white"/>
          </svg>
        </div>
        <span v-if="!isCollapsed" class="logo-text">PM System</span>
      </div>
      <!-- 토글 버튼 -->
      <button 
        class="toggle-btn"
        @click="toggleSidebar"
        :title="isCollapsed ? '사이드바 펼치기' : '사이드바 접기'"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path v-if="!isCollapsed" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
          <path v-else d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
        </svg>
      </button>
    </div>

    <!-- 네비게이션 메뉴 -->
    <nav class="pm-sidebar__nav">
      <ul class="nav-list">
        <li v-for="item in navigationItems" :key="item.id" class="nav-item">
          <a 
            :href="item.href" 
            class="nav-link"
            :class="{ 'nav-link--active': item.id === activeItem }"
            @click.prevent="handleNavClick(item)"
            :title="isCollapsed ? item.label : ''"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span v-if="!isCollapsed" class="nav-text">{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <!-- 사용자 프로필 -->
    <div class="pm-sidebar__footer">
      <div class="user-profile">
        <div class="user-avatar">
          <span class="avatar-text">김</span>
        </div>
        <div v-if="!isCollapsed" class="user-info">
          <div class="user-name-section">
            <div class="user-name">김프로</div>
            <button 
              class="logout-btn"
              @click="handleLogout"
              title="로그아웃"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16,17 21,12 16,7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
          <div class="user-email">kim@company.com</div>
        </div>
        <button 
          v-else
          class="logout-btn logout-btn--collapsed"
          @click="handleLogout"
          title="로그아웃"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'PMSidebar',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    activeItem: {
      type: String,
      default: 'dashboard'
    }
  },
  emits: ['nav-click', 'toggle', 'logout'],
  data() {
    return {
      isCollapsed: this.collapsed,
      navigationItems: [
        {
          id: 'dashboard',
          label: '대시보드',
          href: '/dashboard',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" fill="currentColor" opacity="0.3"/>
            <rect x="14" y="3" width="7" height="7" fill="currentColor" opacity="0.3"/>
            <rect x="3" y="14" width="7" height="7" fill="currentColor" opacity="0.3"/>
            <rect x="14" y="14" width="7" height="7" fill="currentColor" opacity="0.3"/>
          </svg>`
        },
        {
          id: 'projects',
          label: '프로젝트',
          href: '/projects',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <line x1="6" y1="8" x2="12" y2="8"/>
            <line x1="6" y1="11" x2="8" y2="11"/>
          </svg>`
        },
        {
          id: 'teams',
          label: '팀',
          href: '/teams',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="9" cy="7" r="3"/>
            <circle cx="15" cy="7" r="3"/>
            <path d="M9 13c-3.5 0-6 2-6 5v1h12v-1c0-3-2.5-5-6-5z"/>
          </svg>`
        },
        {
          id: 'schedule',
          label: '일정',
          href: '/schedule',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="6" width="18" height="15" rx="2"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
          </svg>`
        },
        {
          id: 'settings',
          label: '설정',
          href: '/settings',
          icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>`
        }
      ]
    }
  },
  watch: {
    collapsed(newVal) {
      this.isCollapsed = newVal
    }
  },
  methods: {
    handleNavClick(item) {
      this.$emit('nav-click', item)
    },
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
      this.$emit('toggle', this.isCollapsed)
    },
    handleLogout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>
.pm-sidebar {
  width: 280px;
  height: 100vh;
  background-color: #1A202C;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  overflow-x: visible; /* 토글 버튼이 잘리지 않도록 */
  overflow-y: hidden; /* 전체 사이드바는 스크롤 없음 */
}

.pm-sidebar--collapsed {
  width: 80px;
}

/* 헤더 */
.pm-sidebar__header {
  padding: 24px;
  border-bottom: 1px solid #2D3748;
  position: relative;
  overflow: visible; /* 토글 버튼이 헤더 밖으로 나갈 수 있도록 */
}

.pm-sidebar--collapsed .pm-sidebar__header {
  padding: 16px;
}

.pm-sidebar__logo {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pm-sidebar--collapsed .pm-sidebar__logo {
  flex-direction: column;
  gap: 0;
}

.logo-icon {
  flex-shrink: 0;
}

.logo-text {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.2;
}

/* 토글 버튼 */
.toggle-btn {
  position: absolute;
  right: 9px; /* 확장 상태에서는 오른쪽 밖으로 */
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #667EEA;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1002; /* 사이드바보다 앞에 표시 */
}

.toggle-btn:hover {
  background-color: #5a67d8;
  transform: translateY(-50%) scale(1.1);
}

.pm-sidebar--collapsed .toggle-btn {
  /* 축소 상태에서는 로고 밑으로 이동 */
  position: static;
  margin: 12px auto 0 auto; /* 로고 밑에 12px 간격으로 중앙 정렬 */
  transform: none;
}

.pm-sidebar--collapsed .toggle-btn:hover {
  transform: scale(1.1);
}

/* 네비게이션 */
.pm-sidebar__nav {
  flex: 1;
  padding: 24px 0;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: #4A5568 #2D3748;
}

.pm-sidebar__nav::-webkit-scrollbar {
  width: 6px;
}

.pm-sidebar__nav::-webkit-scrollbar-track {
  background: #2D3748;
  border-radius: 0;
}

.pm-sidebar__nav::-webkit-scrollbar-thumb {
  background: #4A5568;
  border-radius: 3px;
}

.pm-sidebar__nav::-webkit-scrollbar-thumb:hover {
  background: #718096;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
  color: #A0AEC0;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  transition: all 0.2s ease;
  border-radius: 0;
  position: relative;
}

.pm-sidebar--collapsed .nav-link {
  justify-content: center;
  padding: 12px;
}

.nav-link:hover {
  background-color: #2D3748;
  color: #FFFFFF;
}

.nav-link--active {
  background-color: #293380;
  color: #FFFFFF;
}

.nav-link--active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #667EEA;
}

.nav-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  white-space: nowrap;
  overflow: hidden;
}

/* 푸터 */
.pm-sidebar__footer {
  padding: 24px;
  border-top: 1px solid #2D3748;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #667EEA;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avatar-text {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
}

.user-info {
  overflow: hidden;
  flex: 1;
}

.user-name-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.user-name {
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.user-email {
  color: #A0AEC0;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 로그아웃 버튼 */
.logout-btn {
  background: transparent;
  border: none;
  color: #A0AEC0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.logout-btn:hover {
  color: #FFFFFF;
  background-color: #2D3748;
}

.logout-btn--collapsed {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-top: 12px;
}

.logout-btn--collapsed:hover {
  background-color: #4A5568;
}

/* 반응형 */
@media (max-width: 768px) {
  .pm-sidebar {
    transform: translateX(-100%);
  }
  
  .pm-sidebar--open {
    transform: translateX(0);
  }
}
</style>
