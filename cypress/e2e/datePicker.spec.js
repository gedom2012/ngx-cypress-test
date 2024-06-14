/// <reference types="cypress" />

context('Using Date Picker', () => {
  function selectDayFromCurrent(day) {
    if (day < 1) {
      throw new Error('the value should be greater than 0')
    }
    // create a JS customized date
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonth = date.toLocaleDateString('en-US', { month: 'short' })
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonth} ${futureDay}, ${futureYear}`
    cy.get('nb-calendar-navigation')
      .invoke('attr', 'ng-reflect-date')
      .then((dateAttribute) => {
        if (!dateAttribute.includes(futureMonth) || !dateAttribute.includes(futureYear)) {
          cy.get('[data-name="chevron-right"]').click()
          selectDayFromCurrent(day)
        } else {
          // get the date from the current month
          cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        }
      })
    return dateToAssert
  }

  it('Date Picker', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then((input) => {
        cy.wrap(input).click()

        const dateToAssert = selectDayFromCurrent(30)
        cy.wrap(input).invoke('prop', 'value').should('contain', dateToAssert)
        cy.wrap(input).should('have.value', dateToAssert)
      })
  })
})
