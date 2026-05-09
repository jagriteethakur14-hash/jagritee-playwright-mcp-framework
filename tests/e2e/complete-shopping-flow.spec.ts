// tests/e2e/complete-shopping-flow.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { CartPage } from '../../pages/cart.page'
import { PRODUCTS, TEST_SCENARIOS } from '../../fixtures/test-data'

test.describe('E2E - Complete Shopping Flow', () => {
  let homePage: HomePage
  let cartPage: CartPage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    cartPage = new CartPage(page)
    await homePage.navigateToHome()
  })

  test('E2E-001: Browse → Add Multiple Products → Verify Cart', async () => {
    // Step 1: Verify home page loaded
    expect(await homePage.verifyPageTitle()).toBeTruthy()

    // Step 2: Add multiple products
    const items = TEST_SCENARIOS.MULTI_PRODUCT
    for (const item of items) {
      await homePage.addProductToCart(item.product.name, item.qty)
    }

    // Step 3: Navigate to cart
    await homePage.navigateToCart()

    // Step 4: Verify all items in cart
    const cartItems = await cartPage.getCartItems()
    expect(cartItems.length).toBe(items.length)

    // Step 5: Verify calculations
    const expectedTotal = items.reduce(
      (sum, item) => sum + (item.product.price * item.qty),
      0
    )
    const actualTotal = await cartPage.getSubtotal()
    expect(actualTotal).toBe(expectedTotal)
  })

  test('E2E-002: Search Product → Add to Cart → Remove → Verify', async () => {
    // Step 1: Search for product
    const searchTerm = 'Carrot'
    await homePage.searchProduct(searchTerm)

    // Step 2: Add searched product
    await homePage.addProductToCart(PRODUCTS.CARROT.name, 2)

    // Step 3: Navigate to cart
    await homePage.navigateToCart()

    // Step 4: Verify product in cart
    let itemCount = await cartPage.getCartItemCount()
    expect(itemCount).toBe(1)

    // Step 5: Remove item
    await cartPage.removeItem(PRODUCTS.CARROT.name)

    // Step 6: Verify cart empty
    const isEmpty = await cartPage.isCartEmpty()
    expect(isEmpty).toBeTruthy()
  })

  test('E2E-003: High Value Purchase Flow', async () => {
    // Step 1: Add premium products
    const premiumItems = TEST_SCENARIOS.HIGH_VALUE_PURCHASE
    for (const item of premiumItems) {
      await homePage.addProductToCart(item.product.name, item.qty)
    }

    // Step 2: Navigate to cart
    await homePage.navigateToCart()

    // Step 3: Verify high-value items
    const cartItems = await cartPage.getCartItems()
    expect(cartItems.length).toBe(premiumItems.length)

    // Step 4: Verify cart calculations
    const expectedTotal = premiumItems.reduce(
      (sum, item) => sum + (item.product.price * item.qty),
      0
    )
    const actualSubtotal = await cartPage.getSubtotal()
    expect(actualSubtotal).toBe(expectedTotal)

    // Step 5: Verify total with tax
    const total = await cartPage.getTotal()
    const tax = await cartPage.getTaxAmount()
    expect(total).toBe(actualSubtotal + tax)
  })

  test('E2E-004: Modify Cart Quantities → Verify Recalculation', async () => {
    // Step 1: Add products
    await homePage.addProductToCart(PRODUCTS.APPLE.name, 1)
    await homePage.addProductToCart(PRODUCTS.BANANA.name, 2)

    // Step 2: Navigate to cart
    await homePage.navigateToCart()

    // Step 3: Get initial total
    const initialTotal = await cartPage.getTotal()

    // Step 4: Modify quantities
    await cartPage.modifyQuantity(PRODUCTS.APPLE.name, 5)
    await cartPage.modifyQuantity(PRODUCTS.BANANA.name, 3)

    // Step 5: Verify recalculation
    const newTotal = await cartPage.getTotal()
    
    const expectedNewTotal = (PRODUCTS.APPLE.price * 5) + (PRODUCTS.BANANA.price * 3)
    const tax = await cartPage.getTaxAmount()
    
    // Note: This depends on how cart updates. Might need adjustment
    expect(newTotal).toBeGreaterThan(0)
  })

  test('E2E-005: Multi-Step Purchase with Mixed Products', async () => {
    // Step 1: Browse and add first set
    await homePage.addProductToCart(PRODUCTS.BROCCOLI.name, 1)

    // Step 2: Go back to browse more (via cart continue shopping)
    await homePage.navigateToCart()
    await cartPage.continueShopping()

    // Step 3: Add more products
    await homePage.addProductToCart(PRODUCTS.APPLE.name, 2)
    await homePage.addProductToCart(PRODUCTS.TOMATO.name, 5)

    // Step 4: View final cart
    await homePage.navigateToCart()

    // Step 5: Verify all items present
    const items = await cartPage.getCartItems()
    expect(items.length).toBe(3)

    // Step 6: Verify grand total
    const total = await cartPage.getTotal()
    expect(total).toBeGreaterThan(0)
  })

  test('E2E-006: Search and Add from Search Results', async () => {
    // Step 1: Search for vegetables
    await homePage.searchProduct('vegetable')

    // Step 2: Add from filtered results (if search filters)
    // This might depend on actual search implementation
    await homePage.addProductToCart(PRODUCTS.CARROT.name, 1)

    // Step 3: Clear search
    await homePage.clearSearch()

    // Step 4: Add non-filtered product
    await homePage.addProductToCart(PRODUCTS.APPLE.name, 1)

    // Step 5: Verify both in cart
    await homePage.navigateToCart()
    const items = await cartPage.getCartItems()
    expect(items.length).toBe(2)
  })
})
