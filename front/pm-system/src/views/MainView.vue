<template>
  <div>
    <h1>메인 페이지</h1>
    <p>환영합니다, {{ userStore.userName }}님!</p>
    <p>이곳은 메인 페이지 내용입니다.</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/pinia'

const userStore = useUserStore()
</script>
