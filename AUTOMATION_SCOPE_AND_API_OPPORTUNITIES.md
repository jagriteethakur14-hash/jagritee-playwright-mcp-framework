# GreenKart Automation Scope & API/UI Opportunities

## Executive Summary

This document outlines the **comprehensive automation scope** for the GreenKart ecommerce application, **edge cases to test**, and **API/UI integration opportunities**.

---

## 1. AUTOMATION SCOPE

### ✅ IN SCOPE - Recommended for Automation

#### Functional Testing (High Priority)
- **Product Browsing**
  - ✅ Product grid display and layout
  - ✅ Product image rendering
  - ✅ Product name and price display
  - ✅ Pagination/lazy loading (if applicable)
  - ✅ Product count verification

- **Search Functionality**
  - ✅ Basic text search
  - ✅ Search result filtering
  - ✅ Search validation (valid/invalid inputs)
  - ✅ Clear search and reset
  - ✅ Case-insensitive search

- **Quantity Management**
  - ✅ Increment/decrement buttons
  - ✅ Direct quantity input
  - ✅ Min/max boundary validation
  - ✅ Non-numeric input rejection
  - ✅ Quantity persistence

- **Add to Cart**
  - ✅ Add single product
  - ✅ Add multiple products
  - ✅ Add with custom quantity
  - ✅ Cart counter update
  - ✅ Add same product twice
  - ✅ Price calculation accuracy

- **Shopping Cart Operations**
  - ✅ View cart contents
  - ✅ Verify items in cart
  - ✅ Modify quantity in cart
  - ✅ Remove items from cart
  - ✅ Clear entire cart
  - ✅ Cart total calculations
  - ✅ Subtotal, tax, and grand total

- **Navigation**
  - ✅ Home page navigation
  - ✅ Cart page access
  - ✅ Top Deals navigation
  - ✅ Logo click behavior
  - ✅ Browser back/forward buttons
  - ✅ Link external navigation

#### Data Validation & Error Handling
- ✅ Empty cart handling
- ✅ Invalid quantity input
- ✅ Price calculation accuracy
- ✅ Session timeout handling
- ✅ Duplicate product handling

#### E2E & Integration Tests
- ✅ Complete shopping workflow
- ✅ Search → Add → Checkout flow
- ✅ Multi-product purchase
- ✅ Cart modification workflows
- ✅ Cross-page navigation consistency

#### Positive & Negative Scenarios
- ✅ Valid data processing
- ✅ Invalid input rejection
- ✅ Boundary condition handling
- ✅ Error message display

---

### ❌ OUT OF SCOPE - Not Recommended for Initial Automation

#### Performance & Load Testing
- ❌ Load testing with 1000+ concurrent users
- ❌ Stress testing and breaking point analysis
- ❌ Database performance metrics
- ❌ Server response time under load
- ⚠️ **Recommendation**: Use separate load testing tools (JMeter, Gatling)

#### Security Testing
- ❌ SQL injection vulnerabilities
- ❌ XSS (Cross-Site Scripting) testing
- ❌ CSRF protection verification
- ❌ Authentication bypass attempts
- ❌ SSL/TLS certificate validation
- ⚠️ **Recommendation**: Use dedicated security testing tools (OWASP)

#### Payment Processing
- ❌ Actual payment transactions
- ❌ Payment gateway integration
- ❌ Credit card validation
- ❌ Transaction rollback testing
- ⚠️ **Recommendation**: Mock payment API for testing

#### Backend API Testing
- ❌ Direct API endpoint testing (separate from UI)
- ❌ Database state verification (except via UI)
- ❌ Server-side validation (unless affecting UI)
- ⚠️ **Recommendation**: API tests handled by backend team

#### Browser Compatibility
- ❌ Testing on 20+ browser versions
- ⚠️ **Recommendation**: Focus on latest 2 versions of major browsers (Chrome, Firefox, Safari, Edge)

