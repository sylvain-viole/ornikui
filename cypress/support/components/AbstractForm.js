/**
 * AbstractForm is an abstract class gathering all shared locators method on FORMS
 * @class AbstractForm
 * @abstract
 */
export class AbstractForm {
  constructor() {
    if (this.constructor === AbstractForm) {
      throw new TypeError(
        'Abstract class "AbstractForm" cannot be instantiated directly'
      );
    }
  }

  getBtnByContent(content) {
    return cy.get("button").contains(content);
  }

  getInputByPlaceholder(placeholder) {
    return cy.get(`input[placeholder=${placeholder}]`);
  }

  getInputById(id) {
    return cy.get(`input#${id}`);
  }

  getInputByValue(value) {
    return cy.get(`input[value=${value}]`);
  }

  getRadioBtnById(id) {
    return cy.get(`input[type=radio]#${id}`);
  }

  getItemFromListByIndex(options) {
    return options.input.parents("div").next("ul").find("li").eq(options.index);
  }

  getDayInput(dateField) {
    return cy.get(`input[id=${dateField.name}-day]`);
  }
  getMonthInput(dateField) {
    return cy.get(`input[id=${dateField.name}-month]`);
  }
  getYearInput(dateField) {
    return cy.get(`input[id=${dateField.name}-year]`);
  }

  /**
   *
   * @param {Object} options
   * @param {string} field field in DOM
   * @param {string} value to input
   * @param {number} [index] of the element to select, if none uses 1
   */
  getInputWithSelectFieldByIndex(options) {
    return cy
      .get(`input[name=${options.field.name}`)
      .type(options.value, { force: true })
      .parents("div")
      .find(`li[role=button]`)
      .eq(options.index ?? 1);
  }

  /**
   *
   * @param {string} name of the field in DOM
   */
  getSelectFieldByName(name) {
    return cy.get(`select[name=${name}`);
  }
}
