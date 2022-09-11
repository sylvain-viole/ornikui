# ornikui

This repository hosts an E2E test suite challenging the acquisition tunnel of ORNIKAR

## Stack

This project uses :

- Cypress `10.7.0`
- Cypress-cucumber-preprocessor `4.3.1`
- Cypress-allure-plugin `2.31.0`

## Setup / installation

- Git clone the repository
- Run `npm install`
- Run `npm run cy:chrome:open` to launch Cypress UI with chrome (other commands can be found in the package.json)
- From there you can trig the test suite using Cypress UI

### Reporting
If you want to use Allure reporter make sure you have it [installed locally](https://docs.qameta.io/allure-report/gettingstarted/quickstart)

## Architecture / Design Pattern

### 🔗 BDD :
This e2e suite uses `GHERKIN` to define scenarios. Each `scenario` step is related to  a js method in a `_steps.js` file.

### 🕺 Action Model Pattern
Steps are deployed as a sequence of actions.
This makes the step files readable.
- An `Actor` calls action methods
- `Action methods` call `locators` and interact with them.
This is a `PAGE OBJECT` with an extra layer of abstraction to keep step files readable.

### 🧩 Data management
Scenario uses `Personas` which is a data object that centralize all data inputs and expected outputs. Makes it simpler to maintain.

**Data persistence** is handled with a singleton class `DynamicDatas()`

### 🛼 ApiWaiter
This class allows to wait for API responses in order to kill flakiness
