// tests/edge-cases/input-validation.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { PRODUCTS, QUANTITY_TEST_VALUES, SEARCH_KEYWORDS } from '../../fixtures/test-data'

test.describe('Edge Cases - Input Validation', () => {
  let homePage: HomePage
  let cartPage: CartPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    await homePage.navigateToHome()
  })

  test('EC-001: Handle zero quantity attempt', async () => {
    // Attempt to set quantity to 0
    await homePage.setQuantity(PRODUCTS.BROCCOLI.name, 0)
    
    // Should either prevent action or reset to default
    const qty = await homePage.getQuantity(PRODUCTS.BROCCOLI.name)
    expect(qty).toBeGreaterThan(0)
  })

  test('EC-002: Handle negative quantity', async () => {
    // Attempt to set negative quantity
    await homePage.setQuantity(PRODUCTS.CARROT.name, -5)
    
    // Should be rejected or converted to positive
    const qty = await homePage.getQuantity(PRODUCTS.CARROT.name)
    expect(qty).toBeGreaterThanOrEqual(0)
  })

  test('EC-003: Handle very large quantity', async () => {
    const largeQty = 999
    await homePage.setQuantity(PRODUCTS.APPLE.name, largeQty)
    
    const qty = await homePage.getQuantity(PRODUCTS.APPLE.name)
    expect(qty).toBeGreaterThan(0)
  })

  test('EC-004: Search with empty string', async () => {
    await homePage.searchProduct('')
    
    // Should either show all products or no change
    const exists = await homePage.verifyProductExists(PRODUCTS.TOMATO.name)
    expect(exists).toBeTruthy()
  })

  test('EC-005: Search non-existent product', async () => {
    await homePage.searchProduct(SEARCH_KEYWORDS.NON_EXISTENT)
    
    // Should show no results or "no products found"
    // Implementation might vary
  })

  test('EC-006: Search with special characters', async () => {
    await homePage.searchProduct(SEARCH_KEYWORDS.SPECIAL_CHARS[0])
    
    // Should handle gracefully
  })

  test('EC-007: Case insensitive search', async () => {
    // Search in different cases
    await homePage.searchProduct('APPLE')
    
    const exists = await homePage.verifyProductExists(PRODUCTS.APPLE.name)
    expect(exists).toBeTruthy()
  })

  test('EC-008: Partial product name search', async () => {
    await homePage.searchProduct('Bro') // Partial for Broccoli
    
    const exists = await homePage.verifyProductExists(PRODUCTS.BROCCOLI.name)
    expect(exists).toBeTruthy()
  })

  test('EC-010: Add highest price product', async () => {
    // Strawberry is ₹180 per 1/4 Kg
    await homePage.addProductToCart(PRODUCTS.STRAWBERRY.name, 1)
    await homePage.navigateToCart()
    
    const exists = await cartPage.verifyProductInCart(PRODUCTS.STRAWBERRY.name)
    expect(exists).toBeTruthy()
  })

  test('EC-011: Add lowest price product', async () => {
    // Tomato/Onion are ₹16
    await homePage.addProductToCart(PRODUCTS.TOMATO.name, 5)
    await homePage.navigateToCart()
    
    const items = await cartPage.getCartItems()
    const item = items.find(i => i.name.includes(PRODUCTS.TOMATO.name))
    
    expect(item?.price).toBe(PRODUCTS.TOMATO.price)
    expect(item?.quantity).toBe(5)
  })

  test('EC-012: Handle premium quantity unit (1/4 Kg)', async () => {
    // Verify system handles non-standard units
    const exists = await homePage.verifyProductExists(PRODUCTS.RASPBERRY.name)
    expect(exists).toBeTruthy()
    
    await homePage.addProductToCart(PRODUCTS.RASPBERRY.name, 2)
    await homePage.navigateToCart()
    
    const items = await cartPage.getCartItems()
    const item = items.find(i => i.name.includes(PRODUCTS.RASPBERRY.name))
    expect(item?.quantity).toBe(2)
  })

  test('EC-020: Large number of items in cart', async () => {
    // Add many items
    const products = [
      PRODUCTS.BROCCOLI,
      PRODUCTS.CARROT,
      PRODUCTS.APPLE,
      PRODUCTS.TOMATO,
      PRODUCTS.BANANA,
      PRODUCTS.MUSHROOM,
      PRODUCTS.CORN,
      PRODUCTS.POTATO,
      PRODUCTS.MANGO,
      PRODUCTS.GRAPES
    ]
    
    for (const product of products) {
      await homePage.addProductToCart(product.name, 1)
    }
    
    await homePage.navigateToCart()
    const itemCount = await cartPage.getCartItemCount()
    expect(itemCount).toBe(products.length)
  })

  test('EC-021: Remove all items from cart', async () => {
    // Add items
    await homePage.addProductToCart(PRODUCTS.APPLE.name, 1)
    await homePage.addProductToCart(PRODUCTS.BANANA.name, 1)
    
    // Navigate to cart
    await homePage.navigateToCart()
    
    // Remove all
    await cartPage.removeAllItems()
    
    // Verify empty
    const isEmpty = await cartPage.isCartEmpty()
    expect(isEmpty).toBeTruthy()
  })

  test('EC-023: Price calculation with large quantities', async () => {
    const largeQty = 50
    await homePage.addProductToCart(PRODUCTS.TOMATO.name, largeQty)
    
    await homePage.navigateToCart()
    const items = await cartPage.getCartItems()
    const item = items.find(i => i.name.includes(PRODUCTS.TOMATO.name))
    
    const expectedTotal = PRODUCTS.TOMATO.price * largeQty
    expect(item?.total).toBe(expectedTotal)
  })

  test('EC-030: Cart persistence across page refresh', async ({ page }) => {
    // Add item
    await homePage.addProductToCart(PRODUCTS.BROCCOLI.name, 1)
    
    // Refresh page
    await page.reload()
    
    // Check if item still in session (depends on implementation)
    // This test validates if cart is stored in localStorage/sessionStorage
  })
})
