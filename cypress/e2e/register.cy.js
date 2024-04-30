describe('Registration Functionality', () => {
    beforeEach(() => {
        cy.visit('/login');
        cy.contains('No account? Create one').click();
    });

    it('allows a user to register with valid credentials', () => {
        const username = `newuser${Date.now()}`;
        cy.get('input[name="username"]').type(username);
        cy.get('input[name="password"]').type('newuserpassword');
        cy.get('form').submit();
        cy.url().should('include', '/login');
        cy.get('.success-message').should('contain', 'Successfully registered user.');
    });

    it('shows an error for an existing username during registration', () => {
        cy.get('input[name="username"]').type('existinguser');
        cy.get('input[name="password"]').type('password');
        cy.get('form').submit();
        cy.get('.error-message').should('contain', 'Username already exists.');
    });

    it('shows an error when username field is empty during registration', () => {
        cy.get('input[name="password"]').type('newuserpassword');
        cy.get('form').submit();
        cy.get('.error-message').should('contain', 'Username and password are required.');
    });

    it('shows an error when password field is empty during registration', () => {
        const username = `newuser${Date.now()}`;
        cy.get('input[name="username"]').type(username);
        cy.get('form').submit();
        cy.get('.error-message').should('contain', 'Username and password are required.');
    });
});
