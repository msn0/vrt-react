const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('<%= describe %>', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch();
    });

    it('<%= snapshotName %>', async () => {
        const page = await browser.newPage();

        await page.goto('http://localhost:<%= port %>/<%= file %>', {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        const element = await page.waitForSelector('body > *');
        const image = await element.screenshot();

        expect(image).toMatchImageSnapshot({
            customSnapshotsDir: '<%= screensDir %>',
            customSnapshotIdentifier: '<%= snapshotName %>'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
