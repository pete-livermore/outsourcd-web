describe('homepage', () => {
  it('displays the hero section, heading text and CTA link', () => {
    cy.visit('/')
    cy.get('[data-testid="homepage-hero"]').should('exist')
    cy.get('h1').contains('Find a job that works for you').should('exist')
    cy.get('a').contains('Get started').should('exist')
  })

  it('navigates to the login page (with redirect param) when the CTA button is clicked', () => {
    cy.visit('/')
    cy.get('a').contains('Get started').click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/auth/login')
      expect(loc.search).contains('?redirect=')
    })
  })
})
