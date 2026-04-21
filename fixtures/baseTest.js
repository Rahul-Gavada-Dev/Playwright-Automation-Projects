// ================= FIXTURE SETUP =================
// This file creates reusable logged-in session for tests

const base = require('@playwright/test').test;
const expect = require('@playwright/test').expect;

const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');

const test = base.extend({

  // Custom fixture: Logged-in inventory page
  inventoryPage: async ({ page }, use) => {

    const loginPage = new LoginPage(page);

    // Open application
    await loginPage.navigate();

    // Login before each test
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);

    // Ensure inventory page is fully loaded
    await inventoryPage.title.waitFor({ state: 'visible' });

    // Provide page object to tests
    await use(inventoryPage);
  }
});

module.exports = { test, expect };