/// <reference types="cypress" />

context('Using Dialog Boxes', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()
  })

  it('dialog box', () => {
    // first way
    // it's not good because if the dialog box is not show
    // the validation won't be make
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', (confirm) => {
    //   expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    // second way
    // using stub is better than the previous way
    // const stub = cy.stub()
    // cy.on('window:confirm', stub)
    // cy.get('tbody tr')
    //   .first()
    //   .find('.nb-trash')
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
    //   })

    // for the false flow
    cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
  })
})