#### Mobile/Responsive Testing (Initial)
- ⚠️ **Consider for Phase 2**: After desktop automation is stable
- **Devices to Test**: iPad, iPhone 12, Samsung Galaxy

---

## 2. EDGE CASES & BOUNDARY CONDITIONS

### Input Validation Edge Cases

| # | Edge Case | Input | Expected Behavior | Test Category |
|---|-----------|-------|-------------------|----------------|
| EC-001 | Negative quantity | -5 | Rejected or converted to positive | Input Validation |
| EC-002 | Zero quantity | 0 | Not allowed or error message | Boundary |
| EC-003 | Decimal quantity | 2.5 | Accepted as integer or rejected | Input Validation |
| EC-004 | Very large quantity | 999999 | Handled gracefully, limited if needed | Boundary |
| EC-005 | Special characters | @#$%^&* | Rejected for numeric field | Input Validation |
| EC-006 | Whitespace | "  5  " | Trimmed and accepted as 5 | Input Validation |
| EC-007 | Empty input | "" | Shows default (1) or error | Input Validation |
| EC-008 | Non-ASCII characters | "५ • ∞" | Rejected or sanitized | Input Validation |

### Product & Price Edge Cases

| # | Edge Case | Scenario | Expected Behavior | Test Category |
|---|-----------|----------|-------------------|----------------|
| EC-010 | Highest price product | Add Strawberry (₹180) | Correct price calculation | Price Calculation |
| EC-011 | Lowest price product | Add Tomato (₹16) | Correct price calculation | Price Calculation |
| EC-012 | Premium quantity unit | Add Raspberry (1/4 Kg) | Unit displays correctly | Data Display |
| EC-013 | Product out of stock | (If applicable) | Shows OOS status | State Management |
| EC-014 | Duplicate products | Add same item twice | Merge or list separately | Cart Management |
| EC-015 | Price with decimals | ₹35.50 | Displayed and calculated correctly | Price Calculation |

### Cart & Checkout Edge Cases

| # | Edge Case | Scenario | Expected Behavior | Test Category |
|---|-----------|----------|-------------------|----------------|
| EC-020 | Many items (20+) | Add 20 different products | All items retained in cart | State Management |
| EC-021 | Remove all items | Delete each item one by one | Empty cart message appears | Cart Operations |
| EC-022 | Modify qty to 0 | Change product qty to 0 | Item removed or error shown | Input Validation |
| EC-023 | Large total amount | Multiple high-priced items | Calculations accurate up to max value | Price Calculation |
| EC-024 | Tax calculation | Various subtotals | Tax calculated at correct rate (5%) | Price Calculation |
| EC-025 | Checkout empty cart | Click checkout with no items | Disabled or error message | Validation |

### Search Edge Cases

| # | Edge Case | Search Term | Expected Behavior | Test Category |
|---|-----------|------------|-------------------|----------------|
| EC-030 | Empty search | "" | All products or no action | Input Validation |
| EC-031 | Special characters | "$$$" "!!!" | Handled gracefully | Input Validation |
| EC-032 | Very long string | 100+ characters | Handled, truncated if needed | Input Validation |
| EC-033 | Numeric search | "123" | Returns results if applicable | Search Functionality |
| EC-034 | Case sensitivity | "APPLE" "apple" "Apple" | All return results (case-insensitive) | Search Functionality |
| EC-035 | Partial match | "Bro" (for Broccoli) | Relevant products shown | Search Functionality |
| EC-036 | No results | "xyz123xyz" | "No products found" message | Search Functionality |
| EC-037 | Whitespace | "  carrot  " | Trimmed and searched | Input Validation |

### Navigation & State Edge Cases

| # | Edge Case | Action | Expected Behavior | Test Category |
|---|-----------|--------|-------------------|----------------|
| EC-040 | Multiple cart access | Open cart 5 times | Consistent state each time | State Management |
| EC-041 | Rapid clicks | Click ADD TO CART 10x rapidly | No duplicate adds or proper queuing | Race Condition |
| EC-042 | Browser back button | Cart → Back → Forward | State preserved or reloaded correctly | Navigation |
| EC-043 | Direct URL access | Navigate to #/cart directly | Cart page loads correctly | Navigation |
| EC-044 | Page refresh | Add item then F5 | Item persists or clears based on implementation | State Management |
| EC-045 | Multiple tabs | Same app in 2 tabs | Cart state sync between tabs | State Management |

