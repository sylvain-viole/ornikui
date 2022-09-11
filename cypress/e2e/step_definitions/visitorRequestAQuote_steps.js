import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import { datas } from "../../fixtures/datas";
import { Visitor } from "../../support/Actors/Visitor";
import { ApiWaiter } from "../../support/APIS/ApiWaiter";
import { DynamicDatas } from "../../support/DynamicDatas";
import { HomePage } from "../../support/pages/HomePage";
const visitor = new Visitor();
const dynamicDatas = new DynamicDatas();
let persona;
let expected;

Given("a visitor {} to a quote", (eligibility) => {
  switch (eligibility) {
    case "eligible":
      persona = datas.personas.eligibletoQuote;
      expected = datas.expected.eligibletoQuote;
      break;
    case "not eligible":
      persona = datas.personas.notEligibletoQuote;
      expected = datas.expected.notEligibletoQuote;
      break;
  }
  cy.session("refuseCookies", () => {
    const homePage = new HomePage();
    cy.visit("/");
    homePage.cookieModale.getNoBtn().click();
  });
});

When("the visitor gives informations about his vehicle", () => {
  cy.clearLocalStorage();
  const homePage = new HomePage();
  visitor
    .visits(homePage)
    .startsQuotingTunnel()
    .searchesByBrand(persona.vehicle)
    .fillsVehicleBuyDate(persona.vehicle)
    .fillsVehicleBuyMean(persona.vehicle)
    .fillsVehicleIsAlreadyInsured(persona.vehicle)
    .clicksContinue()
    .fillsVehicleUsage(persona.vehicle)
    .fillsVehicleParkingLocation(persona.vehicle)
    .fillsVehicleParkingZipCode(persona.vehicle)
    .fillsVehicleParkingCity(persona.vehicle)
    .clicksContinue()
    .fillsWichNameOnGreyCard(persona.vehicle)
    .clicksContinue();
});

When("the visitor gives informations about the primary driver", () => {
  visitor
    .fillsDriverInformations(persona.primary)
    .clicksContinue()
    .fillsDriverProfession(persona.primary)
    .fillsDriverMaritalStatus(persona.primary)
    .clicksContinue()
    .fillsDriverAlreadyInsured(persona.primary)
    .clicksContinue();
  if (persona?.tunnel?.askForBonusMalus) {
    visitor
      .fillsDriverBonusMalus(persona.primary)
      .fillsDriverInfractionsCount(persona.primary)
      .clicksContinue();
  }
  visitor
    .fillsDeclareSecondaryDriver(persona.declareSecondaryDriver)
    .clicksContinue()
    .fillsLendingVehicle(persona.lendingVehicle)
    .clicksContinue();
});

When("the visitor gives informations about the contract", () => {
  visitor
    .fillsInsuranceStartDate(persona.insuranceStartDate)
    .fillsInsuranceOwner(persona.insuranceOwner)
    .fillsSubscriberInformations(persona.subscriber)
    .clicksEnd();
});

When("the visitor reviews his informations", () => {
  const localStorageAnswers = JSON.parse(localStorage.STATE_MACHINE_CONFIG)
    .context.answers;
  console.log(localStorageAnswers);
  for (const [key, value] of Object.entries(localStorageAnswers)) {
    expect(value).to.eql(expected.localStorageAnswers[`${key}`]);
  }
  cy.contains("Pour résumer").should("be.visible");
});

When("the visitor requests a quote", () => {
  ApiWaiter.interceptPostQuote();
  visitor.clicksDiscover();
  ApiWaiter.waitPostQuote().then((interception) => {
    dynamicDatas.response = interception.response;
  });
});

Then("the visitor receives quotes", () => {
  expect(dynamicDatas.response.statusCode).to.eql(200);
  expect(dynamicDatas.response.body.formules.length).to.eql(3);
  cy.contains("prenez soin de vous").should("be.visible");
});

Then("the visitor does not receive a quote", () => {
  expect(dynamicDatas.response.statusCode).to.eql(200);
  expect(dynamicDatas.response.body.error.code).to.eql(
    "INTERNAL_ORNIKAR_ERROR"
  );
  cy.contains("Malheureusement, nous ne pouvons pas vous assurer").should(
    "be.visible"
  );
});
