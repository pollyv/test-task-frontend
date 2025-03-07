import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useApplicationStore = defineStore('application', () => {
  const cart = ref<Product[]>([]) // Корзина

  const addToCart = (product: Product) => {
    cart.value.push(product)
  }

  const cartCount = computed(() => cart.value.length)

  return {
    cart,
    addToCart,
    cartCount,
  }
})
