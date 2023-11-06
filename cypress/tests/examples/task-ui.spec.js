describe('Login spec', () => {
    let testData;

    before(() => {
        cy.fixture('testData').then(data => {
            testData = data.ui;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should log in', () => {
        cy.loginByApi(testData.testuser.username, testData.testuser.password).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('1 Should register a new account', function () {
        cy.signUpUser(testData.newUser);
        cy.loginByApi(testData.newUser.username, testData.newUser.password).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('2 Should log in with existing account', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.verifyUsername(testData.testuser.username);
    });

    it('3+7 Should see account details + update account user settings', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.verifyEmail(testData.testuser.email);
        let newName = testData.testuser.firstName + "A";
        cy.updateFirstName(newName);
    });

    it('4 Should see account balance', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.verifyBalance(testData.testuser.balance);
    });

    it('5+6 Should see account transactions history + transaction details', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.openMineTransactions();
        cy.verifyTransactionInList(testData.transactionIdToCheck, testData.transactionAmountToCheck);
        cy.openTransaction(testData.transactionIdToCheck);
        cy.verifySeparateTransaction(testData.transactionIdToCheck, testData.transactionAmountToCheck);
    });

    it('8 Should add new bank account', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.createBankAccount(testData.bankAccount.bankName, testData.bankAccount.routingNumber, testData.bankAccount.accountNumber);
    });

    //9 Should delete bank account
    it('9 Should delete bank account', function () {
        cy.login(testData.testuser.username, testData.testuser.password);
        cy.deleteBankAccount(testData.bankAccountIdToDelete, testData.bankAccountNameToDelete);
    });
});