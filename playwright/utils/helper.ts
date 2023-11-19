import { Page } from "@playwright/test";
import { HomePage } from "./../pages/home.page";
import { SigninPage } from "./../pages/signin.page";

export async function signInAs(username, password, page : Page) {
    await page.goto('http://localhost:3000/signin');

    const signinPage = new SigninPage(page);
    const homePage = await signinPage.signin(username, password);

    await homePage.verifyUsername(username);

    return new HomePage(page);
}