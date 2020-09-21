/// <reference types="cypress" />

import { concepts } from '../../../../tests/mocks/models';

context('/concepts', () => {
  describe('With no concepts', () => {
    beforeEach(() => {
      cy.server();
      cy.route('GET', '/api/concepts', []);
      cy.visit('/concepts');
    });

    it('Displays a valid page', () => {
      cy.contains('No concepts defined yet');

      cy.contains('Create New')
        .click();

      cy.url()
        .should('include', '/concepts/new');
    });
  });

  describe('With one concept', () => {
    const concept = concepts.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route('GET', '/api/concepts', [concept]);
      cy.visit('/concepts');
    });

    it('Displays a valid page', () => {
      cy.get(`[data-cy="concepts__table__${concept.uuid}"]`).within(() => {
        cy.contains(concept.name);
        cy.contains("Delete");

        cy.contains("Open").click();

        cy.url()
          .should('include', `/concepts/${concept.uuid}`);
      });
    });
  });
});
