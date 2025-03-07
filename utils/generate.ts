import { faker } from '@faker-js/faker'
import { path } from '~/utils/path'
import type { Product } from '~/types'

export const generateFakeProduct = (): Product => {
  const newPrice = faker.commerce.price({ min: 100, max: 100000 })
  const oldPrice = Number(newPrice) + Number(faker.commerce.price({ min: 10, max: 10000 }))

  return {
    image: faker.image.url(),
    newPrice: Number(newPrice),
    oldPrice: oldPrice,
    brand: faker.company.name(),
    name: faker.commerce.productName(),
    url: path.products + '/' + faker.number.int({ min: 10, max: 10000 }),
  }
}