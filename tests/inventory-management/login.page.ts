import { Page, Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly userNameField: Locator;
    readonly passwordField: Locator;
    readonly loginBtn: Locator;

    constructor (page: Page){
        this.page=page;
        this.userNameField=page.locator('[id="userName"]');
        this.passwordField=page.locator('[id="password"]');
        this.loginBtn=page.locator('[class="btn btn-block submit-btn"]');
    }

    async naviagate_to_login(url:string) {
        await this.page.goto(url);
    }

    async perform_login(userName:string, password:string) {
        await this.userNameField.click();
        await this.userNameField.fill(userName);

        await this.passwordField.click();
        await this.passwordField.fill(password);

        await this.loginBtn.click();
    }
}

