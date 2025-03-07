<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />

    <main class="flex-grow flex items-center justify-center pt-16">
      <NuxtLink to="/catalog" class="text-pink-600 underline text-lg">
        Перейти в раздел каталога
      </NuxtLink>
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
</script>
