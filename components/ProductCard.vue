<template>
  <div
    class="group relative bg-white rounded-lg shadow-md p-4 flex flex-col overflow-hidden transition-transform duration-300 ease-in-out transform-gpu will-change-transform origin-center hover:scale-105 hover:shadow-lg hover:z-10"
  >
    <div class="relative w-full h-48 mb-4">
      <img
        :src="product.image"
        alt="Product Image"
        class="w-full h-full object-cover rounded-md"
      >
      <span
        v-if="product.oldPrice"
        class="absolute bottom-1 left-1 bg-white text-pink-600 text-xs font-bold px-2 py-1 rounded-md"
      >
        -{{ discountPercent }}%
      </span>
    </div>

    <div class="flex items-center space-x-2 mb-2">
      <span class="text-lg font-bold text-black truncate">{{ product.newPrice }} ₽</span>
      <span
        v-if="product.oldPrice"
        class="text-sm text-gray-500 line-through truncate"
      >
        {{ product.oldPrice }} ₽
      </span>
    </div>

    <div class="mb-4">
      <p
        class="text-sm text-black uppercase font-bold truncate"
        :title="product.brand"
      >
        {{ product.brand }}
      </p>
      <p
        class="text-sm text-gray-700 truncate"
        :title="product.name"
      >
        {{ product.name }}
      </p>
    </div>

    <button
      class="opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white w-1/2 px-2 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
      @click="$emit('add-to-cart', product)"
    >
      В корзину
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import type { Product } from '~/types'

const props = defineProps<{
  product: Product
}>()
defineEmits(['add-to-cart'])

const discountPercent = computed(() => {
  if (!props.product.oldPrice) return 0
  const { oldPrice, newPrice } = props.product
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100)
})
</script>
