import { Page } from "@playwright/test";
import {expect } from "@playwright/test";

export class TransactionDetailsPage {
    readonly page : Page;

    constructor(page : Page) {
        this.page = page;
    }

    async verifyAmount(id, amount) {
        await expect(this.page.getByTestId('transaction-detail-header')).toBeVisible();
        await expect(this.page.getByTestId(`transaction-amount-${id}`)).toHaveText(amount);
    }
}