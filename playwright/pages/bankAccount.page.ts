import { Page } from "@playwright/test";
import {expect, test} from "@playwright/test";
import { SideBlock } from "./sideBlock";
import { AccountPage } from "./account.page";

export class BankAccountPage {
    readonly page : Page;
    readonly headerLocator = 'transaction-detail-header';

    constructor(page : Page) {
        this.page = page;
    }

    async deleteBankAccount(id: string, name: string) {
        await this.page.getByTestId(`bankaccount-list-item-${id}`).getByTestId('bankaccount-delete').click();
        await expect(this.page.getByTestId(`bankaccount-list-item-${id}`)).toHaveText(`${name} (Deleted)`)
    }

    async createAccount(bank: string, routingNum: string, accountNum: string) {
        await this.page.getByTestId('bankaccount-new').click();
        await this.page.locator('#bankaccount-bankName-input').pressSequentially(bank);
        await this.page.locator('#bankaccount-routingNumber-input').pressSequentially(routingNum);
        await this.page.locator('#bankaccount-accountNumber-input').pressSequentially(accountNum);

        const responsePromise = this.page.waitForResponse(resp => resp.url().includes('/graphql') && resp.status() === 200);
        await this.page.getByTestId('bankaccount-submit').click();
        const response = await responsePromise;
        
        const id = (await response.json()).data.createBankAccount.id;
        await expect(this.page.getByTestId(`bankaccount-list-item-${id}`).locator('p')).toHaveText(bank);
    }
}