const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('/Users/michal.jezierski/work/vrtc/example/src/components/header.7/__screenshots__', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch();
    });

    it('header.component.7', async () => {
        const page = await browser.newPage();
        // await page.setViewport({ width: 600, height: 400 });

        await page.goto('http://localhost:51375/header.component.7.html');
        const element = await page.waitForSelector('body > *');
        const image = await element.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: '/Users/michal.jezierski/work/vrtc/example/src/components/header.7/__screenshots__',
            customSnapshotIdentifier: 'header.component.7'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
