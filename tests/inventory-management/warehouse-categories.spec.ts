import { test, expect, Page } from '@playwright/test';
import { WHCategoriesPage } from './warehouse-categories.page';

let whCategoriesPage: any;


 test.use({
   viewport: {
     width: 1536,
    height: 824
//     // width:1920,
//     //height:1040
   }
 })

test.describe('Warehouse Categories', () => {

  test('Open supply chain WH Categories', async ({page}) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_homepage('http://dev-testing.andalusiagroup.net:5002/dashboard/');
    await whCategoriesPage.open_WHCategories();

    await expect(page.locator('[class="k-button k-button-icontext k-grid-add d-inline-block"]')).toBeVisible();
  });

  test('Add valid WH Category', async ({page}) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_whCategoriesList('http://dev-testing.andalusiagroup.net:5002/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/');
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();

    await expect(page.locator('[class="only-left-text tooltipWidth"]').nth(0)).toHaveText('WH_C En' + timeStamp);

  });

  test('Cancel Adding WH Category', async ({page}) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_whCategoriesList('http://dev-testing.andalusiagroup.net:5002/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/');
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.cancel_WHCategory();

    await expect(page.locator('[class="only-left-text tooltipWidth"]', { hasText: 'WH_C En' + timeStamp }).nth(0)).toHaveCount(0);
  });

  test('Edit WH Category English Name', async ({page}) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_whCategoriesList('http://dev-testing.andalusiagroup.net:5002/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/');
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_WHCategory('new WH_C En' + timeStamp, 'new WH_C Ar' + timeStamp, 'new WH_C desc' + timeStamp, 'newWHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();

    await expect(page.locator('[class="only-left-text tooltipWidth"]').nth(0)).toHaveText('new WH_C En' + timeStamp);
  });

  test('Cancel Editing WH Category English Name', async ({page}) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_whCategoriesList('http://dev-testing.andalusiagroup.net:5002/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/');
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_WHCategory('new WH_C En' + timeStamp, 'new WH_C Ar' + timeStamp, 'new WH_C desc' + timeStamp, 'newWHPrefix' + timeStamp);
    await whCategoriesPage.cancel_WHCategory();

    await expect(page.locator('[class="only-left-text tooltipWidth"]', { hasText: 'new WH_C En' + timeStamp }).nth(0)).toHaveCount(0);
  });

  test('Delete first WH Category', async ({page}) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.naviagate_to_whCategoriesList('http://dev-testing.andalusiagroup.net:5002/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/');
    const firstListItemEnName:any = await page.locator('[class="only-left-text tooltipWidth"]').nth(0).textContent();
    //console.log(firstListItemEnName);
    //Delete the item
    await whCategoriesPage.delete_WHCategory(0);
    //Assert that the deleted item is hidden
    await expect(page.locator('[class="only-left-text tooltipWidth"]', { hasText: firstListItemEnName }).nth(0)).toHaveCount(0);
  });
});
