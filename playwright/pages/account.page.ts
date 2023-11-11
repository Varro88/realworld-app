import { Page } from "@playwright/test";
import {expect, test} from "@playwright/test";
import { SideBlock } from "./sideBlock";

export class AccountPage {
    readonly page : Page;
    readonly sideBlock : SideBlock;

    readonly firstNameLocator = 'user-settings-firstName-input';
    readonly lastNameLocator = 'user-settings-lastName-input';
    readonly emailLocator = 'user-settings-lastName-input';
    readonly saveButtonLocator = 'user-settings-submit';

    constructor(page : Page) {
        this.page = page;
        this.sideBlock = new SideBlock(page);
    }

    async updateFirstName(newValue : string) {
        await this.page.getByTestId(this.firstNameLocator).clear();
        await this.page.getByTestId(this.firstNameLocator).pressSequentially(newValue);
        await this.page.getByTestId(this.saveButtonLocator).click();
        const lastName = await this.page.getByTestId(this.lastNameLocator).inputValue();
        this.sideBlock.verifyFullName(newValue, lastName);
    }
}