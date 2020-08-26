/// <reference types="cypress" />

import moment from 'moment';
import { concepts, fragments, projects } from '../../../../../tests/mocks/models';

context('/concepts/detail/:uuid', () => {
  const today = moment().format('YYYY-MM-DD');
  const [year, month, day] = today.split('-').map(Number);

  // Ensure another day has 2 digits
  const anotherDay = day >= 28 ? (day - 1) : (day + 1);
  const targetDate = moment(new Date([year, month, anotherDay].map(String).join('-'))).format('YYYY-MM-DD');

  describe('With no uuid', () => {
    const concept: any = {
      name: 'My Concept',
      description: 'My Description',
      projects: [projects.valid[0].uuid],
      tags: ['my-tag', 'another-tag'],
      type: 'IMAGE',
      date: targetDate,
      public: true,
      featured: false,
    };

    const fragment: any = {
      meta: {
        filename: 'assets/alinatrifan.sheffield.jpg',
        mime: '',
        size: 201256,
        storage: 'PREVIEW',
      },
      notes: 'Some Note...',
    };

    beforeEach(() => {
      cy.server();
      cy.route('GET', '/api/concepts/**', {}).as('concepts/get');
      cy.route('POST', '/api/concepts', {}).as('concepts/post');
      cy.route('DELETE', '/api/concepts/**', {}).as('concepts/delete');

      cy.route('GET', '/api/fragments', {}).as('fragments/get');
      cy.route('POST', '/api/fragments/**/upload', {}).as('fragments/upload');
      cy.route('POST', '/api/fragments', {}).as('fragments/post');
      cy.route('DELETE', '/api/fragments/**', {}).as('fragments/delete');

      cy.route('GET', '/api/projects', projects.valid).as('projects/get');

      cy.visit('/concepts/detail');
    });

    it('Displays a valid page', () => {
      cy.wait('@projects/get');

      cy.get('[cy-target-name="fragment__card"]')
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

      cy.get('[data-cy="concept__projects"]')
        .click({ force: true });

      cy.get('.v-menu__content')
        .find('.v-list-item')
        .contains(projects.valid[0].name)
        .click();

      cy.get('#concept__tags')
        .type(`${concept.tags[0]}\n`, { force: true })
        .type(`${concept.tags[1]}\n`, { force: true });

      cy.get('[name="concept__date"]')
        .should('have.value', moment().format('YYYY-MM-DD'))
        .click();

      cy.get('[data-cy="picker__concept__date"]')
        .find('.v-btn__content')
        .contains(anotherDay)
        .click();

      cy.get('[name="concept__public"]')
        .click({ force: true });

      cy.get('[name="concept__featured"]')
        .click({ force: true })
        .click({ force: true });

      cy.get('[name="concept__date"]')
        .should('have.value', concept.date);

      cy.get('#concept__file')
        .should('not.exist');

      cy.get('[data-cy="concept__create"]')
        .click();

      cy.wait('@concepts/post')
        .then((xhr: any) => {
          concept.uuid = xhr.request.body.uuid;
          fragment.concept = concept.uuid;
          expect(xhr.request.body).to.deep.equal(concept);
        });

      cy.get('#concept__file')
        .attachFile('assets/alinatrifan.sheffield.jpg', 'image/jpeg')
        .should('have.value', 'C:\\fakepath\\assets/alinatrifan.sheffield.jpg')
        .trigger('change', { force: true })
        .should('have.value', '');

      cy.get('[cy-target-name="fragment__card"]');

      cy.get('[data-cy="fragment__notes"]')
        .type(fragment.notes);

      cy.get('[data-cy="fragment__download"]')
        .should('not.exist');

      cy.get('[data-cy="fragment__remove"]')
        .should('not.exist');

      cy.get('[data-cy="fragment__upload"]')
        .click();

      cy.wait('@fragments/post')
        .then((xhr: any) => {
          fragment.uuid = xhr.request.body.uuid;
          expect(xhr.request.body).to.be.deep.equal(fragment);
        });

      cy.wait('@fragments/upload');

      cy.get('[data-cy="fragment__download"]');

      cy.get('[data-cy="fragment__remove"]')
        .click();

      cy.wait('@fragments/delete');

      cy.get('[cy-target-name="fragment__card"]')
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
      cy.route('GET', '/api/fragments', fragments.valid).as('fragments/get');
      cy.route('GET', '/api/projects', projects.valid).as('projects/get');

      cy.visit(`/concepts/detail/${concept.uuid}`);
    });

    it('Displays a valid page', () => {
      cy.wait('@concepts/get');
      cy.wait('@fragments/get');
      cy.wait('@projects/get');

      cy.get('[name="concept__name"]').should('have.value', concept.name);
      cy.get('[name="concept__description"]').should('have.value', concept.description);
      cy.get('[name="concept__type"]').should('have.value', concept.type);
      cy.get('[name="concept__projects"]').should('have.value', concept.projects.join(','));
      cy.get('[name="concept__tags"]').should('have.value', concept.tags.join(','));
      cy.get('[name="concept__date"]').should('have.value', concept.date);
    });
  });
});
