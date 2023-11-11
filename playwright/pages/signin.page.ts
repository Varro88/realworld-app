import { Page } from "@playwright/test";
import { HomePage } from "./home.page";

export class SigninPage {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;   
    }

    async signin(username : string, password : string) {
        await this.page.locator("#username").pressSequentially(username);
        await this.page.locator("#password").pressSequentially(password);
        await this.page.getByTestId("signin-submit").click();

        return new HomePage(this.page);
    }
}