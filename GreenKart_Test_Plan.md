# GreenKart Application - Comprehensive Test Plan

## Executive Summary
GreenKart is an ecommerce application for buying vegetables and fruits online. It features product browsing, cart management, search functionality, and promotional deals.

---

## 1. FUNCTIONAL TEST PLAN

### 1.1 Home Page & Product Browsing
**Module:** Product Catalog Display

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-HP-001 | Verify home page loads | Home page should load with all products visible | Page loads successfully with product grid |
| TC-HP-002 | Verify product grid layout | All products should be displayed in a responsive grid | Products displayed in consistent grid format |
| TC-HP-003 | Verify product card structure | Each product card should contain: image, name, price, qty controls, ADD TO CART button | All elements present and visible |
| TC-HP-004 | Verify product images load | All product images should load correctly | Images render without errors |
| TC-HP-005 | Verify product names are correct | Product names should match expected catalog | Correct product names displayed |
| TC-HP-006 | Verify product prices display | Prices should be in INR (₹) format | Prices displayed with ₹ symbol |
| TC-HP-007 | Verify price accuracy | Prices match the product specifications | Accurate pricing information |
| TC-HP-008 | Verify quantity unit variations | Some products show different units (1 Kg vs 1/4 Kg) | Units display correctly (Premium fruits) |

### 1.2 Product Navigation
**Module:** Product Browsing Controls

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-NAV-001 | Verify page scrolling | User can scroll through products | Smooth scrolling, all products accessible |
| TC-NAV-002 | Verify product count | Total number of products available | ~28-30 products visible |
| TC-NAV-003 | Verify product visibility | All products load without pagination issues | All products visible on single page or with lazy loading |

### 1.3 Quantity Controls
**Module:** Quantity Selection

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-QTY-001 | Verify default quantity | Default quantity should be 1 | Spinbutton shows "1" by default |
| TC-QTY-002 | Increment quantity | Click + button should increase quantity by 1 | Quantity increments correctly |
| TC-QTY-003 | Decrement quantity | Click - button should decrease quantity by 1 | Quantity decrements correctly |
| TC-QTY-004 | Verify minimum quantity | Quantity should not go below 1 | - button disabled or no change when qty=1 |
| TC-QTY-005 | Verify maximum quantity | User should be able to set reasonable max quantity | Quantity increases without unreasonable limits |
| TC-QTY-006 | Direct quantity input | User should be able to type quantity in spinbutton | Quantity updates on direct input |
| TC-QTY-007 | Non-numeric input | Invalid characters should be rejected | Only numeric values accepted |

### 1.4 Add to Cart Functionality
**Module:** Shopping Cart Management

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-CART-001 | Add single product | Click ADD TO CART for single product | Product added to cart, success message shown |
| TC-CART-002 | Add multiple products | Add different products to cart | All products reflected in cart |
| TC-CART-003 | Add same product multiple times | Add same product with different quantities | Quantities merge or display separately |
| TC-CART-004 | Verify quantity in cart | Quantity from product page should match cart | Correct quantity in cart |
| TC-CART-005 | Cart counter update | Cart icon should show item count | Counter increases after adding item |
| TC-CART-006 | Add to cart with qty=1 | Adding with default quantity | Single item added |
| TC-CART-007 | Add to cart with qty>1 | Add with custom quantity | Correct quantity added to cart |
| TC-CART-008 | Verify price calculation | Total price = price × quantity | Correct calculation in cart |
| TC-CART-009 | Add with 0 quantity | System should prevent adding 0 qty items | Validation error or button disabled |

### 1.5 Search Functionality
**Module:** Product Search

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-SEARCH-001 | Search by product name | Enter product name in search box | Matching products displayed |
| TC-SEARCH-002 | Search partial text | Search for partial product name | Relevant products shown |
| TC-SEARCH-003 | Case insensitive search | Search in different cases | Results returned regardless of case |
| TC-SEARCH-004 | Search no results | Search for non-existent product | "No products found" message or empty results |
| TC-SEARCH-005 | Clear search | Clear search box and reset | All products displayed again |
| TC-SEARCH-006 | Search with special characters | Search with numbers/symbols | Handled appropriately |
| TC-SEARCH-007 | Search button functionality | Click search button vs Enter key | Both methods work |

