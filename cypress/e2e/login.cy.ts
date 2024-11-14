/// <reference types="cypress"/>

describe('Sign in related test', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Login page basic tests', () => {
    cy.contains('Sign In');
    cy.contains('Remember me');
    cy.contains('Forgot password?');
    cy.contains('Create a new account');
    cy.get("[data-testid='toggle-eye']");
    // Take a Percy snapshot with different browser widths.
    cy.percySnapshot('New todo test');
  });

  it('if email address dont exists', () => {
    cy.get("input[type='email']").type('ab123@gmail.com');
    cy.get('#password').type('Password@123');
    cy.get("button[type='submit']").click();
    cy.contains("User with that email doesn't exists!");
  });

  it('if password dont match', () => {
    cy.get("input[type='email']").type('roshan.thapa@diagonal.software');
    cy.get('#password').type('Password123@');
    cy.get("button[type='submit']").click();
    cy.contains('Incorrect Password!');
  });

  it('check if routing change to dashboard after login', () => {
    cy.get("input[type='email']").type('roshan.thapa@diagonal.software');
    cy.get('#password').type('Password@123');
    cy.get("button[type='submit']").click();
    cy.url().should('eq', `${Cypress.env('host')}/login`);
  });
});
