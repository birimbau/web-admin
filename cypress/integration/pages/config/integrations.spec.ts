/// <reference types="cypress" />

import { services } from '../../../../app/models/services';

context('/config/integrations', () => {
  beforeEach(() => {
    cy.visit('/config/integrations');
  });

  Object.values(services).forEach((service) => {
    it(`Uses: ${service.name}`, () => {
      cy.get(`#integrations__integration__${service.slug}`)
        .click();

      cy.contains(`Integrate with ${service.name}`);
    });
  });
});
