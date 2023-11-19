export default {
    signin: {
        signupButton: '[data-test="signup"]',
    },

    signup: {
        firstNameInput: "#firstName",
        lastNameInput: "#lastName",
        usernameInput: "#username",
        passwordInput: "#password",
        confirmPasswordInput: "#confirmPassword",
        signupSubmitButton: '[data-test="signup-submit"]'
    },

    side: {
        usernameLabel: '[data-test=sidenav-username]',
        settingsMenuItem: '[data-test="sidenav-user-settings"]',
        balanceLabel: '[data-test="sidenav-user-balance"]',
        bankAccountMenuItem: '[data-test="sidenav-bankaccounts"]'
    },

    transactions: {
        mineTab: '[data-test="nav-personal-tab"]',
        transactionItem: (id: string) => {
            return `[data-test="transaction-item-${id}"]`;
        },
        transactionAmount: (id: string) => {
            return `[data-test="transaction-amount-${id}"]`;
        },
        transactionTitle: 'h2[data-test="transaction-detail-header"]',
    },

    settings: {
        emailInput: '#user-settings-email-input',
        firstNameInput: '#user-settings-firstName-input',
        submitButton: '[data-test="user-settings-submit"]'
    },

    bankAccount: {
        createNewButton: '[data-test="bankaccount-new"]',
        bankAccountItem: (id: string): string => {
            return `li[data-test="bankaccount-list-item-${id}"]`;
        },
        deleteAccountButton: (id: string): string => {
            return `li[data-test="bankaccount-list-item-${id}"] button[data-test="bankaccount-delete"]`;
        }
    },

    newBankAccount: {
        bankNameInput: '#bankaccount-bankName-input',
        routingNumberInput: '#bankaccount-routingNumber-input',
        accountNumberInput: '#bankaccount-accountNumber-input',
        submitButton: '[data-test="bankaccount-submit"]'
    }
};
