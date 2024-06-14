/// <reference types="cypress" />

context('First Test Suit', () => {
    it('first test', () => {
        // how to find elements using cypress

        // this an example
        //<input _ngcontent-uwa-c19="" data-cy="imputEmail1" fullwidth="" id="inputEmail1" nbinput="" placeholder="Email" type="email" ng-reflect-full-width="" class="input-full-width size-medium shape-rectangle">

        // access the page
        cy.visit('/')

        //access the menu and submenu
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input')

        // by ID
        cy.get('#inputEmail1')

        // by class value
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[fullwidth]')

        // by attribute and value
        cy.get('[placeholder="Email"]')

        // by entire Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by two attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // by tag, attribute id and class
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

    });

    it('second test', () => {
        // Theory
        // get() - find elements on the page by locator globally
        // find() - find child elements by locator
        // contains() - find HTML text and by text and locator

        // access the page
        cy.visit('/')

        //access the menu and submenu
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // examples to perform it
        cy.contains('Sign in')
        cy.contains('[status="warning"]', 'Sign in')
        cy.contains('nb-card', 'Horizontal form').find('button')
        cy.contains('nb-card', 'Horizontal form').contains('Sign in')
        cy.contains('nb-card', 'Horizontal form').get('button') // this is not work because the get alway return all elements globally

        // cypress chains and DOM
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()
    });

    it('save subject of the command', () => {
        // access the page
        cy.visit('/')

        //access the menu and submenu
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // CANT DO THING LIKE THIS
        // const usingTheGrid = cy.contains('nb-card', 'Using the Grid')
        // usingTheGrid.find('[for="inputEmail1"]').should('contain', 'Email')
        // usingTheGrid.find('[for="inputPassword2"]').should('contain', 'Password')

        // 1 approach - Cypress Alias
        cy.contains('nb-card', 'Using the Grid').as('usingTheGrid')
        cy.get('@usingTheGrid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.get('@usingTheGrid').find('[for="inputPassword2"]').should('contain', 'Password')

        // 2 approach - then() methods
        cy.contains('nb-card', 'Using the Grid').then(usingTheGrid => {
            cy.wrap(usingTheGrid).find('[for="inputEmail1"]').should('contain', 'Email')
            cy.wrap(usingTheGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    });

    it('extract text values', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()


        // first way
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        // second way
        cy.get('[for="exampleInputEmail1"]').then(label => {
            const labelText = label.text()
            // using jquery
            expect(labelText).to.equal('Email address')
            // using cypress
            cy.wrap(labelText).should('contain', 'Email address')
        })

        // third way
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        // get attribute
        cy.get('[for="exampleInputEmail1"]').invoke('attr', 'class').then(classValue => {
            expect(classValue).to.equal('label')
        })

        // invoke property
        cy.get('#exampleInputEmail1').type('test@test.com')
        cy.get('#exampleInputEmail1').invoke('prop', 'value')
            // first way
            .should('contain', 'test@test.com')
            // second way
            .then(property => {
                expect(property).to.equal('test@test.com')
            })
    });

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            // using the force property to hidden elements
            // so, cypress won't fail when it tries to interact it
            cy.wrap(radioButtons).eq(0).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(1).check({ force: true }).should('be.checked')
            cy.wrap(radioButtons).eq(0).should('be.not.checked')
            cy.wrap(radioButtons).eq(2).should('be.disabled')
        })

    });

    it('checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // using the action check cypress validate if the element has already been checked
        // in this case it'll skip
        cy.get('[type=checkbox]').check({ force: true })

        // using the action click we need to inform the correct index to the cypress
        // also, using this one cypress won't validate if the element has been checked
        cy.get('[type=checkbox]').eq(0).click({ force: true })

    });
});
