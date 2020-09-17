/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command attaching a file
     * to a input[type="file"] element.
     *
     * @example cy.get('input').attachFile('path/to/fixture.jpg', 'image/jpg'))
    */
   getFile(path: string, mime: string): Chainable<{ file: File, dataTransfer: DataTransfer }>
   attachFile(path: string, mime: string): Chainable<Element>
   waitJson(alias: string): Chainable<Element>

   clearIntegrations(): Chainable<Element>
   useHttp(): Chainable<Element>
   useAws(): Chainable<Element>
  }
}
