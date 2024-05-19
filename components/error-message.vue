<template>
  <span className="text-xs text-red-300">{{ message }}</span>
</template>

<script setup>
const props = defineProps({
  message: String,
})
</script>
