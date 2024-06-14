/// <reference types="cypress" />

context('Using Dropdowns', () => {
  it('Dropdown', () => {
    cy.visit('/')

    // 1
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')

    // 2
    cy.get('nav nb-select').then((dropDown) => {
      cy.wrap(dropDown).click()
      cy.get('.options-list nb-option').each((listItem, index, list) => {
        const itemText = listItem.text().trim()
        cy.wrap(listItem).click()
        cy.wrap(dropDown).should('contain', itemText)
        if (index + 1 < list.length) {
          cy.wrap(dropDown).click()
        }
      })
    })
  })
})
