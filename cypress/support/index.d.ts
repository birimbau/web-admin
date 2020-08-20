/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command attaching a file
     * to a input[type="file"] element.
     *
     * @example cy.get('input').attachFile('path/to/fixture.jpg', 'image/jpg'))
    */
   attachFile(path: string, mime: string): Chainable<Element>
  }
}
