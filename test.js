const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('VRT', () => {
    let browser;

    beforeAll(async () => {
        browser = await puppeteer.launch();
    });

    it('600', async () => {
        const page = await browser.newPage();
        await page.setViewport({ width: 600, height: 400 });

        await page.goto('http://localhost:8080/badge.component.html');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotIdentifier: '600x400'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
