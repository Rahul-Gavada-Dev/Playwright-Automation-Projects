# Playwright Automation Framework - SauceDemo

## Overview

This project is a scalable end-to-end test automation framework built using Playwright.
It follows the Page Object Model (POM) design pattern and uses reusable fixtures and structured test data for maintainability.

---

## Tech Stack

* Playwright (@playwright/test)
* JavaScript (Node.js)
* Page Object Model (POM)
* Git and GitHub

---

## Project Structure

```
playwright-saucedemo-framework-new-updated/

├── pages/                  # Page Object classes (locators and actions)
├── tests/                  # Test scripts
├── fixtures/               # Base test setup
├── test-data/              # Test data (JSON files)
├── playwright.config.js    # Playwright configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

---

## Features

* Page Object Model (POM) implementation
* Reusable fixtures for better test design
* Data-driven testing using JSON
* Parallel test execution
* HTML reporting
* Screenshot and video capture on failure

---

## Setup Instructions

### 1. Install dependencies

npm install

### 2. Install Playwright browsers

npx playwright install

---

## Run Tests

### Run all tests

npx playwright test

### Run tests in headed mode

npx playwright test --headed

### Run specific test file

npx playwright test tests/login.spec.js

---

## Reports

### View HTML report

npx playwright show-report

---

## Test Scenarios

* Login with valid credentials
* Login with invalid credentials
* Basic authentication validation
*  End-to-end scenarios (cart and checkout)

---

## Author

Rahul Gavada
QA Engineer | Playwright Automation | Salesforce QA | Salesforce Administratoe

---

## Future Enhancements

* API testing using Playwright
* Cross-browser execution (Firefox, WebKit)
* CI/CD integration using GitHub Actions

---

## Contribution

Feel free to fork this repository and contribute improvements.
