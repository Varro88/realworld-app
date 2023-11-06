describe('Contacts', () => {
    let testData;

    before(() => {
        cy.fixture('testData').then(data => {
            testData = data.api;
        });
    });

    beforeEach(() => {
        cy.loginByApi(testData.testuser.username, testData.testuser.password);
    });

    it.only('1 should get bank accounts', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/bankAccounts`,
        }).then(response => {
            expect(response.status).to.be.eq(200);
            expect(response.body.results[0].userId).to.be.eq(testData.testuser.id);
        });
    });

    it.only('2 should delete bank accounts', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env("apiUrl")}/bankAccounts/${testData.bankAccountToDelete.id}`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.empty;
        });
    });

    it.only('3 should get user profile', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users/profile/${testData.testuser.username}`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.user.firstName).to.be.equal(testData.testuser.firstName);
            expect(response.body.user.lastName).to.be.equal(testData.testuser.lastName);
        });
    });

    it.only('4 should create comment for transaction', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/comments/${testData.transactionIdToComment}`,
            body: {
                content: "test comment",
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.equal('OK');
        });
    });

    it.only('5 should get list of users', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.results).to.have.lengthOf(4);
        });
    });

});