/// <reference types="cypress" />

import { concepts, medias } from '../../../../../tests/mocks/models';

context('/media/detail/:uuid', () => {
  describe('With no uuid', () => {
    beforeEach(() => {
      cy.visit('/media/detail');
    });

    it('Displays a valid page', () => {
      cy.get('[name="concept__name"]').should('have.value', '');
      cy.get('[name="concept__description"]').should('have.value', '');
    });
  });

  describe('With one concept', () => {
    const concept = concepts.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api/concept',
        response: concept,
      });
      cy.route({
        method: 'GET',
        url: '/api/medias',
        response: medias.valid,
      });
      cy.visit(`/media/detail/${concept.uuid}`);
    });

    it.only('Displays a valid page', () => {
      cy.get('[name="concept__name"]').should('have.value', concept.name);
      cy.get('[name="concept__description"]').should('have.value', concept.description);
    });
  });
});
