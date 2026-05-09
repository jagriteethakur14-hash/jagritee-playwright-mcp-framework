# GreenKart Playwright Test Suite - Automation Structure Guide

## 📋 Overview

This comprehensive guide documents the Playwright automation structure for testing the GreenKart ecommerce application. It includes:
- Complete test plan with functional test cases
- Page Object Model (POM) structure
- Test fixtures and data management
- Example test implementations
- Execution strategies
- CI/CD integration guidelines

---

## 📁 Project Structure

```
playwright-test-suite/
│
├── tests/                          # Test files organized by feature
│   ├── home/
│   │   ├── product-browsing.spec.ts    # Product display tests
│   │   ├── product-grid.spec.ts         # Grid layout tests
│   │   └── navigation.spec.ts            # Navigation tests
│   │
│   ├── cart/
│   │   ├── add-to-cart.spec.ts          # Add to cart functionality
│   │   ├── cart-operations.spec.ts      # Cart modifications
│   │   ├── cart-calculations.spec.ts    # Price/total calculations
│   │   └── cart-checkout.spec.ts        # Checkout flow
│   │
│   ├── search/
│   │   ├── search-functionality.spec.ts # Search feature tests
│   │   └── search-filters.spec.ts       # Filter tests
│   │
│   ├── quantity/
│   │   ├── quantity-controls.spec.ts    # Quantity +/- buttons
│   │   └── quantity-validation.spec.ts  # Quantity input validation
│   │
│   ├── edge-cases/
│   │   ├── input-validation.spec.ts     # Invalid input handling
│   │   ├── boundary-values.spec.ts      # Min/max boundary tests
│   │   └── state-management.spec.ts     # State persistence
│   │
│   ├── deals/
│   │   └── top-deals.spec.ts            # Promotional offers tests
│   │
│   └── e2e/
│       ├── complete-shopping-flow.spec.ts    # Full user journey
│       ├── multi-product-purchase.spec.ts    # Multiple item purchase
│       └── search-and-purchase.spec.ts       # Search then buy flow
│
├── pages/                          # Page Object Models
│   ├── base.page.ts                # Base page class with common methods
│   ├── home.page.ts                # Home page object model
│   ├── product-card.page.ts        # Product card interactions
│   ├── cart.page.ts                # Shopping cart page
│   ├── checkout.page.ts            # Checkout page (if applicable)
│   ├── search.page.ts              # Search functionality
│   └── navigation.page.ts          # Navigation components
│
├── fixtures/                       # Test data and fixtures
│   ├── test-data.ts                # Product data, test scenarios
│   ├── api-fixtures.ts             # API mock data (optional)
│   └── ui-fixtures.ts              # UI element fixtures
│
├── utils/                          # Utility functions
│   ├── helpers.ts                  # Common helper functions
│   ├── constants.ts                # Application constants
│   ├── assertions.ts               # Custom assertions
│   └── test-utils.ts               # Test utilities
│
├── config/                         # Configuration files
│   ├── playwright.config.ts        # Playwright configuration
│   ├── test-config.ts              # Test environment config
│   └── environment.config.ts       # Environment variables
│
├── reports/                        # Test execution reports
│   ├── html/                       # HTML test report
│   ├── json/                       # JSON results
│   └── junit/                      # JUnit XML reports
│
├── screenshots/                    # Failure screenshots
├── videos/                         # Failure videos
├── playwright-report/              # Playwright HTML report
│
├── package.json                    # NPM dependencies
├── playwright.config.ts            # Playwright config
├── tsconfig.json                   # TypeScript config
└── README.md                       # This file
```

---

## 🏗️ Architecture & Design Patterns

### Page Object Model (POM)

The test suite follows the **Page Object Model** design pattern for maintainability and scalability.

#### Base Page Class
```typescript
// pages/base.page.ts
export class BasePage {
  // Common methods used by all pages
  async click(selector: string)
  async fill(selector: string, value: string)
  async getText(selector: string): Promise<string>
  async isVisible(selector: string): Promise<boolean>
  async waitForElement(selector: string)
}
```

#### Home Page Class
```typescript
// pages/home.page.ts
export class HomePage extends BasePage {
  // Home-specific selectors and methods
  async addProductToCart(productName: string, quantity: number)
  async searchProduct(productName: string)
  async getProductPrice(productName: string): Promise<number>
  async navigateToCart()
}
```

