// ================= INVENTORY PAGE OBJECT MODEL =================
// Handles Product page, Cart, Sorting, Checkout, Logout flows

const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;

    // ================= PRODUCT PAGE =================
    this.title = page.locator('.title');
    this.products = page.locator('.inventory_item_name');
    this.prices = page.locator('.inventory_item_price');
    this.addButtons = page.locator('.inventory_item button');

    // ================= CART =================
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');

    // ================= SORT =================
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    // ================= CHECKOUT =================
    this.checkoutBtn = page.locator('[data-test="checkout"]');

    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');

    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');

    // ================= SUCCESS =================
    this.successMsg = page.locator('.complete-header');

    // ================= MENU =================
    this.menuBtn = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  // =========================================================
  // VALIDATION - Product page loaded
  // =========================================================
  async validatePage() {
    await expect(this.title).toBeVisible();
  }

  // =========================================================
  // ADD PRODUCT
  // =========================================================
  async addProduct(index = 0) {
    await this.addButtons.nth(index).click();
  }

  // =========================================================
  // GO TO CART (STABLE)
  // =========================================================
  async goToCart() {
    await this.cartIcon.click();

    // Wait for cart UI instead of URL only
    await expect(this.page.locator('.cart_list')).toBeVisible();
  }

  // =========================================================
  // REMOVE PRODUCT
  // =========================================================
  async removeProduct() {
    await this.page.locator('button:has-text("Remove")').click();
  }

  // =========================================================
  // SORT Z-A
  // =========================================================
  async sortZA() {
    await this.sortDropdown.selectOption('za');
  }

  // =========================================================
  // CHECKOUT FLOW (FINAL STABLE FIX)
  // =========================================================
  async checkout() {

    // 1. Ensure cart page is loaded
    await expect(this.page.locator('.cart_list')).toBeVisible();

    // 2. Click checkout
    await this.checkoutBtn.click();

    // 3. IMPORTANT FIX:
    // Wait for checkout page header (stable anchor)
    const checkoutHeader = this.page.locator(
      'text=Checkout: Your Information'
    );
    await expect(checkoutHeader).toBeVisible({ timeout: 15000 });

    // 4. Wait for form container (prevents input race condition)
    const formContainer = this.page.locator(
      '[data-test="checkout-info-container"]'
    );
    await expect(formContainer).toBeVisible({ timeout: 15000 });

    // 5. Fill form safely
    await this.firstName.fill('Rahul');
    await this.lastName.fill('Test');
    await this.postalCode.fill('411001');

    // 6. Continue
    await this.continueBtn.click();

    // 7. Finish order
    await expect(this.finishBtn).toBeVisible();
    await this.finishBtn.click();

    // 8. Success validation
    await expect(this.successMsg).toBeVisible();
  }

  // =========================================================
  // LOGOUT
  // =========================================================
  async logout() {
    await this.menuBtn.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };