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

        await page.goto('http://localhost:<%= port %>/<%= file %>');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot();
    });

    afterAll(async () => {
        await browser.close();
    });
});