#### Cart Page Class
```typescript
// pages/cart.page.ts
export class CartPage extends BasePage {
  // Cart-specific methods
  async getCartItems(): Promise<CartItem[]>
  async removeItem(productName: string)
  async getTotal(): Promise<number>
  async proceedToCheckout()
}
```

### Benefits of POM
- ✅ Easier test maintenance
- ✅ Reduced code duplication
- ✅ Better organization
- ✅ Easier onboarding for new team members
- ✅ Simplified element locator management

---

## 📊 Test Data Management

### Product Catalog
```typescript
// fixtures/test-data.ts
export const PRODUCTS = {
  BROCCOLI: { name: 'Brocolli - 1 Kg', price: 120 },
  CARROT: { name: 'Carrot - 1 Kg', price: 56 },
  // ... 25+ products
}
```

### Test Scenarios
```typescript
export const TEST_SCENARIOS = {
  SINGLE_PRODUCT: [/* single item */],
  MULTI_PRODUCT: [/* multiple items */],
  HIGH_VALUE_PURCHASE: [/* premium products */],
  LOW_VALUE_PURCHASE: [/* low-priced items */],
  MIXED_PURCHASE: [/* varied items */]
}
```

### Boundary Values
```typescript
export const QUANTITY_TEST_VALUES = {
  MINIMUM: 1,
  NORMAL_LOW: 2,
  NORMAL_HIGH: 10,
  BOUNDARY_HIGH: 99,
  INVALID_ZERO: 0,
  INVALID_NEGATIVE: -5,
  INVALID_DECIMAL: 2.5
}
```

---

## 🧪 Test Categories

### By Priority
| Priority | Category | Tests | Purpose |
|----------|----------|-------|---------|
| **P0** | Critical | Add to cart, Cart calc, Navigation | Core functionality |
| **P1** | High | Quantity controls, Price validation | Important features |
| **P2** | Medium | Top Deals, Edge cases, Performance | Additional scenarios |
| **P3** | Low | Browser compat, Analytics, UI UX | Nice-to-have |

### By Type
- **Smoke Tests**: Quick sanity checks
- **Functional Tests**: Feature-specific tests
- **Integration Tests**: Multi-feature workflows
- **Edge Case Tests**: Boundary and error scenarios
- **E2E Tests**: Complete user journeys
- **Performance Tests**: Load and response time

---

## 🚀 Running Tests

### Prerequisites
```bash
# Install Node.js 16+ and npm
# Clone repository
cd playwright-test-suite

# Install dependencies
npm install
```

### Run All Tests
```bash
# Execute entire test suite
npx playwright test

# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Specific Test Categories
```bash
# Only home page tests
npx playwright test tests/home/

# Only cart tests
npx playwright test tests/cart/add-to-cart.spec.ts

# Only E2E tests
npx playwright test tests/e2e/

# Only edge cases
npx playwright test tests/edge-cases/
```

### Debug Mode
```bash
# Run with inspector
npx playwright test --debug

# Run in headed mode (see browser)
npx playwright test --headed

# Verbose output
npx playwright test --reporter=list
```

### Watch Mode (useful for development)
```bash
npx playwright test --watch
```

### Single Test Execution
```bash
# Run specific test
npx playwright test --grep "TC-CART-001"

# Run tests matching pattern
npx playwright test --grep "Add to Cart"
```

---

## 📈 Test Execution Plans

### Quick Smoke Tests (5-10 minutes)
```bash
npx playwright test tests/home/product-browsing.spec.ts \
                     tests/cart/add-to-cart.spec.ts
