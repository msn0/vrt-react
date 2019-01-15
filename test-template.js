const { toMatchImageSnapshot } = require('jest-image-snapshot');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 8'];

expect.extend({ toMatchImageSnapshot });

describe('<%= describe %>', () => {
    let browser;

    beforeAll(async () => {
        jest.setTimeout(60000);
        browser = await puppeteer.launch(<% if (ci) { %> { headless: false } <% } %>);
    });

    it('<%= snapshotName %>', async () => {
        const page = await browser.newPage();
        await page.emulate(iPhone);
        await page.goto('http://localhost:<%= port %>/<%= file %>', {
            waitUntil: 'networkidle2',
            timeout: 0
        });
        const element = await page.waitForSelector('body > *');
        const image = await element.screenshot();

        expect(image).toMatchImageSnapshot({
            <% if (ci) { %>
                failureThreshold: '0.5',
                failureThresholdType: 'percent',
            <% } %>
            customSnapshotsDir: '<%= screensDir %>',
            customSnapshotIdentifier: '<%= snapshotName %>'
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
