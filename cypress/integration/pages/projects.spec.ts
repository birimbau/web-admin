/// <reference types="cypress" />

import { projects } from '../../../tests/mocks/models';

context('/projects', () => {
  describe('With no projects', () => {
    beforeEach(() => {
      cy.visit('/projects');
    });

    it('Displays a valid page', () => {
      cy.log('Doesn\'t display a form');
      cy.get('.project__name').should('not.exist');
      cy.get('.project__description').should('not.exist');

      cy.log('Clicks on the add project button');
      cy.get('#projects__add_project')
        .click();

      cy.log('Finds the form');
      cy.get('.project__name').should('have.value', '');
      cy.get('.project__description').should('have.value', '');
    });
  });

  describe('With one project', () => {
    const project = projects.valid[0];

    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: '/api',
        response: {
          projects: [project],
        },
      });
      cy.visit('/projects');
    });

    it('Displays a valid page', () => {
      cy.get(`#project_row__${project.uuid}`).within(() => {
        cy.log('Has the name input');
        cy.get('.project__name input').should('have.value', project.name);
        cy.log('Has the description input');
        cy.get('.project__description input').should('have.value', project.description);
      });
    });
  });
});
