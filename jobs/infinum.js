// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra');
const fs = require('fs');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const chromePaths = require('chrome-paths');

const saveOnDisk = async (data) => {
	const nameOfScrapingSource = 'infinum';

	const date = new Date().toLocaleString().replaceAll('/', '-');
	const jobsToFS = data;
	const stringifiedJobsToFs = JSON.stringify(jobsToFS);
	const fileName = `${nameOfScrapingSource}-${date}-${jobsToFS.length}-job.json`;

	fs.writeFileSync('../data/' + fileName, stringifiedJobsToFs);

	console.log(`\n${fileName} - created \n\n total length ${jobsToFS.length} `);
};

// add stealth plugin and use defaults (all evasion techniques)
puppeteer.use(StealthPlugin());

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
		const page = await browser.newPage();

		await page.goto('https://infinum.com/careers/');

		const data = await page.evaluate(() => {
			const listOfJobs = [];
			Array.from(document.querySelectorAll('.job-item__link'), (e) => {
				const dataRow = e.innerText.split('\n\n');
				const jobObject = {
					company: 'infinum',
					link: e.href,
					title: dataRow[0],
					location: dataRow[1]?.match('[A-Za-z]+'),
				};
				listOfJobs.push(jobObject);
			});
			return listOfJobs;
		});

		await browser.close();
		saveOnDisk(data);
	});
