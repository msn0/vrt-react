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

        await page.goto('http://localhost:50789/badge.component.html');
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: '/Users/michal.jezierski/work/vrtc/src/components/badge/__screenshots__',
            customSnapshotIdentifier: 'badge.component'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
