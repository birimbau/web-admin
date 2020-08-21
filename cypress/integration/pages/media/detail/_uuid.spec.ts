/// <reference types="cypress" />

import moment from 'moment';
import { concepts, medias } from '../../../../../tests/mocks/models';

context('/media/detail/:uuid', () => {
  const today = moment().format('YYYY-MM-DD');
  const [year, month, day] = today.split('-').map(Number);

  // Ensure another day has 2 digits
  const anotherDay = day >= 28 ? (day - 1) : (day + 1);
  const targetDate = moment(new Date([year, month, anotherDay].map(String).join('-'))).format('YYYY-MM-DD');

  describe('With no uuid', () => {
    beforeEach(() => {
      cy.visit('/media/detail');
    });

    it('Displays a valid page', () => {
      cy.get('[name="concept__name"]')
        .should('have.value', '')
        .click()
        .type('My Concept')
        .should('have.value', 'My Concept');

      cy.get('[name="concept__description"]')
        .should('have.value', '')
        .click()
        .type('My Description')
        .should('have.value', 'My Description');

      cy.get('[name="concept__type"]')
        .should('have.value', 'IMAGE');

      cy.get('[name="concept__date"]')
        .should('have.value', moment().format('YYYY-MM-DD'))
        .click();

      cy.get('[data-cy="picker__concept__date"]')
        .find('.v-btn__content')
        .contains(anotherDay)
        .click();

      cy.get('[name="concept__date"]')
        .should('have.value', targetDate);

      cy.get('#concept__file')
        .should('not.exist');

      cy.get('[data-cy="concept__create"]')
        .click();

      cy.get('#concept__file')
        .attachFile('assets/alinatrifan.sheffield.jpg', 'image/jpg')
        .should('have.value', 'C:\\fakepath\\assets/alinatrifan.sheffield.jpg')
        .trigger('change', { force: true })
        .should('have.value', '');

      cy.get('[data-cy="concept__remove"]')
        .click();
    });
  });

  describe('With one concept', () => {
    const concept = concepts.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: `/api/concepts/${concept.uuid}`,
        response: concept,
      });
      cy.route({
        method: 'GET',
        url: '/api/medias',
        response: medias.valid,
      });
      cy.visit(`/media/detail/${concept.uuid}`);
    });

    it('Displays a valid page', () => {
      cy.get('[name="concept__name"]').should('have.value', concept.name);
      cy.get('[name="concept__description"]').should('have.value', concept.description);
      cy.get('[name="concept__type"]').should('have.value', concept.type);
      cy.get('[name="concept__date"]').should('have.value', concept.date);
    });
  });
});
