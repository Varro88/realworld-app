import {expect, test} from "@playwright/test";
import testData from './../../resources/api.json';

const apiUrl = "http://localhost:3002"
let bankAccountIdToDelete;
let testUser;
let transIdToComment;

test.describe('API tests Playwright', () => {

    test.beforeAll(async ({ }) => {
        expect(testData).not.toBeNull;
        bankAccountIdToDelete = testData.bankAccounts.idToDelete;
        testUser = testData.users.test;
        transIdToComment = testData.transactions.idToComment;
    });

    test.beforeEach(async ({ request }) => {
        const authResponse = await request.post(`${apiUrl}/login`, {
            data: {
                "username": testUser.username,
                "password": testUser.password
            }
        });
        expect(authResponse.ok()).toBeTruthy();
    });

    test('1 Gets a list of bank accounts for user', async ({ request }) => {
        const accountsResponse = await request.get(`${apiUrl}/bankAccounts`);
        expect(accountsResponse.ok()).toBeTruthy();
        const json = await accountsResponse.json();
        expect(json).toHaveProperty('results');
        expect(json.results[0].userId).toEqual(testUser.id);
    });

    test('2 Deletes a bank account (DELETE /:bankAccountId)', async({ request }) => {
        const response = await request.delete(`${apiUrl}/bankAccounts/${bankAccountIdToDelete}`);
        expect(response.ok()).toBeTruthy();
        const text = await response.text();
        console.log(text);
        expect(text).toEqual("{}");
    });

    test('3 Get a user profile by username (GET /users/profile/:username)', async({ request }) => {
        const response = await request.get(`${apiUrl}/users/profile/${testUser.username}`);
        expect(response.ok()).toBeTruthy();

        const json = await response.json();
        expect(json.user.firstName).toEqual(testUser.firstName);
        expect(json.user.lastName).toEqual(testUser.lastName);
    });

    test('4 Create comment for transaction', async({ request }) => {
        const response = await request.post(`${apiUrl}/comments/${transIdToComment}`, {
            data: {
                "content":"comment123"
            }
        }
        );
        expect(response.ok()).toBeTruthy();
        expect(await response.text()).toEqual('OK');
    });

    test('5 Gets list of users (GET /users)', async({ request }) => {
        const response = await request.get(`${apiUrl}/users`);
        expect(response.ok()).toBeTruthy();
        const json = await response.json();
        expect(json.results).toHaveLength(4);
    });
});
