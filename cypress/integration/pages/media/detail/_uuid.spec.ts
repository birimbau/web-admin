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
    const concept: any = {
      name: 'My Concept',
      description: 'My Description',
      type: 'IMAGE',
      date: targetDate,
    };

    const media: any = {
      storage: 'FREQUENT_ACCESS',
      role: 'PREVIEW',
    };

    beforeEach(() => {
      cy.server();
      cy.route('GET', '/api/concepts/**', {}).as('concepts/get');
      cy.route('POST', '/api/concepts', {}).as('concepts/post');
      cy.route('DELETE', '/api/concepts/**', {}).as('concepts/delete');

      cy.route('GET', '/api/medias', {}).as('medias/get');
      cy.route('POST', '/api/medias/**/upload', {}).as('medias/upload');
      cy.route('POST', '/api/medias', {}).as('medias/post');
      cy.route('DELETE', '/api/medias/**', {}).as('medias/delete');

      cy.visit('/media/detail');
    });

    it('Displays a valid page', () => {
      cy.get('[cy-target-name="media__card"]')
        .should('not.exist');

      cy.get('[name="concept__name"]')
        .should('have.value', '')
        .click()
        .type(concept.name)
        .should('have.value', concept.name);

      cy.get('[name="concept__description"]')
        .should('have.value', '')
        .click()
        .type(concept.description)
        .should('have.value', concept.description);

      cy.get('[name="concept__type"]')
        .should('have.value', concept.type);

      cy.get('[name="concept__date"]')
        .should('have.value', moment().format('YYYY-MM-DD'))
        .click();

      cy.get('[data-cy="picker__concept__date"]')
        .find('.v-btn__content')
        .contains(anotherDay)
        .click();

      cy.get('[name="concept__date"]')
        .should('have.value', concept.date);

      cy.get('#concept__file')
        .should('not.exist');

      cy.get('[data-cy="concept__create"]')
        .click();

      cy.wait('@concepts/post')
        .then((xhr: any) => {
          expect(xhr.request.body).to.contain(concept);
          concept.uuid = xhr.request.body.uuid;
          media.concept = concept.uuid;
        });

      cy.get('#concept__file')
        .attachFile('assets/alinatrifan.sheffield.jpg', 'image/jpg')
        .should('have.value', 'C:\\fakepath\\assets/alinatrifan.sheffield.jpg')
        .trigger('change', { force: true })
        .should('have.value', '');

      cy.get('[cy-target-name="media__card"]');

      cy.get('[data-cy="media__download"]')
        .should('not.exist');

      cy.get('[data-cy="media__remove"]')
        .should('not.exist');

      cy.get('[data-cy="media__upload"]')
        .click();

      cy.wait('@medias/post')
        .then((xhr: any) => {
          expect(xhr.request.body).to.contain(media);
          media.uuid = xhr.request.body.uuid;
        });

      cy.wait('@medias/upload');

      cy.get('[data-cy="media__download"]');

      cy.get('[data-cy="media__remove"]')
        .click();

      cy.wait('@medias/delete');

      cy.get('[cy-target-name="media__card"]')
        .should('not.exist');

      cy.get('[data-cy="concept__remove"]')
        .click();

      cy.wait('@concepts/delete');

      cy.get('#concept__file')
        .should('not.exist');
    });
  });

  describe('With one concept', () => {
    const concept = concepts.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route('GET', `/api/concepts/${concept.uuid}`, concept).as('concepts/get');
      cy.route('GET', '/api/medias', medias.valid).as('medias/get');
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
