import { Page } from "@playwright/test";
import {expect} from "@playwright/test";

export class SideBlock {
    readonly page : Page;
    readonly fullNameLocator = 'sidenav-user-full-name';

    constructor(page : Page) {
        this.page = page;
    }

    async verifyFullName(firstName, lastName) {
        const expected = firstName + " " + lastName[0];
        await expect(this.page.getByTestId(this.fullNameLocator)).toHaveText(expected);
    }

    async verifyBalance(balance: string) {
        await expect(this.page.getByTestId('sidenav-user-balance')).toHaveText(balance);
    }
}