// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('attachFile', { prevSubject: 'element' }, (el, path, mime) => {
  cy.fixture(path, 'base64')
    .then(content => Cypress.Blob.base64StringToBlob(content, mime))
    .then((blob) => {
      const testFile = new File([blob], path);
      const dataTransfer = new DataTransfer();

      dataTransfer.items.add(testFile);
      el[0].files = dataTransfer.files;
      return el;
    });
});


Cypress.Commands.add('waitJson', (alias) => {
  cy.wait(alias).then((xhr) => {
    return xhr.request.body;
  });
});
