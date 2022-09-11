import { ApiWaiter } from "../APIS/ApiWaiter";
import { AcquisitionTunnelForm } from "../components/AcquisitionTunnelForm";
import { CookieModale } from "../components/CookieModale";
import { HomePage } from "../pages/HomePage";

const homePage = new HomePage();
const acquisitionTunnelForm = new AcquisitionTunnelForm();

/**
 * Visitor is a singleton class representing a wensite visitor
 * @class Visitor
 * @singleton
 */
export class Visitor {
  constructor() {
    if (!Visitor.instance) {
      Visitor.instance = this;
    }
    return Visitor.instance;
  }

  visits(page, options) {
    cy.visit(page.url, options);
    return this;
  }

  visitsUrl(url, options) {
    cy.visit(url, options);
    return this;
  }

  clicks(locator, options) {
    locator.click(options);
    return this;
  }

  clicksContinue() {
    cy.get("button").contains("Continuer").click({ force: true });
    return this;
  }

  clicksEnd() {
    cy.get("button").contains("Terminer").click({ force: true });
    return this;
  }

  clicksDiscover() {
    cy.get("[role=button]")
      .contains("Découvrir mes offres")
      .click({ force: true });
    return this;
  }

  types(options) {
    options.locator.type(options.content, options);
    return this;
  }

  refusesCookies() {
    const cookieModale = new CookieModale();
    cookieModale.getNoBtn().click();
    return this;
  }

  startsQuotingTunnel() {
    homePage.getStartQuoteBtn().click({ force: true });
    return this;
  }

  searchesByBrand(vehicle) {
    cy.contains("Bienvenue ! Commençons par trouver votre véhicule.").should(
      "be.visible"
    );
    ApiWaiter.interceptGetBrands();
    acquisitionTunnelForm.getSearchByBrandBtn().click();
    ApiWaiter.waitGetBrands();
    cy.contains("Ensemble, gagnons en assurance !").should("be.visible");
    acquisitionTunnelForm
      .getInputWithSelectFieldByIndex({
        field: acquisitionTunnelForm.vehicle.fields[0],
        value: vehicle.brand,
        index: 2,
      })
      .click({ force: true });
    acquisitionTunnelForm
      .getInputWithSelectFieldByIndex({
        field: acquisitionTunnelForm.vehicle.fields[1],
        value: vehicle.model,
        index: 1,
      })
      .click({ force: true });
    acquisitionTunnelForm
      .getSelectFieldByName(acquisitionTunnelForm.vehicle.fields[2].name)
      .select(vehicle.power, { force: true });
    acquisitionTunnelForm
      .getSelectFieldByName(acquisitionTunnelForm.vehicle.fields[3].name)
      .select(vehicle.energy, { force: true });
    this.fillsDate({
      form: acquisitionTunnelForm,
      field: acquisitionTunnelForm.vehicle.fields[4],
      date: vehicle.birthDate,
    });
    acquisitionTunnelForm
      .getInputWithSelectFieldByIndex({
        field: acquisitionTunnelForm.vehicle.fields[5],
        value: vehicle.version,
        index: 1,
      })
      .click({ force: true });
    acquisitionTunnelForm.getBtnByContent("Commencer").click({ force: true });
    return this;
  }

  /**
   *
   * @param {Object} options
   * @param {Object} options.form the targeted form
   * @param {Object} options.field as described in Form classes type : "date"
   * @param {Object} options.date data object {day: xx, month: xx, year: yyyy}
   *
   */
  fillsDate(options) {
    options.form
      .getDayInput(options.field)
      .type(options.date.day, { force: true });
    options.form
      .getMonthInput(options.field)
      .type(options.date.month, { force: true });
    options.form
      .getYearInput(options.field)
      .type(options.date.year, { force: true });
    return this;
  }

  fillsVehicleBuyDate(vehicle) {
    cy.contains("Quelle est la date d'achat de votre véhicule ?").should(
      "be.visible"
    );
    this.fillsDate({
      form: acquisitionTunnelForm,
      field: acquisitionTunnelForm.vehicle.fields[6],
      date: vehicle.buyDate,
    });
    return this;
  }

