import { Page } from "@playwright/test";
import {expect, test} from "@playwright/test";
import { SideBlock } from "./sideBlock";
import { AccountPage } from "./account.page";

export class TransactionDetailsPage {
    readonly page : Page;
    readonly headerLocator = 'transaction-detail-header';

    constructor(page : Page) {
        this.page = page;
    }

    async verifyAmount(id, amount) {
        await expect(this.page.getByTestId(this.headerLocator)).toBeVisible();
        await expect(this.page.getByTestId(`transaction-amount-${id}`)).toHaveText(amount);
    }
}