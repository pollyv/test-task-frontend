import { defineEventHandler, setHeader } from 'h3'
import { generateFakeProduct } from '~/utils/generate'
import type { Product } from '~/types'

let cachedProducts: Product[] | null = null

export default defineEventHandler(async (event) => {
  try {
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    if (cachedProducts) {
      console.log('Returning cached products:', cachedProducts)
      return cachedProducts
    }

    const products = Array.from({ length: 12 }, () => generateFakeProduct())
    console.log('Generated new products:', products)

    cachedProducts = products

    return products
  }
  catch (error) {
    console.error('Ошибка в API /api/products:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: 'Не удалось сгенерировать товары',
    })
  }
})
