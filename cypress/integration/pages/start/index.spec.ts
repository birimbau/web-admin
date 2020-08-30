
describe.only('/start', () => {
  it('Redirects the user if no session data is found', () => {
    cy.clearIntegrations();
    cy.visit('/');
    cy.location('pathname').should('eq', '/start');
  });

  describe('No session data', () => {
    before(() => {
      cy.clearIntegrations();
      cy.visit('/');
    });
  });
});
