<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-sm p-4 flex justify-between items-center z-50">
    <h1 class="text-2xl font-bold">Brand Name</h1>
    <div class="flex items-center">
      <Icon name="material-symbols:shopping-basket-outline" class="text-xl mr-2" />
      <span>{{ cartCount }} товаров</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useApplicationStore } from '~/store/application'

const store = useApplicationStore()
const cartCount = computed(() => store.cartCount)
</script>
