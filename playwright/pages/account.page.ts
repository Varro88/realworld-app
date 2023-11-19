import { Page } from "@playwright/test";
import { SideBlock } from "./sideBlock";

export class AccountPage {
    readonly page : Page;
    readonly sideBlock : SideBlock;

    readonly firstNameLocator = 'user-settings-firstName-input';

    constructor(page : Page) {
        this.page = page;
        this.sideBlock = new SideBlock(page);
    }

    async updateFirstName(newValue : string) {
        await this.page.getByTestId(this.firstNameLocator).clear();
        await this.page.getByTestId(this.firstNameLocator).pressSequentially(newValue);
        await this.page.getByTestId('user-settings-submit').click();
        const lastName = await this.page.getByTestId('user-settings-lastName-input').inputValue();
        await this.page.reload();
        this.sideBlock.verifyFullName(newValue, lastName);
    }
}