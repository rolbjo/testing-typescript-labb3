describe('testing a button in frontend that does a call to backend that does a request to the database', () => {
  it('Works fine', () => {
    cy.visit('http://localhost:3000/')
    cy.wait(1000)
  })
})
