describe('service is available', function() {
    it('should be available on localhost:3000', function() {
        cy.visit('http://localhost:3000');
    });
    it('should drag & drop and modal order', function () {
        const email = "asd@ya.ru"
        const password = "asd"
        cy.visit('http://localhost:3000');
        cy.get('[data-test-id="ingredient-link"]:first').trigger('dragstart').trigger("dragleave");
        cy.get('[data-test-id="burger-container"]').trigger("drop").trigger("dragend");
        cy.get('[data-test-id="button-order"]').click();
        cy.get('[data-test-id="email-input"]').type(`${email}{enter}`)
        cy.get('[data-test-id="password-input"]').type(`${password}{enter}`)
        cy.wait(500)
        cy.get('[data-test-id="button-order"]').click();
        cy.wait(16000);
        cy.get('[data-id="modal-close-icon"]').click();
    });

    it('should open ingredient modal & close', function () {
        cy.visit('http://localhost:3000');
        cy.get('[data-test-id="ingredient-link"]:first').click();
        cy.get('[data-id="ingredient-name"]').contains('Краторная булка N-200i');
        cy.get('[data-id="ingredient-calories"]').contains('420');
        cy.get('[data-id="ingredient-proteins"]').contains('80');
        cy.get('[data-id="ingredient-fat"]').contains('24');
        cy.get('[data-id="ingredient-carbohydrates"]').contains('53');
        cy.wait(3000);
        cy.get('[data-id="modal-close-icon"]').click();
    });
});