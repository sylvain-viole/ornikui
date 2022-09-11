/**
 * CookieModale is singleton a class representing the Cookie Modale
 * @class CookieModale
 * @singleton
 */
export class CookieModale {
  constructor() {
    if (!CookieModale.instance) {
      CookieModale.instance = this;
    }
    return CookieModale.instance;
  }

  get() {
    return cy.get("[data-service=cookies]");
  }

  getNoBtn() {
    return this.get().find("button#axeptio_btn_dismiss");
  }

  getChooseBtn() {
    return this.get().find("button#axeptio_btn_configure");
  }

  getYesBtn() {
    return this.get().find("button#axeptio_btn_acceptAll");
  }
}
