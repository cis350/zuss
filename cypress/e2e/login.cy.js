describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('allows a user to login with valid credentials', () => {
    cy.get('input[name="username"]').type('emily');
    cy.get('input[name="password"]').type('pass');
    cy.get('form').submit();
    cy.url().should('include', '/homepage');
    cy.get('.success-message').should('contain', 'User successfully logged in.');
  });

  it('shows an error for invalid login credentials', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('form').submit();
    cy.get('.error-message').should('contain', 'Invalid username or password.');
  });

  it('shows an error when username field is empty', () => {
    cy.get('input[name="password"]').type('existingpassword');
    cy.get('form').submit();
    cy.get('.error-message').should('contain', 'Username and password are required.');
  });

  it('shows an error when password field is empty', () => {
    cy.get('input[name="username"]').type('existinguser');
    cy.get('form').submit();
    cy.get('.error-message').should('contain', 'Username and password are required.');
  });
});
