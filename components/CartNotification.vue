<template>
  <div
    v-if="visible"
    class="fixed bottom-10 right-10 bg-pink-600 text-white px-4 py-2 rounded-md flex items-center"
  >
    <span>Товар добавлен в корзину</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  visible: boolean
}>()
</script>
