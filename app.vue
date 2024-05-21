<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const userStore = useUserStore()

provide('userStore', userStore)
</script>
