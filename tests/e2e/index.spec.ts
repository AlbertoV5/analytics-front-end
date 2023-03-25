import { test, expect } from '@playwright/test';


test.describe('Verify Page Titles.', async () => {
    const links: {title: string, href: string}[] = [
        {title: "Calculators", href: "calculators"},
        {title: "Metrics", href: "metrics"},
        {title: "Database", href: "database"},
        {title: "Health Analytics MX", href: "support"}, // TODO: Fix Markdown titles.
        {title: "Login", href: "login"},
    ];
    for (const item of links) {
        test(`testing with ${item.title}`, async ({page}) => {
            await page.goto(`/${item.href}`);
            await expect(page).toHaveTitle(item.title);
        });
    }
});