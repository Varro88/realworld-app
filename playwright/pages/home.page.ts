import { Page } from "@playwright/test";
import {expect, test} from "@playwright/test";
import { SideBlock } from "./sideBlock";
import { AccountPage } from "./account.page";
import { TransactionDetailsPage } from "./transactionDetails.page";
import { BankAccountPage } from "./bankAccount.page";

export class HomePage {
    readonly page : Page;
    readonly sideBlock : SideBlock;

    constructor(page : Page) {
        this.page = page;
        this.sideBlock = new SideBlock(page);
    }

    async verifyUsername(username) {
        await expect(this.page.getByTestId('sidenav-username')).toHaveText(`@${username}`);
    }

    async openMineTransactions() {
        await this.page.getByTestId('nav-personal-tab').click();
    }

    async openMyAccount() {
        await this.page.getByTestId('sidenav-user-settings').click();
        return new AccountPage(this.page);
    }

    async openBankAccount() {
        await this.page.getByTestId('sidenav-bankaccounts').click();
        return new BankAccountPage(this.page);
    }

    async openTransaction(transactionIdToCheck: string) {
        await this.page.getByTestId(`transaction-item-${transactionIdToCheck}`).click();
        return new TransactionDetailsPage(this.page);
    }

    async verifyTransactionAmount(transactionId: string, transactionAmount: string) {
        await expect(this.page.getByTestId(`transaction-amount-${transactionId}`)).toHaveText(transactionAmount);
    }
}