### Calculation Edge Cases

| # | Edge Case | Calculation | Expected Behavior | Test Category |
|---|-----------|-------------|-------------------|----------------|
| EC-050 | Single low-price item | 1 × Tomato (₹16) | Correct subtotal (₹16) | Price Calculation |
| EC-051 | Multiple items | 1×120 + 2×56 + 3×16 | Correct total (₹288) | Price Calculation |
| EC-052 | High quantity × high price | 50 × ₹180 | Correct total (₹9000) | Price Calculation |
| EC-053 | Tax on odd amount | Subtotal ₹567, tax 5% | Correct tax amount (₹28.35) | Price Calculation |
| EC-054 | Rounding issues | Multiple items with tax | No rounding errors or correct rounding | Price Calculation |
| EC-055 | Zero subtotal | Remove all items | Correct calculation (₹0) | Price Calculation |

---

## 3. API/UI OPPORTUNITIES & HYBRID TESTING

### Potential API Endpoints (Discovered via DevTools)

Based on typical ecommerce applications, likely endpoints include:

```
GET /api/products                    # Fetch all products
POST /api/cart                       # Add item to cart
GET /api/cart                        # Get cart contents
PUT /api/cart/{itemId}               # Update cart item
DELETE /api/cart/{itemId}            # Remove item
GET /api/search?q={query}            # Search products
GET /api/offers                      # Get active deals
POST /api/checkout                   # Initiate checkout
GET /api/checkout/{orderId}          # Get order status
```

### API Testing Opportunities

#### 1. Data Validation via API
```typescript
test('Verify API returns product data correctly', async ({ request }) => {
  const response = await request.get('/api/products')
  expect(response.ok()).toBeTruthy()
  
  const products = await response.json()
  expect(products[0]).toHaveProperty('name')
  expect(products[0]).toHaveProperty('price')
  expect(products[0].price).toBeGreaterThan(0)
})
```

#### 2. Cart Sync Testing
```typescript
test('Cart state syncs between UI and API', async ({ page, request }) => {
  // Add via UI
  const homePage = new HomePage(page)
  await homePage.addProductToCart('Apple', 2)
  
  // Verify via API
  const cartResponse = await request.get('/api/cart')
  const apiCart = await cartResponse.json()
  
  expect(apiCart.items).toHaveLength(1)
  expect(apiCart.items[0].quantity).toBe(2)
})
```

#### 3. Error Handling
```typescript
test('API handles invalid requests gracefully', async ({ request }) => {
  // Invalid product ID
  const response = await request.post('/api/cart', {
    data: { productId: 'invalid', quantity: -1 }
  })
  
  expect(response.status()).toBe(400)
  const error = await response.json()
  expect(error.message).toBeDefined()
})
```

#### 4. Performance Comparison
```typescript
test('Verify API response time acceptable', async ({ request }) => {
  const startTime = Date.now()
  await request.get('/api/products')
  const duration = Date.now() - startTime
  
  expect(duration).toBeLessThan(1000) // Should respond in < 1 second
})
```

### Hybrid Testing Strategy

#### Phase 1: UI Testing (Current)
- Focus on user interactions
- Verify UI displays data correctly
- Test workflows and navigation

#### Phase 2: API Testing (Recommended)
- Extract API mocking/stubbing
- Test backend validations
- Verify data consistency
- Test error responses

