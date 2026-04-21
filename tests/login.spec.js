// ================= IMPORTS =================

// Custom fixture (logged-in session)
const { test: fixtureTest, expect } = require('../fixtures/baseTest');

// Default Playwright test (for login DDT)
const { test } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');

// Test data for multiple users
const data = require('../test-data/users.json');


// ================= LOGIN DATA DRIVEN TESTS =================
// This suite tests login behavior for multiple user types

test.describe('Login Data Driven Tests', () => {

  for (const user of data.users) {

    test(`Login Test - ${user.username || 'empty user'}`, async ({ page }) => {

      const loginPage = new LoginPage(page);

      // Open login page
      await loginPage.navigate();

      // Perform login
      await loginPage.login(user.username, data.password);

      // Validate results based on expected behavior
      if (user.expected === 'success') {
        await expect(page).toHaveURL(/inventory/);

      } else if (user.expected === 'locked') {
        await expect(await loginPage.getError())
          .toContain('locked out');

      } else if (user.expected === 'empty') {
        await expect(await loginPage.getError())
          .toContain('Username is required');
      }
    });
  }
});


// ================= INVENTORY CRUD TESTS =================
// Covers Create, Read, Update, Delete operations

fixtureTest.describe('Inventory CRUD Tests', () => {

  // CREATE - Add product to cart
  fixtureTest('Add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.addProduct();
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  // READ - Navigate to cart page
  fixtureTest('Verify cart navigation', async ({ inventoryPage }) => {
    await inventoryPage.addProduct();
    await inventoryPage.goToCart();

    await expect(inventoryPage.page).toHaveURL(/cart/);
  });

  // UPDATE - Sort products (Z-A)
  fixtureTest('Sort products Z-A', async ({ inventoryPage }) => {

    const before = await inventoryPage.products.allTextContents();

    await inventoryPage.sortZA();

    const after = await inventoryPage.products.allTextContents();

    // Ensure sorting changes order
    expect(after).not.toEqual(before);
  });

  // DELETE - Remove product from cart
  fixtureTest('Remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.addProduct();
    await inventoryPage.goToCart();
    await inventoryPage.removeProduct();

    await expect(inventoryPage.cartBadge).toBeHidden();
  });
});


// ================= ADVANCED SCENARIOS =================
// End-to-end real world flows

fixtureTest.describe('Advanced Scenarios', () => {

  // Add multiple products
  fixtureTest('Add multiple products', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(0);
    await inventoryPage.addProduct(1);

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  // Validate product data
  fixtureTest('Validate product details', async ({ inventoryPage }) => {

    const name = await inventoryPage.products.first().textContent();
    const price = await inventoryPage.prices.first().textContent();

    expect(name).toBeTruthy();
    expect(price).toContain('$');
  });

  // Complete checkout flow (FULL END-TO-END TEST)
  fixtureTest('Complete checkout flow', async ({ inventoryPage }) => {

    // Add product to cart
    await inventoryPage.addProduct();

    // Navigate to cart page
    await inventoryPage.goToCart();

    // Perform checkout process
    await inventoryPage.checkout();

    // Validate success message
    await expect(inventoryPage.successMsg)
      .toHaveText('Thank you for your order!');
  });

  // Logout scenario
  fixtureTest('Logout user', async ({ inventoryPage }) => {
    await inventoryPage.logout();

    await expect(inventoryPage.page)
      .toHaveURL('https://www.saucedemo.com/');
  });

  // Session persistence check
  fixtureTest('Session persists after refresh', async ({ inventoryPage }) => {
    await inventoryPage.page.reload();

    await expect(inventoryPage.title)
      .toHaveText('Products');
  });
});