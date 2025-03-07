<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />

    <main class="flex-grow p-6 pt-16">
      <h2 class="text-3xl font-bold mb-6 mt-6">
        Тестовая задача
      </h2>

      <div
        v-if="error"
        class="text-center text-red-500"
      >
        Не удалось загрузить товары: {{ error }}
      </div>

      <div
        v-else-if="products.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <NuxtLink
          v-for="product in products"
          :key="product.url"
          :to="product.url"
        >
          <ProductCard
            :product="product"
            @add-to-cart="addToCart"
          />
        </NuxtLink>
      </div>

      <div
        v-else
        class="text-center text-gray-500"
      >
        Загрузка...
      </div>
    </main>

    <TheFooter />

    <CartNotification :visible="showCartNotification" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import ProductCard from '~/components/ProductCard.vue'
import CartNotification from '~/components/CartNotification.vue'
import { useApplicationStore } from '~/store/application'
import type { Product } from '~/types'

const products = ref<Product[]>([])
const showCartNotification = ref(false)
const error = ref<string | null>(null)
const store = useApplicationStore()

onMounted(async () => {
  try {
    const fetchedProducts = await $fetch<Product[]>('/api/products')
    products.value = fetchedProducts
  }
  catch (err: any) {
    console.error('Ошибка при загрузке товаров:', err)
    error.value = err.message || 'Произошла ошибка при загрузке товаров'
  }
})

const addToCart = (product: Product) => {
  store.addToCart(product)
  showCartNotification.value = true
  setTimeout(() => {
    showCartNotification.value = false
  }, 2000)
}
</script>