#### Phase 3: Hybrid Testing (Advanced)
```typescript
// Use API for setup, UI for validation
test('E2E with API setup and UI validation', async ({ page, request }) => {
  // Setup: Add product via API
  await request.post('/api/cart', {
    data: { productId: 'apple', quantity: 2 }
  })
  
  // Action: Navigate to UI
  const cartPage = new CartPage(page)
  await cartPage.goToCart()
  
  // Verify: Check UI displays correct data
  const items = await cartPage.getCartItems()
  expect(items[0].quantity).toBe(2)
})
```

### API Mocking for Test Isolation
```typescript
// Mock API responses for faster, more reliable tests
test.describe('Cart operations with mocked API', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('/api/cart', route => {
      route.abort() // Or route.continue with mock data
    })
  })
  
  test('Add to cart with mocked API', async ({ page }) => {
    // Test proceeds without hitting real API
  })
})
```

### CI/CD Integration Benefits

**API Testing Integration:**
- Faster test execution with mocked APIs
- Reduced external dependencies
- Better test stability
- Easier debugging
- Cost reduction (no external services)

**Suggested CI Pipeline:**
```bash
# Unit/Integration: 2 minutes
npm run test:api

# UI Smoke: 5 minutes  
npm run test:ui:smoke

# Full UI Suite: 30 minutes
npm run test:ui:full

# E2E with APIs: 20 minutes
npm run test:e2e

# Total Pipeline: ~60 minutes
```

---

## 4. RECOMMENDATIONS SUMMARY

### Immediate Actions (Sprint 1)
- ✅ Implement Page Object Model structure
- ✅ Create 50+ functional test cases
- ✅ Setup CI/CD pipeline
- ✅ Configure HTML reporting
- ✅ Document test data

### Short Term (Sprint 2-3)
- ✅ Expand to 100+ test cases
- ✅ Add API integration testing
- ✅ Implement test data management
- ✅ Setup test dashboard
- ✅ Cross-browser execution

### Medium Term (Sprint 4-6)
- ✅ Mobile/Responsive testing
- ✅ Performance baselines
- ✅ Advanced API testing
- ✅ Test result analytics
- ✅ Defect trend analysis

### Long Term (Ongoing)
- ✅ ML-based test recommendations
- ✅ Visual regression testing
- ✅ Security testing integration
- ✅ Load testing integration
- ✅ Continuous optimization

---

## 5. SUCCESS METRICS

### Coverage Targets
- **Feature Coverage**: 85%+
- **Code Path Coverage**: 75%+
- **Business Scenario Coverage**: 90%+

### Quality Targets
- **Test Pass Rate**: 95%+ (excluding flaky tests)
- **Critical Path Pass Rate**: 100%
- **Defect Detection Rate**: 80%+ of production bugs caught in testing

### Performance Targets
- **Test Execution Time**: < 1 hour full suite
- **Smoke Test Time**: < 10 minutes
- **CI/CD Pipeline**: < 2 hours total

### Maintenance
- **Test Maintenance Ratio**: < 10% of development time
- **Flaky Test Rate**: < 2%
- **Test Review Cycle**: < 1 week for new tests

---

## 6. ROLLOUT TIMELINE

```
Week 1-2:  Infrastructure & Setup
          - Playwright configuration
          - Page Object Models
          - Test data fixtures

Week 3-4:  Core Functional Tests
          - Home page tests (10 tests)
          - Cart tests (15 tests)
          - Search tests (8 tests)

Week 5-6:  Advanced Tests
          - Quantity controls (7 tests)
          - Edge cases (15 tests)
          - E2E workflows (6 tests)

Week 7-8:  Integration & CI/CD
          - API testing
          - CI/CD setup
          - Reporting dashboard

Week 9+:   Maintenance & Enhancement
          - Monitoring
          - Defect analysis
          - Continuous improvement
```

---

## 📚 Reference Documentation

See companion documents:
- **GreenKart_Test_Plan.md** - Comprehensive test plan
- **AUTOMATION_STRUCTURE.md** - Detailed automation structure
- **Implementation examples** - Page Objects, Test fixtures, Test cases

---

**Document Version**: 1.0  
**Last Updated**: May 2026  
**Status**: Ready for Implementation
