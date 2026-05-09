// pages/home.page.ts
import { Page } from '@playwright/test'
import { BasePage } from './base.page'

export interface Product {
  name: string
  price: number
}

export interface CartItem {
  name: string
  price: number
  quantity: number
}

export class HomePage extends BasePage {
  // Selectors - Using actual CSS classes found via DOM inspection
  private readonly LOGO = '.brand'
  private readonly SEARCH_INPUT = 'input.search-keyword'
  private readonly SEARCH_BUTTON = 'button[type="submit"]'
  private readonly PRODUCT_CARD = '.product'
  private readonly PRODUCT_NAME = 'h4.product-name'
  private readonly PRODUCT_PRICE = 'p.product-price'
  private readonly ADD_TO_CART_BTN = 'button'
  private readonly QTY_INCREMENT_BTN = 'a.increment'
  private readonly QTY_DECREMENT_BTN = 'a.decrement'
  private readonly QTY_SPINBUTTON = 'input[type="number"]'
  private readonly CART_LINK = 'a.cart-icon'
  private readonly CART_ICON = 'a.cart-icon img[alt="Cart"]'
  private readonly TOP_DEALS_LINK = 'a[href="#/offers"]'
  private readonly FLIGHT_BOOKING_LINK = 'a[href*="dropdownsPractise"]'

  constructor(page: Page) {
    super(page)
  }

  // Navigation
  async navigateToHome() {
    await this.goToHomePage()
  }

  async navigateToCart() {
    await this.click(this.CART_LINK)
    await this.page.locator('.cart-preview').waitFor()
  }

  async navigateToTopDeals() {
    await this.click(this.TOP_DEALS_LINK)
  }

  async clickLogo() {
    await this.click(this.LOGO)
  }

  // Product browsing
  async getProductCount(): Promise<number> {
    return await this.getCount(this.PRODUCT_CARD)
  }

  async getProductNames(): Promise<string[]> {
    const elements = this.page.locator('.product h4.product-name')
    const count = await elements.count()
    const names: string[] = []
    
    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent()
      if (text) names.push(text.trim())
    }
    return names
  }

  async getProductPrice(productName: string): Promise<number> {
    const productLocator = this.page.locator(
      `.${this.PRODUCT_CARD.replace('.', '')}:has(${this.PRODUCT_NAME}:text-is("${productName}"))`
    )
    const priceText = await productLocator.locator(this.PRODUCT_PRICE).textContent()
    const price = priceText?.replace('₹', '').trim()
    return parseInt(price || '0', 10)
  }

  async verifyProductExists(productName: string): Promise<boolean> {
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )
    return await productLocator.isVisible()
  }

  // Search
  async searchProduct(productName: string) {
    await this.fill(this.SEARCH_INPUT, productName)
    await this.page.keyboard.press('Enter')
  }

  async clearSearch() {
    await this.fill(this.SEARCH_INPUT, '')
  }

  // Quantity controls
  async setQuantity(productName: string, quantity: number) {
    const normalizedQuantity = Math.max(1, Math.trunc(quantity))
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )
    
    const qtyField = productLocator.locator('input[type="number"]')
    await qtyField.clear()
    await qtyField.fill(normalizedQuantity.toString())
  }

  async incrementQuantity(productName: string) {
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )
    await productLocator.locator('a.increment').click()
  }

  async decrementQuantity(productName: string) {
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )
    await productLocator.locator('a.decrement').click()
  }

  async getQuantity(productName: string): Promise<number> {
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )
    const qtyText = await productLocator.locator('input[type="number"]').inputValue()
    return parseInt(qtyText || '0', 10)
  }

  // Add to cart
  async addProductToCart(productName: string, quantity: number = 1) {
    const productLocator = this.page.locator(
      `.product:has(h4.product-name:text-is("${productName}"))`
    )

    if (!(await productLocator.isVisible())) {
      await this.clearSearch()
      await productLocator.waitFor()
    }

    await this.setQuantity(productName, quantity)
    
    // Click add to cart
    await productLocator.locator('button').click()
    
    await productLocator.locator('button').filter({ hasText: /added/i }).waitFor()
  }

  async addMultipleProducts(products: Product[]) {
    for (const product of products) {
      await this.addProductToCart(product.name, 1)
    }
  }

  // Cart info
  async getCartItemCount(): Promise<number> {
    const cartBadge = this.page.locator('.cart-info strong').first()
    const text = await cartBadge.textContent()
    return parseInt(text || '0', 10)
  }

  // Verifications
  async verifyPageTitle(): Promise<boolean> {
    const title = await this.getPageTitle()
    return title.includes('GreenKart')
  }

  async verifyLogoVisible(): Promise<boolean> {
    return await this.isVisible(this.LOGO)
  }

  async verifySearchBoxVisible(): Promise<boolean> {
    return await this.isVisible(this.SEARCH_INPUT)
  }

  async verifyProductsDisplayed(): Promise<boolean> {
    const count = await this.getProductCount()
    return count > 0
  }
}
