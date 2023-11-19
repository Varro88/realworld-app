import { expect, type Locator, type Page } from '@playwright/test';

export class SignupPage {
    readonly page: Page;

    constructor(page : Page) {
        this.page = page;
    }

    async signUp(user) {
        await expect(this.page.locator('h1', { hasText: 'Sign Up' })).toBeVisible();
        await this.page.locator("#firstName").pressSequentially(user.firstName);
        await this.page.locator("#lastName").pressSequentially(user.lastName);
        await this.page.locator("#username").pressSequentially(user.username);
        await this.page.locator("#password").pressSequentially(user.password);
        await this.page.locator("#confirmPassword").pressSequentially(user.password);
        await this.page.locator("[data-test='signup-submit']").click();
    }
}