```

### Functional Testing (30-45 minutes)
```bash
npx playwright test tests/ --exclude="tests/e2e/**"
```

### Full E2E Suite (15-20 minutes)
```bash
npx playwright test tests/e2e/
```

### Nightly Full Suite (1-2 hours)
```bash
npx playwright test --workers=1
```

### CI/CD Pipeline
```bash
# In CI environment
CI=true npx playwright test
```

---

## 🔍 Viewing Results

### HTML Report
```bash
npx playwright show-report
```
Opens interactive HTML report with:
- Test results
- Screenshots
- Videos
- Timeline

### JSON Results
```bash
cat test-results/results.json
```

### JUnit XML (for CI)
```bash
cat test-results/junit.xml
```

---

## 💡 Test Implementation Examples

### Example 1: Simple Product Browsing Test
```typescript
test('TC-HP-001: Verify home page loads', async ({ page }) => {
  const homePage = new HomePage(page)
  await homePage.navigateToHome()
  
  expect(await homePage.verifyPageTitle()).toBeTruthy()
})
```

### Example 2: Add Multiple Products
```typescript
test('TC-CART-003: Add multiple products', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  
  await homePage.addProductToCart(PRODUCTS.APPLE.name, 2)
  await homePage.addProductToCart(PRODUCTS.CARROT.name, 1)
  await homePage.navigateToCart()
  
  const items = await cartPage.getCartItems()
  expect(items).toHaveLength(2)
})
```

### Example 3: Quantity Control Test
```typescript
test('TC-QTY-005: Set custom quantity', async ({ page }) => {
  const homePage = new HomePage(page)
  
  await homePage.setQuantity(PRODUCTS.BANANA.name, 5)
  const qty = await homePage.getQuantity(PRODUCTS.BANANA.name)
  
  expect(qty).toBe(5)
})
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: GreenKart Test Suite

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🎯 Best Practices

### Test Naming
```typescript
// ✅ Good
test('TC-CART-001: Add single product to cart with default quantity')

// ❌ Bad
test('test add item')
```

### Assertions
```typescript
// ✅ Good
expect(cartTotal).toBe(expectedValue)

// ❌ Bad
expect(cartTotal).toBeTruthy()
```

### Waits
```typescript
// ✅ Good - explicit wait
await page.locator('button').waitFor()
await expect(page.locator('item')).toBeVisible()

// ❌ Bad - generic sleep
await page.waitForTimeout(5000)
```

### Data Management
```typescript
// ✅ Good - centralized test data
const item = PRODUCTS.APPLE
const qty = QUANTITY_TEST_VALUES.NORMAL_HIGH

// ❌ Bad - hardcoded values
const item = 'Apple'
const qty = 5
```

---

## 🐛 Debugging Failed Tests

### Step 1: Review Error Message
```bash
# Clear output with failure reason
npx playwright test --reporter=list
```

### Step 2: Run with Inspector
```bash
npx playwright test --debug
# Step through test in debug mode
```

### Step 3: Enable Tracing
```bash
npx playwright show-trace trace.zip
```

### Step 4: Check Screenshots
```bash
# Failed test screenshot in test-results/
ls test-results/
```

### Step 5: Review Video
```bash
# Failure videos in test-results/
open test-results/*/video.webm
```

---

## 📝 Maintenance Guidelines

### Regular Updates
- Update Playwright: `npm update @playwright/test`
- Review test results weekly
- Update test data as products change
- Fix flaky tests immediately

### Adding New Tests
1. Create in appropriate test file
2. Follow naming convention: `TC-XXX-### : Description`
3. Use Page Objects for element interactions
4. Use centralized test data
5. Add descriptive comments

### Removing Tests
1. Verify test is obsolete
2. Check for dependencies
3. Update documentation
4. Remove from reports

---

## 🎓 Learning Resources

- [Playwright Official Docs](https://playwright.dev)
- [Test Best Practices](https://playwright.dev/docs/best-practices)
- [POM Pattern Guide](https://playwright.dev/docs/pom)
- [Advanced Configuration](https://playwright.dev/docs/test-configuration)

---

## 📞 Support & Contribution

For questions or contributions:
1. Check existing issues
2. Follow code style guidelines
3. Add tests for new features
4. Update documentation

---

## 📋 Checklist for Running Tests

- [ ] Node.js 16+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] Test data fixtures available
- [ ] Network connectivity verified
- [ ] No other applications blocking ports
- [ ] Sufficient disk space for reports

---

## 🎉 Quick Start

```bash
# 1. Clone and setup
git clone <repo-url>
cd playwright-test-suite
npm install
npx playwright install

# 2. Run smoke tests
npm test

# 3. View results
npx playwright show-report

# 4. Run specific category
npm test -- tests/cart/

# 5. Debug if needed
npm test -- --debug
```

---

**Last Updated:** May 2026
**Test Suite Version:** 1.0.0
**Playwright Version:** Latest
