describe('Signin related test', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('if user sign up without accepting terms and conditions', () => {
    cy.get("input[type='email']").type('nimeshshrestha7@gmail.com');
    cy.get("input[type='text']").type('Nimesh');
    cy.get('#password').type('YQ4eFtC4GmCwK8c@');
    cy.get('#confirm_password').type('YQ4eFtC4GmCwK8c@');
    cy.contains('Sign Up').click();
    cy.contains('Please accept terms and conditions to register.');
  });

  it('if existed email is enter we expect to throw error', () => {
    cy.get("input[type='email']").type('roshan.thapa@diagonal.software');
    cy.get("input[type='text']").type('Password@123');
    cy.get('#password').type('YQ4eFtC4GmCwK8c@');
    cy.get('#confirm_password').type('YQ4eFtC4GmCwK8c@');
    cy.get('.chakra-checkbox__control').click();
    cy.contains('Sign Up').click();
    cy.contains('User already exists!');
  });
});
