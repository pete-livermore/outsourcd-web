describe('homepage', () => {
  it('displays the hero section, heading text and CTA link', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="homepage-hero"]').should('exist')
    cy.get('h1').contains('Find a job that works for you')
    cy.get('a').contains('Get started')
  })
})
