const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('<%= snapshotName %>', () => {
    let browser;

    beforeAll(async () => {
        browser = await puppeteer.launch();
    });

    it('600', async () => {
        const page = await browser.newPage();
        // await page.setViewport({ width: 600, height: 400 });

        await page.goto('http://localhost:<%= port %>/<%= file %>');
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
