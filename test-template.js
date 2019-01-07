const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');

expect.extend({ toMatchImageSnapshot });

describe('<%= screensDir %>', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch();
    });

    it('<%= snapshotName %>', async () => {
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
