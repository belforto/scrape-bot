// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const chromePaths = require('chrome-paths');

// puppeteer usage as normal
puppeteer
	.launch({
		// executablePath: '/path/to/Chrome'
		executablePath: chromePaths.chrome,
		headless: false,
		defaultViewport: null,
		args: ['--no-sandbox', '--start-maximized'],
		slowMo: 250,
	})
	.then(async (browser) => {
		console.log('Running tests..');
		const page = await browser.newPage();
		page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));
		await page.goto('https://bot.sannysoft.com');
		await page.waitForTimeout(5000);
		await page.screenshot({ path: 'testresult.png', fullPage: true });
		await browser.close();
		console.log(`All done, check the screenshot. ✨`);
	});
