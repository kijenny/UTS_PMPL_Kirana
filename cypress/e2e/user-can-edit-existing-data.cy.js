describe('User Can Edit Existing Data', () => {
  afterEach(() => {
    cy.exec(
      "cd ../demo-app-cypress-automation &&  php artisan migrate:fresh --seed"
    )
  })
})

beforeEach(() => {
  cy.exec(
    "cd ../demo-app-cypress-automation &&  php artisan migrate:fresh --seed"
  )

  cy.visit ('http://127.0.0.1:8000/')

  cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
  cy.get(':nth-child(3) > .form-control').type('password');
  cy.get('.btn').click();
  cy.visit('http://127.0.0.1:8000/user-management/user');
})

it.only('User can edit existing data', () => {
  cy.get('.table td').contains('user').parent().find('a').contains('Edit').click();
  cy.get('#name').clear('user ');
  cy.get('#name').type('user edited');
  cy.get('.btn-primary').contains('Submit').click();
  cy.get('.table td').contains('user').should('have.text','user edited')
  cy.get('.alert').should('be.visible').and('have.class', 'alert-success').and('contain', 'User Berhasil Diupdate')
});