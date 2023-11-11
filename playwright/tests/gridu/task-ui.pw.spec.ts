import {expect, test} from "@playwright/test";
import testData from './../../resources/ui.json';
import { SignupPage } from "./../../pages/signup.page";
import { signInAs } from "./../../utils/helper";

const apiUrl = "http://localhost:3002";

let testUser, newUser, testTrans, testAccount, deleteAccount;

test.describe('UI tests Playwright', () => {

    test.beforeAll(async ({ }) => {
        expect(testData).not.toBeNull;
        newUser = testData.users.new;
        testUser = testData.users.test;
        testTrans = testData.transactions.test;
        testAccount = testData.bankAccounts.test;
        deleteAccount = testData.bankAccounts.delete;
    });

    test('1 Should register a new account', async ({ page }) => {
        await page.goto('http://localhost:3000/signup');

        const signupPage = new SignupPage(page);
        await signupPage.signUp(newUser);

        const authResponse = await page.request.post(`${apiUrl}/login`, {
            data: {
                "username": newUser.username,
                "password": newUser.password
            }
        });
        expect(authResponse.ok()).toBeTruthy();
    });

    test('2 Should log in with existing account', async ({ page }) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);
        await homePage.verifyUsername(testUser.username);
    });

    test('3+7 Should see account details + update account user settings', async ({ page }) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);
        const accountPage = await homePage.openMyAccount();
        await accountPage.updateFirstName('Updated');
    })

    test('4 Should see account balance', async ({page}) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);
        homePage.sideBlock.verifyBalance(testUser.balance);
    })

    test('5+6 Should see account transactions history + transaction details', async ({page}) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);

        await homePage.openMineTransactions();
        homePage.verifyTransactionAmount(testTrans.id, testTrans.amount);
        const transactionDetailsPage = await homePage.openTransaction(testTrans.id);
        transactionDetailsPage.verifyAmount(testTrans.id, testTrans.amount);
    })

    test('8 Should add new bank account', async ({page}) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);
        const bankAccountPage = await homePage.openBankAccount();

        await bankAccountPage.createAccount(testAccount.bankName, testAccount.routingNumber, testAccount.accountNumber);
    })

    test('9 Should delete bank account', async ({page}) => {
        const homePage = await signInAs(testUser.username, testUser.password, page);
        const bankAccountPage = await homePage.openBankAccount();
        await bankAccountPage.deleteBankAccount(deleteAccount.id, deleteAccount.name);
    })
});