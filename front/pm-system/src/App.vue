<template>
  <div>
    <MainLayout v-if="!isLoginPage">
      <router-view />
    </MainLayout>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './components/MainLayout.vue'

const route = useRoute()

const isLoginPage = computed(() => {
  return route.path === '/login'
})
</script>
