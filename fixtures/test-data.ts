// fixtures/test-data.ts

export const PRODUCTS = {
  BROCCOLI: { name: 'Brocolli - 1 Kg', price: 120 },
  CAULIFLOWER: { name: 'Cauliflower - 1 Kg', price: 60 },
  CUCUMBER: { name: 'Cucumber - 1 Kg', price: 48 },
  BEETROOT: { name: 'Beetroot - 1 Kg', price: 32 },
  CARROT: { name: 'Carrot - 1 Kg', price: 56 },
  TOMATO: { name: 'Tomato - 1 Kg', price: 16 },
  BEANS: { name: 'Beans - 1 Kg', price: 82 },
  BRINJAL: { name: 'Brinjal - 1 Kg', price: 35 },
  CAPSICUM: { name: 'Capsicum', price: 60 },
  MUSHROOM: { name: 'Mushroom - 1 Kg', price: 75 },
  POTATO: { name: 'Potato - 1 Kg', price: 22 },
  PUMPKIN: { name: 'Pumpkin - 1 Kg', price: 48 },
  CORN: { name: 'Corn - 1 Kg', price: 75 },
  ONION: { name: 'Onion - 1 Kg', price: 16 },
  APPLE: { name: 'Apple - 1 Kg', price: 72 },
  BANANA: { name: 'Banana - 1 Kg', price: 45 },
  GRAPES: { name: 'Grapes - 1 Kg', price: 60 },
  MANGO: { name: 'Mango - 1 Kg', price: 75 },
  MUSK_MELON: { name: 'Musk Melon - 1 Kg', price: 36 },
  ORANGE: { name: 'Orange - 1 Kg', price: 75 },
  PEARS: { name: 'Pears - 1 Kg', price: 69 },
  POMEGRANATE: { name: 'Pomegranate - 1 Kg', price: 95 },
  RASPBERRY: { name: 'Raspberry - 1/4 Kg', price: 160 },
  STRAWBERRY: { name: 'Strawberry - 1/4 Kg', price: 180 },
  WATER_MELON: { name: 'Water Melon - 1 Kg', price: 28 }
}

export const TEST_SCENARIOS = {
  SINGLE_PRODUCT: [
    { product: PRODUCTS.BROCCOLI, qty: 1 }
  ],
  
  MULTI_PRODUCT: [
    { product: PRODUCTS.BROCCOLI, qty: 1 },
    { product: PRODUCTS.CARROT, qty: 2 },
    { product: PRODUCTS.TOMATO, qty: 3 }
  ],
  
  HIGH_VALUE_PURCHASE: [
    { product: PRODUCTS.STRAWBERRY, qty: 2 },
    { product: PRODUCTS.RASPBERRY, qty: 1 },
    { product: PRODUCTS.POMEGRANATE, qty: 3 }
  ],
  
  LOW_VALUE_PURCHASE: [
    { product: PRODUCTS.TOMATO, qty: 5 },
    { product: PRODUCTS.ONION, qty: 3 }
  ],
  
  MIXED_PURCHASE: [
    { product: PRODUCTS.BROCCOLI, qty: 1 },
    { product: PRODUCTS.APPLE, qty: 2 },
    { product: PRODUCTS.POTATO, qty: 2 },
    { product: PRODUCTS.MANGO, qty: 1 }
  ]
}

export const SEARCH_KEYWORDS = {
  VALID: ['Broccoli', 'Carrot', 'Apple', 'Tomato', 'Mango'],
  PARTIAL: ['Bro', 'Car', 'App'],
  SPECIAL_CHARS: ['@#$', '***', '!!!'],
  EMPTY: '',
  LONG_STRING: 'a'.repeat(100),
  NON_EXISTENT: 'xyz123nonexistent'
}

export const QUANTITY_TEST_VALUES = {
  MINIMUM: 1,
  NORMAL_LOW: 2,
  NORMAL_HIGH: 10,
  BOUNDARY_HIGH: 99,
  INVALID_ZERO: 0,
  INVALID_NEGATIVE: -5,
  INVALID_DECIMAL: 2.5,
  INVALID_CHARS: '@@@'
}

export const PRICE_RANGES = {
  PREMIUM: { min: 150, max: 200 }, // Strawberry, Raspberry
  HIGH: { min: 70, max: 95 },      // Broccoli, Mango, etc.
  MEDIUM: { min: 40, max: 69 },    // Most vegetables
  LOW: { min: 16, max: 35 }        // Tomato, Onion, Carrot, etc.
}

export const TAX_RATE = 0.05 // 5% tax assumption

export const TEST_URLs = {
  HOME: 'https://rahulshettyacademy.com/seleniumPractise/#/',
  CART: 'https://rahulshettyacademy.com/seleniumPractise/#/cart',
  OFFERS: 'https://rahulshettyacademy.com/seleniumPractise/#/offers'
}

// Test data for edge cases
export const EDGE_CASE_DATA = {
  EMPTY_CART: [],
  SINGLE_ITEM: [{ product: PRODUCTS.APPLE, qty: 1 }],
  DUPLICATE_PRODUCTS: [
    { product: PRODUCTS.CARROT, qty: 2 },
    { product: PRODUCTS.CARROT, qty: 3 }
  ],
  LARGE_CART: [
    { product: PRODUCTS.BROCCOLI, qty: 1 },
    { product: PRODUCTS.CAULIFLOWER, qty: 1 },
    { product: PRODUCTS.CUCUMBER, qty: 1 },
    { product: PRODUCTS.BEETROOT, qty: 1 },
    { product: PRODUCTS.CARROT, qty: 1 },
    { product: PRODUCTS.TOMATO, qty: 1 },
    { product: PRODUCTS.BEANS, qty: 1 },
    { product: PRODUCTS.BRINJAL, qty: 1 },
    { product: PRODUCTS.CAPSICUM, qty: 1 },
    { product: PRODUCTS.MUSHROOM, qty: 1 },
    { product: PRODUCTS.POTATO, qty: 1 },
    { product: PRODUCTS.PUMPKIN, qty: 1 },
    { product: PRODUCTS.CORN, qty: 1 },
    { product: PRODUCTS.ONION, qty: 1 },
    { product: PRODUCTS.APPLE, qty: 1 }
  ]
}
