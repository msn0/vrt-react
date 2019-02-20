const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 8'];

expect.extend({ toMatchImageSnapshot });

describe('foobar/__screenshots__', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch();
    });

    it('Simple-FooBar', async () => {
        const page = await browser.newPage();
        await page.emulate(iPhone);
        await page.goto('http://localhost:1234/foobar.html', {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        const element = await page.waitForSelector('body > *');
        const image = await element.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: '../../components/foobar/__screenshots__',
            customSnapshotIdentifier: 'Simple-FooBar'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