### 1.6 Cart Page Operations
**Module:** Shopping Cart View & Management

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-CARTPAGE-001 | View cart | Click Cart link to view cart | Cart page displays all items |
| TC-CARTPAGE-002 | Verify cart items | All added items visible in cart | Correct items with quantities |
| TC-CARTPAGE-003 | Verify cart totals | Subtotal, taxes, grand total calculations | Accurate calculations |
| TC-CARTPAGE-004 | Modify quantity in cart | Change quantity of item in cart | Totals recalculate |
| TC-CARTPAGE-005 | Remove item from cart | Delete item from cart | Item removed, totals updated |
| TC-CARTPAGE-006 | Empty cart | Remove all items | Empty cart message displayed |
| TC-CARTPAGE-007 | Proceed to checkout | Checkout button functionality | Navigates to checkout/payment |
| TC-CARTPAGE-008 | Continue shopping | Link to go back to products | Returns to home/browse page |

### 1.7 Top Deals / Offers Page
**Module:** Promotional Offers

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-DEALS-001 | Navigate to Top Deals | Click Top Deals link | Offers page loads |
| TC-DEALS-002 | View deal products | Products with discounts displayed | Deal products shown with discount info |
| TC-DEALS-003 | Deal validity | Verify deal period/timing | Valid deals shown |
| TC-DEALS-004 | Add deal product to cart | Add discounted product | Discount price added to cart |
| TC-DEALS-005 | Compare deal price | Original vs deal price | Price difference displayed |

### 1.8 Navigation & Page Structure
**Module:** Site Navigation

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-NAV-001 | GREENKART logo click | Clicking logo redirects to home | Returns to home page |
| TC-NAV-002 | Top Deals link | Navigate to deals page | Deals page loads |
| TC-NAV-003 | Flight Booking link | Click Flight Booking | External page opens/loads |
| TC-NAV-004 | Cart icon | Click cart icon | Cart page displays |
| TC-NAV-005 | TechSmartHire link | Click recruiter link | External site opens |
| TC-NAV-006 | Browser back button | Navigate back from cart | Returns to previous page |

### 1.9 Validation & Error Handling
**Module:** Data Validation

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-VAL-001 | Empty cart checkout | Proceed to checkout with empty cart | Error message or disabled checkout |
| TC-VAL-002 | Invalid quantity input | Enter non-numeric or negative quantity | Validation error or reset to default |
| TC-VAL-003 | Price validation | Check price calculations | No mathematical errors |
| TC-VAL-004 | Session timeout | Idle for extended period | Session handled appropriately |

### 1.10 Performance & UX
**Module:** User Experience

| # | Test Case | Description | Expected Result |
|---|-----------|-------------|-----------------|
| TC-PERF-001 | Page load time | Home page should load quickly | < 3 seconds load time |
| TC-PERF-002 | Search responsiveness | Search results appear quickly | < 1 second response |
| TC-PERF-003 | Responsive design | Test on different screen sizes | Adapts to mobile/tablet/desktop |
| TC-PERF-004 | Button responsiveness | Buttons respond immediately | No lag in clicks |
| TC-PERF-005 | Image optimization | Images load without impacting performance | Lazy loading if applicable |

---

## 2. AUTOMATION SCOPE

### In Scope
✅ **Functional Testing**
- Product browsing and filtering
- Quantity selection and modifications
- Add to cart operations
- Cart management (view, modify, remove, checkout)
- Search functionality
- Navigation between pages
- Price calculations and validations
- Data validations

✅ **Positive Scenarios**
- Valid product addition
- Correct calculations
- Proper navigation

✅ **Negative Scenarios**
- Invalid inputs
- Boundary conditions (min/max quantities)
- Empty cart operations
- Invalid searches

