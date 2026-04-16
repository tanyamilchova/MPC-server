import { test, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import path from 'path';

test('EPAM Client Work navigation', async ({ page }, testInfo) => {
  const screenshotsDir = path.join(testInfo.outputDir, 'screenshots');
  await mkdir(screenshotsDir, { recursive: true });

  // Step 1: Navigate to EPAM homepage
  await test.step('Navigate to EPAM homepage', async () => {
    await page.goto('https://www.epam.com/', { waitUntil: 'load', timeout: 60_000 });
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'step-1-home.png'), fullPage: true });
    const banner = page.getByRole('banner');
    await expect(banner).toBeVisible({ timeout: 10_000 });
  });

  // Step 2: Click Services in the header
  await test.step('Click Services in header', async () => {
    const servicesLink = page.getByRole('link', { name: /services/i });
    await expect(servicesLink).toBeVisible({ timeout: 10_000 });
    await servicesLink.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'step-2-services-clicked.png'), fullPage: true });
  });

  // Step 3: Click Explore Our Client Work
  await test.step('Click Explore Our Client Work', async () => {
    // Use a flexible locator in case the exact link text varies slightly
    const exploreLink = page.getByRole('link', { name: /explore (our )?client work/i });
    await expect(exploreLink).toBeVisible({ timeout: 15_000 });
    await exploreLink.click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(screenshotsDir, 'step-3-explore-clicked.png'), fullPage: true });
  });

  // Step 4: Verify that "Client Work" text is visible
  await test.step('Verify Client Work text is visible', async () => {
    const clientWorkHeading = page.getByText(/client work/i);
    await expect(clientWorkHeading).toBeVisible({ timeout: 15_000 });
    await page.screenshot({ path: path.join(screenshotsDir, 'step-4-client-work-visible.png'), fullPage: true });
  });
});
