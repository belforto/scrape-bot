const { v4: uuidv4 } = require('uuid');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

// const fs = require('fs');
// const path = require('path');

// function delay(time) {
// 	console.log('delaay');
// 	return new Promise(function (resolve) {
// 		setTimeout(resolve, time);
// 	});
// }

(async () => {
	const whereToGO = `https://whatismycountry.com`;

	const browser = await puppeteer.launch({
		// args: ['--proxy-server=socks4://96.9.77.192:55796'],
		headless: false,
		dumpio: true,
		defaultViewport: {
			width: 1024,
			height: 900,
		},
	});
	try {
		const page = await browser.newPage();
		await page.goto(whereToGO, {
			waitUntil: 'networkidle2',
		});
		const element = await page.waitForSelector('#country'); // select the element
		const value = await element.evaluate((el) => el.textContent);
		console.log('value: ', value);
	} catch (error) {
	} finally {
		await browser.close();
	}
})();