✅ **UI Automation**
- Element interactions (clicks, inputs)
- Form submissions
- Dynamic content validation

### Out of Scope
❌ **Performance Testing**
- Load testing with high concurrent users
- Stress testing
- Database performance

❌ **Security Testing**
- SQL injection
- XSS vulnerabilities
- Authentication/Authorization (if applicable)

❌ **API Testing** (if separate from UI)
- Backend API testing
- Database verification (except through UI)

❌ **Payment Processing**
- Actual payment transactions
- Payment gateway integration

❌ **Browser Compatibility** (Initial Scope)
- Cross-browser testing (can be added later)
- Legacy browser support

---

## 3. HIGH PRIORITY TEST SCENARIOS

### Critical Path - Happy Path
1. **User Product Browse → Select Quantity → Add to Cart → View Cart → Checkout**
   - Scenario: User adds 1 Broccoli + 2 Tomato to cart and proceeds to checkout
   - Expected: Cart shows 1 × ₹120 + 2 × ₹16 = ₹152 total

2. **Search and Add to Cart**
   - Scenario: Search "carrot", add 3 units to cart
   - Expected: Search filters products, Carrot added with qty 3

3. **Multiple Product Addition**
   - Scenario: Add 3 different products with varying quantities
   - Expected: All items in cart with correct quantities and totals

### Boundary Conditions
4. **Minimum Quantity Purchase**
   - Scenario: Add product with quantity = 1
   - Expected: Validation passes, item added

5. **High Quantity Purchase**
   - Scenario: Add product with quantity = 99
   - Expected: Handles large quantities appropriately

6. **Zero Quantity Attempt**
   - Scenario: Try to add with quantity = 0
   - Expected: Validation error or prevented action

### State Management
7. **Cart Persistence**
   - Scenario: Add items, navigate away, return to cart
   - Expected: Items persist in cart

8. **Cart After Search**
   - Scenario: Add items, search for product, add another, view cart
   - Expected: All items from different actions present in cart

---

## 4. EDGE CASES

### Input Validation Edge Cases
| # | Edge Case | Test Action | Expected Behavior |
|---|-----------|------------|-------------------|
| EC-001 | Negative quantity | Enter -5 in qty field | Rejected or converted to positive |
| EC-002 | Zero quantity | Enter 0 | Not allowed or error message |
| EC-003 | Decimal quantity | Enter 2.5 | Accepted as 2 or rejected |
| EC-004 | Very large number | Enter 999999 | Handled gracefully, limited if needed |
| EC-005 | Special characters in qty | Enter @#$% | Rejected, only numeric allowed |
| EC-006 | Space in qty | Enter " 5 " | Trimmed and accepted as 5 |

### Product & Price Edge Cases
| # | Edge Case | Test Action | Expected Behavior |
|---|-----------|------------|-------------------|
| EC-010 | Highest price product | Add Strawberry (₹180/1/4 Kg) | Correct price and calculation |
| EC-011 | Lowest price product | Add Tomato/Onion (₹16) | Correct price calculation |
| EC-012 | Premium quantity unit | Add Raspberry (1/4 Kg) | Correct unit display |
| EC-013 | Duplicate product add | Add Broccoli twice with different qty | Merge or separate entries |

### Cart & Checkout Edge Cases
| # | Edge Case | Test Action | Expected Behavior |
|---|-----------|------------|-------------------|
| EC-020 | Add many items (20+) | Add 20 different products | All items retained in cart |
| EC-021 | Remove all items | Delete each item from cart | Empty cart message appears |
| EC-022 | Modify qty to 0 | Change product qty to 0 in cart | Item removed or error |
| EC-023 | Calculate with taxes | Add items and view final amount | Tax calculation accurate |

### Search Edge Cases
| # | Edge Case | Test Action | Expected Behavior |
|---|-----------|------------|-------------------|
| EC-030 | Empty search | Search with empty string | All products or no action |
| EC-031 | Search special characters | Search "$$$" or "@@" | Handled gracefully |
| EC-032 | Search long string | Enter 100+ characters | Handled, truncated if needed |
| EC-033 | Search numeric product ID | If products have IDs | ID search works |

