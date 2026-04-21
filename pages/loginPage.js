// ================= LOGIN PAGE OBJECT MODEL =================
// This file contains all locators and actions related to Login Page

class LoginPage {
  constructor(page) {
    this.page = page;

    // Username input field
    this.username = page.getByRole('textbox', { name: /username/i });

    // Password input field
    this.password = page.getByRole('textbox', { name: /password/i });

    // Login button
    this.loginBtn = page.locator('#login-button');

    // Error message shown for invalid login
    this.errorMsg = page.locator('[data-test="error"]');
  }

  // Navigate to application URL
  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  // Perform login action
  async login(user, pass) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  // Fetch error message text
  async getError() {
    return await this.errorMsg.textContent();
  }
}

module.exports = { LoginPage };