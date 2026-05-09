// tests/home/product-browsing.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { PRODUCTS, TEST_URLs } from '../../fixtures/test-data'

test.describe('Home Page - Product Browsing', () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await homePage.navigateToHome()
  })

  test('TC-HP-001: Verify home page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/GreenKart/)
  })

  test('TC-HP-002: Verify product grid layout is displayed', async () => {
    const isDisplayed = await homePage.verifyProductsDisplayed()
    expect(isDisplayed).toBeTruthy()
  })

  test('TC-HP-003: Verify product count', async () => {
    const count = await homePage.getProductCount()
    expect(count).toBeGreaterThan(20)
  })

  test('TC-HP-004: Verify product names are loaded', async () => {
    const names = await homePage.getProductNames()
    expect(names.length).toBeGreaterThan(0)
  })

  test('TC-HP-005: Verify search box is visible', async () => {
    const isVisible = await homePage.verifySearchBoxVisible()
    expect(isVisible).toBeTruthy()
  })

  test('TC-HP-006: Verify logo is visible', async () => {
    const isVisible = await homePage.verifyLogoVisible()
    expect(isVisible).toBeTruthy()
  })

  test('TC-HP-007: Verify specific product exists', async () => {
    const exists = await homePage.verifyProductExists(PRODUCTS.BROCCOLI.name)
    expect(exists).toBeTruthy()
  })

  test('TC-HP-008: Verify product price display', async () => {
    const price = await homePage.getProductPrice(PRODUCTS.CARROT.name)
    expect(price).toBe(PRODUCTS.CARROT.price)
  })
})
