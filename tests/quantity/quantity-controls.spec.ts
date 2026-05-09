// tests/quantity/quantity-controls.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { PRODUCTS, QUANTITY_TEST_VALUES } from '../../fixtures/test-data'

test.describe('Quantity Controls', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigateToHome()
  })

  test('TC-QTY-001: Verify default quantity is 1', async () => {
    const qty = await homePage.getQuantity(PRODUCTS.BROCCOLI.name)
    expect(qty).toBe(1)
  })

  test('TC-QTY-002: Increment quantity via + button', async () => {
    await homePage.incrementQuantity(PRODUCTS.CARROT.name)
    const qty = await homePage.getQuantity(PRODUCTS.CARROT.name)
    expect(qty).toBe(2)
  })

  test('TC-QTY-003: Decrement quantity via - button', async () => {
    // First increment to 2
    await homePage.incrementQuantity(PRODUCTS.TOMATO.name)
    // Then decrement back to 1
    await homePage.decrementQuantity(PRODUCTS.TOMATO.name)
    const qty = await homePage.getQuantity(PRODUCTS.TOMATO.name)
    expect(qty).toBe(1)
  })

  test('TC-QTY-005: Set custom quantity via input', async () => {
    const testQty = 5
    await homePage.setQuantity(PRODUCTS.APPLE.name, testQty)
    const qty = await homePage.getQuantity(PRODUCTS.APPLE.name)
    expect(qty).toBe(testQty)
  })

  test('TC-QTY-006: Increment to higher quantity', async () => {
    await homePage.setQuantity(PRODUCTS.BANANA.name, 1)
    for (let i = 0; i < 9; i++) {
      await homePage.incrementQuantity(PRODUCTS.BANANA.name)
    }
    const qty = await homePage.getQuantity(PRODUCTS.BANANA.name)
    expect(qty).toBe(10)
  })

  test('TC-QTY-007: Verify quantity boundaries', async () => {
    // Try maximum value
    await homePage.setQuantity(PRODUCTS.MANGO.name, 99)
    let qty = await homePage.getQuantity(PRODUCTS.MANGO.name)
    expect(qty).toBe(99)
  })
})
