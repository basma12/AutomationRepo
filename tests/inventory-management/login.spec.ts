import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './login.page';

const authFile = './token.json';

setup.use({
    viewport: {
       // width:1536,
     //   height:824
      width:1920,
      height:1040
    }
  });

setup('authenticate', async ({ page }) => {

    const loginPage =new LoginPage(page);
    await loginPage.naviagate_to_login('http://dev-testing.andalusiagroup.net:5002');
    await loginPage.perform_login('sokar','122333');
    await page.waitForURL(/.*dashboard/);
    await expect(page.locator('[src="/img/home.c634b49e.png"]')).toBeVisible();

    // End of authentication steps.
    await page.context().storageState({ path: authFile });
});