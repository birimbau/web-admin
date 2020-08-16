/// <reference types="cypress" />

import { concepts } from '../../../../tests/mocks/models';

context('/media/list', () => {
  describe('With no concepts', () => {
    beforeEach(() => {
      cy.visit('/media/list');
    });

    it('Displays a valid page', () => {
      cy.contains('No concepts defined yet.');
    });
  });

  describe('With one project', () => {
    const concept = concepts.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api',
        response: {
          concepts: [concept],
        },
      });
      cy.visit('/media/list');
    });

    it('Displays a valid page', () => {
      cy.get(`#media__list__detail_link__${concept.uuid}`).within(() => {
        cy.contains(concept.name);
        cy.get('a').should('have.attr', 'href', `/media/detail/${concept.uuid}`);
      });
    });
  });
});
