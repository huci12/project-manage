<template>
  <div style="display: flex; height: 100vh;">
    <!-- 사이드패널 -->
    <aside style="width: 200px; background: #f0f0f0; padding: 20px;">
      <h2>사이드패널</h2>
      <nav>
        <ul style="list-style: none; padding: 0;">
          <li><router-link to="/main">메인</router-link></li>
          <li><router-link to="/projects">프로젝트</router-link></li>
          <li><router-link to="/team">팀</router-link></li>
          <li><router-link to="/schedule">일정</router-link></li>
          <li><router-link to="/settings">설정</router-link></li>
        </ul>
      </nav>
      <button @click="logout">로그아웃</button>
    </aside>
    
    <!-- 메인 화면 (가변) -->
    <main style="flex: 1; padding: 20px; overflow: auto;">
      <slot />
    </main>
    
    <!-- 퀵바 -->
    <aside style="width: 150px; background: #e0e0e0; padding: 20px;">
      <h3>퀵바</h3>
      <p>빠른 작업</p>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/pinia'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>