  fillsVehicleBuyMean(vehicle) {
    cy.contains("Comment l’avez-vous financé ?").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.vehicle.fields[7].name}-${vehicle.financing}`
      )
      .click({ force: true });
    return this;
  }

  fillsVehicleIsAlreadyInsured(vehicle) {
    cy.contains("Actuellement, votre véhicule est-il assuré ?").should(
      "be.visible"
    );
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.vehicle.fields[8].name}-${vehicle.alreadyInsured}`
      )
      .click({ force: true });
    return this;
  }

  fillsVehicleUsage(vehicle) {
    cy.contains("Dans quel cadre utilisez-vous votre véhicule ?").should(
      "be.visible"
    );
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.vehicle.fields[9].name}-${vehicle.usage}`
      )
      .click({ force: true });
    return this;
  }

  fillsVehicleParkingLocation(vehicle) {
    cy.contains("La nuit, où sera garé le véhicule ?").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.vehicle.fields[11].name}-${vehicle.parkingLocation}`
      )
      .click({ force: true });
    return this;
  }

  fillsVehicleParkingZipCode(vehicle) {
    acquisitionTunnelForm
      .getInputById(acquisitionTunnelForm.vehicle.fields[12].name)
      .type(vehicle.parkingZipCode, { force: true });
    return this;
  }

  fillsVehicleParkingCity(vehicle) {
    acquisitionTunnelForm
      .getSelectFieldByName(`${acquisitionTunnelForm.vehicle.fields[13].name}`)
      .select(vehicle.parkingCity, { force: true });
    return this;
  }

  fillsWichNameOnGreyCard(vehicle) {
    cy.contains("Quel nom figure sur la carte grise du véhicule ?").should(
      "be.visible"
    );
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.vehicle.fields[14].name}-${vehicle.nameOnGreyCard}`
      )
      .click({ force: true });
    return this;
  }

  fillsDriverInformations(driver) {
    cy.contains(
      "Quelle personne conduira le plus souvent le véhicule ?"
    ).should("be.visible");
    acquisitionTunnelForm
      .getInputById(acquisitionTunnelForm.primaryDriver.fields[0].name)
      .type(driver.firstName, { force: true });
    acquisitionTunnelForm
      .getInputById(acquisitionTunnelForm.primaryDriver.fields[1].name)
      .type(driver.lastName, { force: true });
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[2].name}-${driver.civility}`
      )
      .click({ force: true });
    this.fillsDate({
      form: acquisitionTunnelForm,
      field: acquisitionTunnelForm.primaryDriver.fields[3],
      date: driver.birthDate,
    });
    this.fillsDate({
      form: acquisitionTunnelForm,
      field: acquisitionTunnelForm.primaryDriver.fields[4],
      date: driver.licenceDate,
    });
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[5].name}-${driver.assistedDriving}`
      )
      .click({ force: true });
    return this;
  }

  fillsDriverProfession(driver) {
    cy.contains("Quelle est sa profession ?").should("be.visible");
    acquisitionTunnelForm
      .getSelectFieldByName(
        `${acquisitionTunnelForm.primaryDriver.fields[6].name}`
      )
      .select(driver.profession, { force: true });
    return this;
  }

  fillsDriverMaritalStatus(driver) {
    cy.contains("Quelle est sa situation maritale ?").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[7].name}-${driver.maritalStatus}`
      )
      .click({ force: true });
    return this;
  }

  fillsDriverAlreadyInsured(driver) {
    cy.contains("A-t-elle déjà eu une assurance ?").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[8].name}-${driver.previousInsurance}`
      )
      .click({ force: true });
    return this;
  }

  fillsDriverBonusMalus(driver) {
    cy.contains("Quel est son bonus - malus ?").should("be.visible");
    acquisitionTunnelForm
      .getInputWithSelectFieldByIndex({
        field: acquisitionTunnelForm.primaryDriver.fields[9],
        value: driver.bonusMalus,
      })
      .click({ force: true });
    return this;
  }

  fillsDriverInfractionsCount(driver) {
    cy.contains("A-t-elle commis des infractions ?").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[10].name}-${driver.infractionsCount}`
      )
      .click({ force: true });
    return this;
  }

  fillsDeclareSecondaryDriver(answer) {
    cy.contains(
      "Est-ce qu’une autre personne conduira régulièrement le véhicule ?"
    ).should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[11].name}-${answer}`
      )
      .click({ force: true });
    return this;
  }

  fillsLendingVehicle(answer) {
    cy.contains("Envisagez-vous de prêter votre véhicule ?").should(
      "be.visible"
    );
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.primaryDriver.fields[12].name}-${answer}`
      )
      .click({ force: true });
    return this;
  }

  fillsInsuranceStartDate(date) {
    cy.contains(
      "À partir de quand souhaitez-vous assurer le véhicule ?"
    ).should("be.visible");
    // id is missing on those date input fields...
    cy.get("input[placeholder=JJ]").type(date.day, { force: true });
    cy.get("input[placeholder=MM]").type(date.month, { force: true });
    cy.get("input[placeholder=AAAA]").type(date.year, { force: true });
    return this;
  }

  fillsInsuranceOwner(answer) {
    cy.contains("Titulaire du contrat").should("be.visible");
    acquisitionTunnelForm
      .getRadioBtnById(
        `${acquisitionTunnelForm.insuranceInfo.fields[1].name}-${answer}`
      )
      .click({ force: true });
    return this;
  }

  fillsSubscriberInformations(subscriber) {
    cy.contains("Informations du titulaire").should("be.visible");
    acquisitionTunnelForm
      .getInputById(acquisitionTunnelForm.insuranceInfo.fields[2].name)
      .type(subscriber.email, { force: true });
    acquisitionTunnelForm
      .getInputById(acquisitionTunnelForm.insuranceInfo.fields[3].name)
      .type(subscriber.phone, { force: true });
    ApiWaiter.interceptGetGeo(subscriber.geoId);
    acquisitionTunnelForm
      .getInputWithSelectFieldByIndex({
        field: acquisitionTunnelForm.insuranceInfo.fields[4],
        value: subscriber.address,
      })
      .click({ force: true });
    ApiWaiter.waitGetGeo();
    return this;
  }
}
