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
      cy.contains('No concepts defined yet.');
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
      cy.get(`#concepts__list__detail_link__${concept.uuid}`).within(() => {
        cy.contains(concept.name);
        cy.get('a')
          .contains('New')
          .should('have.attr', 'href', '/concepts/new');
        cy.get('a')
          .contains(concept.name)
          .should('have.attr', 'href', `/concepts/${concept.uuid}`);
      });
    });
  });
});
