import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("a visitor", () => {
  cy.visit("/");
  cy.log("ok");
});
