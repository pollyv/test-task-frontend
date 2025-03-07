<template>
  <div class="min-h-screen flex flex-col pb-16">
    <TheHeader />
    <main class="flex-grow p-6 pt-22">
      <div
        v-if="error"
        class="text-center text-red-500"
      >
        Ошибка загрузки товара: {{ error }}
      </div>
      <div v-else-if="product">
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
          <div class="relative w-[36rem] h-[24rem]">
            <img
              :src="product.image"
              alt="Product Image"
              class="w-full h-full object-cover rounded-md"
            >
          </div>
          <div class="flex flex-col justify-center">
            <h1 class="text-3xl font-bold mb-4">
              {{ product.name }}
            </h1>
            <p class="text-xl text-black font-bold">
              {{ product.newPrice }} ₽
            </p>
            <p
              v-if="product.oldPrice"
              class="text-lg text-gray-500 line-through mb-2"
            >
              {{ product.oldPrice }} ₽
            </p>
            <p class="mb-2">
              Бренд: {{ product.brand }}
            </p>
            <p class="mb-4">
              Описание: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <button
              class="bg-black text-white px-3 py-2 text-base rounded-md hover:bg-gray-800 self-start cursor-pointer"
              @click="addToCart(product)"
            >
              В корзину
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center text-gray-500"
      >
        Загрузка товара...
      </div>
    </main>

    <div class="fixed bottom-0 left-0 right-0">
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApplicationStore } from '~/store/application'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import type { Product } from '~/types'

const route = useRoute()
const product = ref<Product | null>(null)
const error = ref<string | null>(null)
const store = useApplicationStore()

onMounted(async () => {
  try {
    const products: Product[] = await $fetch('/api/products')
    const id = route.params.id
    product.value = products.find(p => p.url.endsWith(String(id))) || null
    if (!product.value) {
      error.value = 'Товар не найден'
    }
  }
  catch (err: any) {
    console.error('Ошибка загрузки товара:', err)
    error.value = err.message || 'Произошла ошибка'
  }
})

const addToCart = (product: Product) => {
  store.addToCart(product)
}
</script>
