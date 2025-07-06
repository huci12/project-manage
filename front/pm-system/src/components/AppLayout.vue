<template>
  <div class="app-layout">
    <nav class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!sidebarCollapsed">PM System</h2>
        <button class="toggle-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? '☰' : '✕' }}
        </button>
      </div>
      
      <ul class="nav-menu">
        <li v-for="item in menuItems" :key="item.path">
          <router-link :to="item.path" class="nav-link" active-class="active">
            <span class="icon">{{ item.icon }}</span>
            <span v-if="!sidebarCollapsed" class="label">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
      
      <div class="sidebar-footer">
        <div class="user-info" v-if="!sidebarCollapsed">
          <div class="user-avatar">{{ getInitials(userStore.userName) }}</div>
          <div class="user-details">
            <p class="user-name">{{ userStore.userName }}</p>
            <p class="user-role">{{ userStore.currentUser?.email }}</p>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout">
          <span class="icon">🚪</span>
          <span v-if="!sidebarCollapsed">로그아웃</span>
        </button>
      </div>
    </nav>
    
    <div class="main-content">
      <header class="top-header">
        <div class="header-left">
          <h1>{{ currentPageTitle }}</h1>
        </div>
        <div class="header-right">
          <button class="notification-btn">
            🔔
            <span class="notification-badge">3</span>
          </button>
          <div class="user-menu">
            <button class="user-menu-btn" @click="showUserMenu = !showUserMenu">
              <span class="user-avatar-small">{{ getInitials(userStore.userName) }}</span>
              <span>{{ userStore.userName }}</span>
            </button>
            <div v-if="showUserMenu" class="user-dropdown">
              <router-link to="/settings" @click="showUserMenu = false">설정</router-link>
              <button @click="handleLogout">로그아웃</button>
            </div>
          </div>
        </div>
      </header>
      
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../store/pinia'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const sidebarCollapsed = ref(false)
const showUserMenu = ref(false)

const menuItems = [
  { path: '/main', icon: '🏠', label: '대시보드' },
  { path: '/projects', icon: '📁', label: '프로젝트' },
  { path: '/team', icon: '👥', label: '팀' },
  { path: '/schedule', icon: '📅', label: '일정' },
  { path: '/settings', icon: '⚙️', label: '설정' }
]

const currentPageTitle = computed(() => {
  const currentItem = menuItems.find(item => item.path === route.path)
  return currentItem?.label || '페이지'
})

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 사이드바 */
.sidebar {
  width: 280px;
  background-color: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 80px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-menu {
  flex: 1;
  list-style: none;
  padding: 24px 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 16px 24px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s;
  font-size: 16px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: #42b883;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.nav-link .icon {
  font-size: 24px;
  min-width: 32px;
}

.nav-link .label {
  margin-left: 16px;
  font-weight: 500;
}

.sidebar-footer {
  padding: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  background-color: #42b883;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 12px;
  font-size: 18px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  margin: 0 0 4px 0;
  font-size: 16px;
}

.user-role {
  font-size: 14px;
  opacity: 0.8;
  margin: 0;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* 메인 컨텐츠 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-header {
  background: white;
  padding: 0 40px;
  height: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left h1 {
  margin: 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.notification-btn:hover {
  background-color: #f5f5f5;
}

.notification-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ff6b6b;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
}

.user-menu {
  position: relative;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.user-menu-btn:hover {
  background-color: #f5f5f5;
  border-color: #d0d0d0;
}

.user-avatar-small {
  width: 32px;
  height: 32px;
  background-color: #42b883;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
}

.user-dropdown a,
.user-dropdown button {
  display: block;
  width: 100%;
  padding: 14px 20px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: background-color 0.3s;
}

.user-dropdown a:hover,
.user-dropdown button:hover {
  background-color: #f5f5f5;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background-color: #f5f5f5;
}

/* 사이드바 축소 시 스타일 */
.sidebar.collapsed .nav-link {
  justify-content: center;
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
}

.sidebar.collapsed .user-info,
.sidebar.collapsed .logout-btn span:last-child {
  display: none;
}

.sidebar.collapsed .logout-btn {
  padding: 12px;
}
</style>
