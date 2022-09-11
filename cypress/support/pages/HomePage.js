import { CookieModale } from "../components/CookieModale";

/**
 * HomePage is singleton a class representing the homepage
 * @class HomePage
 * @singleton
 */
export class HomePage {
  constructor() {
    if (!HomePage.instance) {
      HomePage.instance = this;
    }
    this.url = "/";
    this.cookieModale = new CookieModale();
    return HomePage.instance;
  }

  getStartQuoteBtn() {
    return cy.contains("Estimer mon tarif");
  }
}
