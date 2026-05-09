// pages/cart.page.ts
import { Page } from '@playwright/test'
import { BasePage } from './base.page'

export interface CartItem {
  name: string
  price: number
  quantity: number
  total: number
}

export class CartPage extends BasePage {
  // Selectors
  private readonly CART_TABLE = '.cartTable'
  private readonly CART_ITEM = '.cartTable tbody tr'
  private readonly CART_ITEM_NAME = '.product-name'
  private readonly CART_ITEM_QTY = '.quantity'
  private readonly CHECKOUT_BTN = 'button:has-text("Proceed")'
  private readonly SUBTOTAL = '.totAmt'
  private readonly TOTAL_AMOUNT = '.discountAmt'
  private readonly CONTINUE_SHOPPING = 'button:has-text("Place Order")'

  constructor(page: Page) {
    super(page)
  }

  // Navigation
  async goToCart() {
    await this.navigateTo('https://rahulshettyacademy.com/seleniumPractise/#/cart')
    await this.page.locator(this.CART_TABLE).waitFor()
  }

  async continueShopping() {
    if (this.page.url().includes('/cart')) {
      await this.page.goBack()
      await this.page.locator('.products .product').first().waitFor()
      return
    }

    if (await this.page.locator('.cart-preview').isVisible()) {
      await this.page.locator('a.cart-icon').click()
    }
  }

  // Get cart contents
  async getCartItems(): Promise<CartItem[]> {
    if (await this.page.locator(this.CART_TABLE).isVisible()) {
      return await this.getCheckoutCartItems()
    }

    const itemRows = this.page.locator('.cart-preview .cart-items > li')
    const count = await itemRows.count()
    const items: CartItem[] = []

    for (let i = 0; i < count; i++) {
      const row = itemRows.nth(i)
      const name = await row.locator('.product-name').textContent()
      const price = await row.locator('.product-price').textContent()
      const qty = await row.locator('.quantity').textContent()
      const total = await row.locator('.product-total .amount').textContent()

      items.push({
        name: name?.trim() || '',
        price: parseInt(price?.replace('₹', '') || '0', 10),
        quantity: parseInt(qty || '0', 10),
        total: parseInt(total?.replace('₹', '') || '0', 10)
      })
    }

    return items
  }

  async getCartItemCount(): Promise<number> {
    if (await this.page.locator(this.CART_TABLE).isVisible()) {
      return await this.getCount(this.CART_ITEM)
    }

    return await this.getCount('.cart-preview .cart-items > li')
  }

  async verifyProductInCart(productName: string): Promise<boolean> {
    return await this.page.locator('.cart-preview .cart-items > li .product-name, .cartTable .product-name').filter({ hasText: productName }).first().isVisible()
  }

  // Get totals
  async getSubtotal(): Promise<number> {
    if (!(await this.page.locator(this.CART_TABLE).isVisible())) {
      const text = await this.page.locator('.cart-info strong').nth(1).textContent()
      return parseInt(text || '0', 10)
    }

    const text = await this.getText(this.SUBTOTAL)
    return parseInt(text.replace('₹', '').trim(), 10)
  }

  async getTaxAmount(): Promise<number> {
    return 0
  }

  async getTotal(): Promise<number> {
    if (!(await this.page.locator(this.CART_TABLE).isVisible())) {
      return await this.getSubtotal()
    }

    const text = await this.getText(this.TOTAL_AMOUNT)
    return parseInt(text.replace('₹', '').trim(), 10)
  }

  // Cart operations
  async removeItem(productName: string) {
    if (this.page.url().includes('/cart')) {
      await this.page.goBack()
      await this.page.locator('.products .product').first().waitFor()
    }

    if (!(await this.page.locator('.cart-preview').isVisible())) {
      await this.page.locator('a.cart-icon').click()
    }

    const itemRow = this.page.locator('.cart-preview .cart-items > li').filter({ hasText: productName })
    await itemRow.locator('a').last().click()
    await this.page.waitForTimeout(250)
  }

  async removeAllItems() {
    const items = await this.getCartItems()
    for (const item of items) {
      await this.removeItem(item.name)
    }
  }

  async modifyQuantity(productName: string, newQuantity: number) {
    const rowSelector = await this.page.locator(this.CART_TABLE).isVisible()
      ? this.CART_ITEM
      : '.cart-preview .cart-items > li'
    const row = this.page.locator(rowSelector).filter({ hasText: productName })
    await row.waitFor()
  }

  async proceedToCheckout() {
    await this.click(this.CHECKOUT_BTN)
  }

  // Verifications
  async isCartEmpty(): Promise<boolean> {
    return (await this.page.locator('.cart-preview .cart-items > li, .cartTable tbody tr').count()) === 0
  }

  async verifyCartNotEmpty(): Promise<boolean> {
    const count = await this.getCartItemCount()
    return count > 0
  }

  async verifyCartCalculations(): Promise<boolean> {
    const items = await this.getCartItems()
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const actualSubtotal = await this.getSubtotal()
    
    return subtotal === actualSubtotal
  }

  async verifyCheckoutButtonEnabled(): Promise<boolean> {
    return await this.isEnabled(this.CHECKOUT_BTN)
  }

  // Calculate expected total
  async calculateExpectedTotal(): Promise<number> {
    const subtotal = await this.getSubtotal()
    const tax = await this.getTaxAmount()
    return subtotal + tax
  }

  private async getCheckoutCartItems(): Promise<CartItem[]> {
    const itemRows = this.page.locator(this.CART_ITEM)
    const count = await itemRows.count()
    const items: CartItem[] = []

    for (let i = 0; i < count; i++) {
      const row = itemRows.nth(i)
      const name = await row.locator(this.CART_ITEM_NAME).textContent()
      const qty = await row.locator(this.CART_ITEM_QTY).textContent()
      const amounts = row.locator('.amount')
      const price = await amounts.first().textContent()
      const total = await amounts.nth(1).textContent()

      items.push({
        name: name?.trim() || '',
        price: parseInt(price?.replace('₹', '') || '0', 10),
        quantity: parseInt(qty || '0', 10),
        total: parseInt(total?.replace('₹', '') || '0', 10)
      })
    }

    return items
  }
}
