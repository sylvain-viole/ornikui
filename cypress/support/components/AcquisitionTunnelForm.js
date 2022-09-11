import { AbstractForm } from "./AbstractForm";

/**
 * AcquisitionTunnelForm is a singleton class gathering locators on the acquisition tunnel form
 * @class AcquisitionTunnelForm
 * @static
 */
export class AcquisitionTunnelForm extends AbstractForm {
  constructor() {
    super();
    if (!AcquisitionTunnelForm.instance) {
      AcquisitionTunnelForm.instance = this;
    }
    return AcquisitionTunnelForm.instance;
  }

  getSearchByBrandBtn() {
    return cy.contains("Rechercher par marque");
  }

  vehicle = {
    title: "Ensemble, gagnons en assurance !",
    fields: [
      { name: "vehiculeMarque", type: "inputWithSelect" },
      { name: "vehiculeModele", type: "inputWithSelect" },
      { name: "vehiculePuissanceFiscale", type: "select" },
      { name: "vehiculeCarburant", type: "select" },
      { name: "vehiculeMiseEnCirculation", type: "date" },
      { name: "vehiculeVersion", type: "select" },
      {
        name: "vehiculeAcquisition",
        type: "date",
      },
      {
        name: "vehiculeFinancement",
        type: "radio",
      },
      {
        name: "vehiculeDejaAssure",
        type: "radio",
      },
      {
        name: "usage",
        type: "radio",
      },
      {},
      {
        name: "parkingLocation",
        type: "radio",
      },
      {
        name: "parkingCodePostal",
        type: "inputWithSelect",
      },
      {
        name: "parkingCommune",
        type: "select",
      },
      {
        name: "titulaireCartegrise",
        type: "radio",
      },
    ],
  };
  primaryDriver = {
    fields: [
      { name: "primaryFirstName", type: "input" },
      { name: "primaryLastName", type: "input" },
      { name: "primaryCivilite", type: "radio" },
      { name: "primaryBirthDate", type: "date" },
      { name: "primaryLicenceDate", type: "date" },
      { name: "primaryConduiteAccompagnee", type: "radio" },
      { name: "primaryProfession", type: "select" },
      { name: "primarySituationMarital", type: "radio" },
      { name: "primaryAncienneteAssurance", type: "radio" },
      { name: "primaryMalus", type: "inputWithSelect" },
      { name: "primaryInfractionsCount", type: "radio" },
      { name: "declareSecondaryDriver", type: "radio" },
      { name: "pretOccasionel", type: "radio" },
    ],
  };
  insuranceInfo = {
    fields: [
      { name: null, type: "date" },
      { name: "subscriberIdentity", type: "radio" },
      { name: "subscriberEmail", type: "input" },
      { name: "subscriberPhone", type: "input" },
      { name: "subscriberAutoCompletedAddress", type: "inputWithSelect" },
    ],
  };
}
