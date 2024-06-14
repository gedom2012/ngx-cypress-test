/// <reference types="cypress" />

context('Using Web Tables', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
  })

  it('Get the row by text', () => {
    cy.get('tbody')
      .contains('tr', 'Larry')
      .then((tableRow) => {
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find("[placeholder='Age']").clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').eq(6).should('contain', '35')
      })
  })

  it('Get the row by index', () => {
    cy.get('thead').find('.nb-plus').click()
    cy.get('thead')
      .find('tr')
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
        cy.wrap(tableRow).find('.nb-checkmark').click()
      })
    cy.get('tbody tr')
      .first()
      .find('td')
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should('contain', 'John')
        cy.wrap(tableColumns).eq(3).should('contain', 'Smith')
      })
  })

  it('Filter inside table', () => {
    const ageToBeFilter = [20, 30, 40, 200]

    cy.get('ng2-smart-table .ng-star-inserted nav').should('be.visible')
    cy.wrap(ageToBeFilter).each((age, index) => {
      cy.get('thead [placeholder="Age"]').clear().type(age)

      cy.wait(500)

      // after filter by Age this element should be removed by DOM
      cy.get('ng2-smart-table .ng-star-inserted nav').should('not.exist')

      // Now validate each filtered value
      cy.get('tbody tr').each((tableRow) => {
        if (age !== 200) {
          cy.wrap(tableRow).find('td').eq(6).should('contain', age)
        } else {
          cy.get('tbody tr td').should('contain', 'No data found')
        }
      })
    })
  })
})