### Navigation Edge Cases
| # | Edge Case | Test Action | Expected Behavior |
|---|-----------|------------|-------------------|
| EC-040 | Multiple cart access | Open cart, close, open again | Consistent state |
| EC-041 | Rapid clicks | Click ADD TO CART rapidly | No duplicate adds/proper queuing |
| EC-042 | Browser back from cart | Use browser back button | Previous page state preserved |

---

## 5. SUGGESTED PLAYWRIGHT AUTOMATION STRUCTURE

### Project Structure
```
playwright-test-suite/
├── tests/
│   ├── home/
│   │   ├── product-browsing.spec.ts
│   │   ├── product-grid.spec.ts
│   │   └── navigation.spec.ts
│   ├── cart/
│   │   ├── add-to-cart.spec.ts
│   │   ├── cart-operations.spec.ts
│   │   ├── cart-calculations.spec.ts
│   │   └── cart-checkout.spec.ts
│   ├── search/
│   │   ├── search-functionality.spec.ts
│   │   └── search-filters.spec.ts
│   ├── quantity/
│   │   ├── quantity-controls.spec.ts
│   │   └── quantity-validation.spec.ts
│   ├── edge-cases/
│   │   ├── input-validation.spec.ts
│   │   ├── boundary-values.spec.ts
│   │   └── state-management.spec.ts
│   ├── deals/
│   │   └── top-deals.spec.ts
│   └── e2e/
│       ├── complete-shopping-flow.spec.ts
│       ├── multi-product-purchase.spec.ts
│       └── search-and-purchase.spec.ts
│
├── pages/
│   ├── base.page.ts
│   ├── home.page.ts
│   ├── product-card.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── search.page.ts
│   └── navigation.page.ts
│
├── fixtures/
│   ├── test-data.ts
│   ├── api-fixtures.ts
│   └── ui-fixtures.ts
│
├── utils/
│   ├── helpers.ts
│   ├── constants.ts
│   ├── assertions.ts
│   └── test-utils.ts
│
├── config/
│   ├── playwright.config.ts
│   ├── test-config.ts
│   └── environment.config.ts
│
└── reports/
    └── [generated test reports]
```

### Page Object Model (POM) Structure

#### Base Page Class
```typescript
// pages/base.page.ts
export class BasePage {
  constructor(protected page: Page) {}
  
  async navigateTo(url: string)
  async waitForElement(selector: string)
  async isElementVisible(selector: string)
  async clickElement(selector: string)
  async fillInput(selector: string, value: string)
  async getText(selector: string)
  async getMultipleTexts(selector: string)
}
```

#### Home Page
```typescript
// pages/home.page.ts
export class HomePage extends BasePage {
  // Selectors
  private productCard = '.product-card'
  private addToCartButton = 'button:has-text("ADD TO CART")'
  private quantitySpinbutton = 'input[role="spinbutton"]'
  private incrementQtyButton = 'button:has-text("+")'
  private decrementQtyButton = 'button:has-text("-")'
  private searchInput = 'input[placeholder*="Search"]'
  private searchButton = 'button:has-text("Search")'
  private cartIcon = 'img[alt="Cart"]'
  private topDealsLink = 'a:has-text("Top Deals")'
  
  // Actions
  async addProductToCart(productName: string, quantity: number)
  async searchProduct(productName: string)
  async getProductPrice(productName: string)
  async incrementQuantity(productName: string)
  async decrementQuantity(productName: string)
  async setQuantity(productName: string, qty: number)
  async getCartItemCount()
  async navigateToCart()
  async navigateToTopDeals()
  async getProductCount()
  async verifyProductExists(productName: string)
}
```

