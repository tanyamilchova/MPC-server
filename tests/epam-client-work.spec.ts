import { test, expect } from '@playwright/test';
import path from 'path';

test('EPAM Client Work navigation', async ({ page }, testInfo) => {
  const screenshotsDir = path.join(testInfo.outputDir, 'screenshots');

  await test.step('Navigate to EPAM homepage', async () => {
    // Navigate and wait for full load
    await page.goto('https://www.epam.com/', { waitUntil: 'load', timeout: 60000 });
    await page.waitForLoadState('networkidle');

    // Screenshot after navigation
    await page.screenshot({ path: path.join(screenshotsDir, 'step-1-home.png'), fullPage: true });

    // Basic sanity check: header or main banner is visible
    const header = page.locator('header');
    await expect(header).toBeVisible({ timeout: 15000 });
  });

  await test.step('Click Services in the header', async () => {
    const servicesLink = page.getByRole('link', { name: /services/i });
    await expect(servicesLink).toBeVisible({ timeout: 15000 });
    await servicesLink.click();
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: path.join(screenshotsDir, 'step-2-services-clicked.png'), fullPage: true });
  });

  await test.step('Click Explore Our Client Work', async () => {
    // This locator is intentionally flexible to match variations in the link text
    const exploreLink = page.getByRole('link', { name: /explore (our )?client work/i });
    await expect(exploreLink).toBeVisible({ timeout: 15000 });
    await exploreLink.click();
    await page.waitForLoadState('networkidle');

    await page.screenshot({ path: path.join(screenshotsDir, 'step-3-explore-clicked.png'), fullPage: true });
  });

  await test.step('Verify Client Work text is visible', async () => {
    const clientWork = page.getByText(/client work/i);
    await expect(clientWork).toBeVisible({ timeout: 15000 });

    await page.screenshot({ path: path.join(screenshotsDir, 'step-4-client-work-visible.png'), fullPage: true });
  });
});
