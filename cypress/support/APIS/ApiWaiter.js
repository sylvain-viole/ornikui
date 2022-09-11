/**
 * ApiWaiter is static a class helping intercepting, waiting and asserting on requests
 * @class ApiWaiter
 * @static
 */
export class ApiWaiter {
  constructor() {
    throw new Error(
      `${this.constructor.name} is a static class, you cannot instanciate it with "new" command.\n ==> Use it directly by calling its name : "${this.constructor.name}.someMethod()"`
    );
  }

  /**
   * @method get
   * @endpoint /vehicles/brands
   * @cyAlias getBrands
   */
  static interceptGetBrands() {
    cy.intercept({ method: "get", url: "/vehicles/brands" }).as("getBrands");
  }

  /**
   * @cyAlias getBrands
   * @assert status 200
   */
  static waitGetBrands() {
    return cy.wait("@getBrands").then((interception) => {
      expect(interception.response.statusCode).to.eql(200);
    });
  }

  /**
   * @method get
   * @endpoint /geocoding/adresses
   * @cyAlias getGeo
   */
  static interceptGetGeo(id) {
    cy.intercept({
      method: "get",
      url: `https://assurance.ornikar.com/geocoding/addresses/${id}`,
    }).as("getGeo");
  }

  /**
   * @cyAlias getGeo
   * @assert status 200
   */
  static waitGetGeo() {
    return cy.wait("@getGeo").then((interception) => {
      expect(interception.response.statusCode).to.eql(200);
    });
  }

  /**
   * @method post
   * @endpoint /longquote/quote
   * @cyAlias postQuote
   */
  static interceptPostQuote() {
    cy.intercept({
      method: "post",
      url: `**/longquote/quote`,
    }).as("postQuote");
  }

  /**
   * @cyAlias
   * @assert status 200
   */
  static waitPostQuote() {
    return cy.wait("@postQuote");
  }
}