#### Cart Page
```typescript
// pages/cart.page.ts
export class CartPage extends BasePage {
  // Selectors
  private cartItem = '.cart-item'
  private cartTotal = '.cart-total'
  private removeButton = 'button:has-text("Remove")'
  private checkoutButton = 'button:has-text("Checkout")'
  private continueShopping = 'a:has-text("Continue Shopping")'
  
  // Actions
  async getCartItems()
  async getCartTotal()
  async removeItem(productName: string)
  async modifyQuantity(productName: string, newQty: number)
  async proceedToCheckout()
  async verifyCartEmpty()
  async calculateExpectedTotal(items: CartItem[])
}
```

### Test Fixtures

#### Test Data
```typescript
// fixtures/test-data.ts
export const PRODUCTS = {
  BROCCOLI: { name: 'Broccoli - 1 Kg', price: 120 },
  CARROT: { name: 'Carrot - 1 Kg', price: 56 },
  TOMATO: { name: 'Tomato - 1 Kg', price: 16 },
  // ... more products
}

export const TEST_SCENARIOS = {
  SINGLE_PRODUCT: [{ product: PRODUCTS.BROCCOLI, qty: 1 }],
  MULTI_PRODUCT: [
    { product: PRODUCTS.BROCCOLI, qty: 1 },
    { product: PRODUCTS.CARROT, qty: 2 },
    { product: PRODUCTS.TOMATO, qty: 3 }
  ],
  // ... more scenarios
}
```

### Test Example Files

#### Home Page Tests
```typescript
// tests/home/product-browsing.spec.ts
import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { PRODUCTS } from '../../fixtures/test-data'

test.describe('Product Browsing', () => {
  let homePage: HomePage
  
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/')
  })
  
  test('TC-HP-001: Verify home page loads', async () => {
    await expect(homePage.page).toHaveTitle(/GreenKart/)
  })
  
  test('TC-HP-002: Verify product grid displays all items', async () => {
    const productCount = await homePage.getProductCount()
    expect(productCount).toBeGreaterThan(20)
  })
})
```

#### Cart Tests
```typescript
// tests/cart/add-to-cart.spec.ts
test('TC-CART-001: Add single product', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  
  await homePage.addProductToCart(PRODUCTS.BROCCOLI.name, 1)
  await homePage.navigateToCart()
  
  const items = await cartPage.getCartItems()
  expect(items).toContainEqual(
    expect.objectContaining({ name: PRODUCTS.BROCCOLI.name })
  )
})
```

#### E2E Tests
```typescript
// tests/e2e/complete-shopping-flow.spec.ts
test('Complete shopping flow: Browse → Add → Checkout', async ({ page }) => {
  const homePage = new HomePage(page)
  const cartPage = new CartPage(page)
  
  // Add multiple products
  await homePage.addProductToCart(PRODUCTS.BROCCOLI.name, 2)
  await homePage.addProductToCart(PRODUCTS.CARROT.name, 1)
  
  // Navigate to cart
  await homePage.navigateToCart()
  
  // Verify cart
  const total = await cartPage.getCartTotal()
  expect(total).toBe((120 * 2) + 56)
  
  // Checkout
  await cartPage.proceedToCheckout()
})
```

### Configuration & Setup

#### Playwright Config
```typescript
// config/playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  webServer: undefined, // External URL, no server needed
})
```

---

## 6. API/UI OPPORTUNITIES

### API Endpoints (If Available)
**Note:** Suggest exploring these endpoints through browser DevTools Network tab

Potential APIs:
1. **GET /api/products**
   - Fetch all products
   - Alternatives: Product filtering, sorting
   - UI Mapping: Home page product grid

2. **POST /api/cart**
   - Add items to cart
   - UI Mapping: ADD TO CART button

3. **GET /api/cart**
   - Retrieve cart contents
   - UI Mapping: Cart page view

4. **DELETE /api/cart/{itemId}**
   - Remove items
   - UI Mapping: Remove button in cart

5. **POST /api/search**
   - Search products
   - UI Mapping: Search functionality

6. **GET /api/offers**
   - Fetch active deals
   - UI Mapping: Top Deals page

