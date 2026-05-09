// pages/base.page.ts
import { Page, Locator } from '@playwright/test'

export class BasePage {
  protected page: Page

  constructor(page: Page) {
    this.page = page
  }

  // Navigation
  async navigateTo(url: string) {
    await this.page.goto(url)
  }

  async goToHomePage() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/#/')
  }

  // Element interactions
  async click(selector: string) {
    await this.page.locator(selector).click()
  }

  async fill(selector: string, value: string) {
    await this.page.locator(selector).fill(value)
  }

  async type(selector: string, value: string) {
    await this.page.locator(selector).type(value)
  }

  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || ''
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible()
  }

  async isEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled()
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.locator(selector).getAttribute(attribute)
  }

  async getCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count()
  }

  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.locator(selector).waitFor({ timeout })
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` })
  }

  // Page state
  async getPageTitle(): Promise<string> {
    return await this.page.title()
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url()
  }
}
