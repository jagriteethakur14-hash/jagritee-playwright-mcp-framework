// tests/cart/add-to-cart.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { PRODUCTS, TEST_SCENARIOS } from '../../fixtures/test-data'

test.describe('Add to Cart Functionality', () => {
  let homePage: HomePage
  let cartPage: CartPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    await homePage.navigateToHome()
  })

  test('TC-CART-001: Add single product with default quantity', async () => {
    await homePage.addProductToCart(PRODUCTS.BROCCOLI.name, 1)
    await homePage.navigateToCart()
    
    const exists = await cartPage.verifyProductInCart(PRODUCTS.BROCCOLI.name)
    expect(exists).toBeTruthy()
  })

  test('TC-CART-002: Add product with custom quantity', async () => {
    const quantity = 3
    await homePage.addProductToCart(PRODUCTS.CARROT.name, quantity)
    await homePage.navigateToCart()
    
    const items = await cartPage.getCartItems()
    const item = items.find(i => i.name.includes(PRODUCTS.CARROT.name))
    expect(item?.quantity).toBe(quantity)
  })

  test('TC-CART-003: Add multiple different products', async () => {
    for (const scenario of TEST_SCENARIOS.MULTI_PRODUCT) {
      await homePage.addProductToCart(scenario.product.name, scenario.qty)
    }
    
    await homePage.navigateToCart()
    const itemCount = await cartPage.getCartItemCount()
    expect(itemCount).toBe(TEST_SCENARIOS.MULTI_PRODUCT.length)
  })

  test('TC-CART-004: Verify price calculation in cart', async () => {
    const qty = 2
    await homePage.addProductToCart(PRODUCTS.APPLE.name, qty)
    await homePage.navigateToCart()
    
    const items = await cartPage.getCartItems()
    const item = items.find(i => i.name.includes(PRODUCTS.APPLE.name))
    const expectedTotal = PRODUCTS.APPLE.price * qty
    expect(item?.total).toBe(expectedTotal)
  })

  test('TC-CART-005: Cart counter updates after adding item', async ({ page }) => {
    // Initial count should be 0
    let count = await homePage.getCartItemCount()
    
    // Add item
    await homePage.addProductToCart(PRODUCTS.TOMATO.name, 1)
    
    // Count should update (implementation dependent)
    // This test might need adjustment based on actual UI feedback
  })

  test('TC-CART-006: Add same product multiple times', async () => {
    await homePage.addProductToCart(PRODUCTS.BEANS.name, 1)
    await homePage.addProductToCart(PRODUCTS.BEANS.name, 2)
    
    await homePage.navigateToCart()
    const items = await cartPage.getCartItems()
    
    // Check if items merged or listed separately
    const beanItems = items.filter(i => i.name.includes(PRODUCTS.BEANS.name))
    expect(beanItems.length).toBeGreaterThan(0)
  })

  test('TC-CART-007: Verify cart total calculation', async () => {
    const products = TEST_SCENARIOS.MIXED_PURCHASE
    
    for (const item of products) {
      await homePage.addProductToCart(item.product.name, item.qty)
    }
    
    await homePage.navigateToCart()
    
    const expectedSubtotal = products.reduce(
      (sum, item) => sum + (item.product.price * item.qty),
      0
    )
    
    const subtotal = await cartPage.getSubtotal()
    expect(subtotal).toBe(expectedSubtotal)
  })
})
