import { Page, Locator } from "@playwright/test";

export class WHCategoriesPage {
    readonly page: Page;

    readonly mainMenuIcon: Locator;
    readonly endScroll: Locator;
    readonly supplyChainItem: Locator;
    readonly WHSetupLabel: Locator;
    readonly WHCategoriesLabel: Locator;

    readonly addWHCategoriesBtn: Locator;
    readonly editWHCategoriesBtn: Locator;
    readonly saveWHCategoriesBtn: Locator;
    readonly cancelWHCategoriesBtn: Locator;
    readonly deleteWHCategoriesBtn: Locator;
    readonly yesDeleteWHCategoriesBtn: Locator;

    readonly nameEnWHField: Locator;
    readonly nameArWHField: Locator;
    readonly descWHField: Locator;
    readonly prefixWHField: Locator;


    constructor(page: Page) {
        this.page = page;
        this.mainMenuIcon = page.locator('[class="pr-2 start-nav pl-1"]');
        this.endScroll = page.locator('[id="endDirBtn"]');
        this.supplyChainItem = page.locator('[src="/nav/BO-3-BO-Supply-Chain.svg"]');
        this.WHSetupLabel = page.getByText('Warehouses Setup');
        this.WHCategoriesLabel = page.locator('[href="/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/"]');

        this.addWHCategoriesBtn = page.locator('[class="k-button k-button-icontext k-grid-add d-inline-block"]');
        this.editWHCategoriesBtn = page.locator('[class="k-button k-button-icontext k-grid-edit d-inline-block"]');
        this.saveWHCategoriesBtn = page.locator('[class="k-button k-button-icontext k-primary k-grid-update"]');
        this.cancelWHCategoriesBtn = page.locator('[class="k-button k-button-icontext k-grid-cancel"]');
        this.deleteWHCategoriesBtn = page.locator('[class="k-button k-button-icontext k-grid-delete k-grid-showConfirmPopup d-inline-block"]');
        this.yesDeleteWHCategoriesBtn = page.locator('[class="btn btn-danger btn-sm"]');

        this.nameEnWHField = page.locator('[name="EnName"]');
        this.nameArWHField = page.locator('[name="ArName"]');
        this.descWHField = page.locator('[name="Description"]');
        this.prefixWHField = page.locator('[name="Prefix"]');
    }

    async naviagate_to_homepage(url: string) {
        await this.page.goto(url);
    }
    async naviagate_to_whCategoriesList(url: string) {
        await this.page.goto(url);
    }
    async open_WHCategories() {
        await this.mainMenuIcon.click();
        await this.endScroll.click({ clickCount: 9 });
        await this.supplyChainItem.click();
        await this.WHSetupLabel.hover();
        await this.WHCategoriesLabel.click();
    }

    async fill_WHCategory(nameEnWH: string, nameArWH: string, descWH: string, prefixWH: string) {
        await this.nameEnWHField.click();
        await this.nameEnWHField.fill(nameEnWH);

        await this.nameArWHField.click();
        await this.nameArWHField.fill(nameArWH);

        await this.descWHField.click();
        await this.descWHField.fill(descWH);

        await this.prefixWHField.click();
        await this.prefixWHField.fill(prefixWH);
    }

    async add_WHCategory() {
        await this.addWHCategoriesBtn.click();
    }
    async edit_WHCategory(itemIndex: number) {
        await this.editWHCategoriesBtn.nth(itemIndex).click();
    }
    async delete_WHCategory(itemIndex: number) {
        await this.deleteWHCategoriesBtn.nth(itemIndex).click();
        await this.yesDeleteWHCategoriesBtn.click();
    }

    async save_WHCategory() {
        await this.saveWHCategoriesBtn.click();
    }
    async cancel_WHCategory() {
        await this.cancelWHCategoriesBtn.click();
    }




}