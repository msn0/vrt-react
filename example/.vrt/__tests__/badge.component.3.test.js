const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('/Users/michal.jezierski/work/vrtc/example/src/components/badge.3/__screenshots__', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(90000);
        browser = await puppeteer.launch();
    });

    it('badge.component.3', async () => {
        const page = await browser.newPage();

        await page.goto('http://localhost:63702/badge.component.3.html');
        const element = await page.waitForSelector('body > *');
        const image = await element.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: '/Users/michal.jezierski/work/vrtc/example/src/components/badge.3/__screenshots__',
            customSnapshotIdentifier: 'badge.component.3'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
