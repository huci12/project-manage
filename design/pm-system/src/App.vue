<template>
  <div id="app">
    <component :is="currentView" />
  </div>
</template>

<script>
import AuthPage from '@/pages/AuthPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  name: 'App',
  components: {
    AuthPage,
    DashboardPage,
    MainLayout
  },
  data() {
    return {
      currentView: 'AuthPage',
      isAuthenticated: false
    }
  },
  provide() {
    return {
      $router: {
        push: (path) => {
          console.log('Navigate to:', path)
          if (path === '/dashboard') {
            this.currentView = 'MainLayoutWithDashboard'
            this.isAuthenticated = true
          } else if (path === '/') {
            this.currentView = 'AuthPage'
            this.isAuthenticated = false
          }
        },
        currentRoute: {
          value: {
            name: this.isAuthenticated ? 'Dashboard' : 'Auth',
            path: this.isAuthenticated ? '/dashboard' : '/'
          }
        }
      },
      $route: {
        name: this.isAuthenticated ? 'Dashboard' : 'Auth',
        path: this.isAuthenticated ? '/dashboard' : '/'
      }
    }
  },
  computed: {
    MainLayoutWithDashboard() {
      return {
        template: `
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        `,
        components: {
          MainLayout,
          DashboardPage
        }
      }
    }
  },
  mounted() {
    // 개발 환경에서 빠른 테스트를 위해 3초 후 자동 로그인
    setTimeout(() => {
      if (!this.isAuthenticated) {
        console.log('자동 로그인 실행 (개발 환경)')
        this.currentView = 'MainLayoutWithDashboard'
        this.isAuthenticated = true
      }
    }, 3000)
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