### API Testing Opportunities
- **Data Validation**: Verify API returns correct product data
- **Error Handling**: Test API with invalid payloads
- **Performance**: Compare UI + API vs UI-only performance
- **Data Consistency**: Ensure UI and API data match
- **Cart Sync**: Verify cart state across API calls

### Hybrid Testing Strategy
1. **API-First Data Setup**: Use APIs to pre-populate test data
2. **UI Validation**: Verify data displays correctly in UI
3. **API Verification**: Confirm UI changes reflected in API
4. **Performance Comparison**: UI vs API response times

### Mock API Scenarios
```typescript
// tests/api/product-api.spec.ts
test('Verify product API returns correct data', async ({ request }) => {
  const response = await request.get('/api/products')
  expect(response.ok()).toBeTruthy()
  
  const products = await response.json()
  expect(products.length).toBeGreaterThan(20)
  expect(products[0]).toHaveProperty('name')
  expect(products[0]).toHaveProperty('price')
})
```

### Integration Testing
```typescript
// tests/integration/cart-sync.spec.ts
test('Cart state syncs between UI and API', async ({ page, request }) => {
  // Add via UI
  await addProductToCartUI(page)
  
  // Verify via API
  const cartResponse = await request.get('/api/cart')
  const apiCart = await cartResponse.json()
  
  expect(apiCart.items).toHaveLength(1)
})
```

---

## 7. TEST EXECUTION STRATEGY

### Test Categories by Priority
**P0 - Critical (Must Pass)**
- Add to cart functionality
- Cart calculations
- Basic navigation
- Search functionality

**P1 - High (Should Pass)**
- Quantity controls
- Cart modifications
- Price validations
- Multiple product additions

**P2 - Medium (Should Have)**
- Top Deals navigation
- Edge case validations
- Performance checks

**P3 - Low (Nice to Have)**
- Browser compatibility
- Analytics tracking
- UI responsiveness

### Test Execution Plan
```bash
# Quick Smoke Tests (5-10 mins)
npx playwright test tests/home/ tests/cart/add-to-cart.spec.ts

# Full Functional Tests (30-45 mins)
npx playwright test tests/

# E2E & Integration (15-20 mins)
npx playwright test tests/e2e/

# Nightly Full Suite
npx playwright test --workers=1
```

---

## 8. QUALITY METRICS

### Success Criteria
- Test Coverage: ≥ 80% of features
- Test Pass Rate: ≥ 95%
- Critical Path Pass Rate: 100%
- Test Execution Time: < 1 hour for full suite

### Defect Classification
- **Critical**: App crash, data loss, security issues
- **High**: Core features broken
- **Medium**: Non-critical feature issues
- **Low**: UI/UX improvements

---

## Appendix: Product Catalog Reference

### Vegetables (14 items)
| Product | Price (₹) | Unit |
|---------|-----------|------|
| Broccoli | 120 | 1 Kg |
| Cauliflower | 60 | 1 Kg |
| Cucumber | 48 | 1 Kg |
| Beetroot | 32 | 1 Kg |
| Carrot | 56 | 1 Kg |
| Tomato | 16 | 1 Kg |
| Beans | 82 | 1 Kg |
| Brinjal | 35 | 1 Kg |
| Capsicum | 60 | - |
| Mushroom | 75 | 1 Kg |
| Potato | 22 | 1 Kg |
| Pumpkin | 48 | 1 Kg |
| Corn | 75 | 1 Kg |
| Onion | 16 | 1 Kg |

### Fruits (14+ items)
| Product | Price (₹) | Unit |
|---------|-----------|------|
| Apple | 72 | 1 Kg |
| Banana | 45 | 1 Kg |
| Grapes | 60 | 1 Kg |
| Mango | 75 | 1 Kg |
| Musk Melon | 36 | 1 Kg |
| Orange | 75 | 1 Kg |
| Pears | 69 | 1 Kg |
| Pomegranate | 95 | 1 Kg |
| Raspberry | 160 | 1/4 Kg |
| Strawberry | 180 | 1/4 Kg |
| Water Melon | 28 | 1 Kg |
