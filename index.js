const parser = require('rss-url-parser');
const fs = require('fs');

const jobsArray = async function (req, res) {
	try {
		const xml = await parser(
			'https://burzarada.hzz.hr/rss/rsskat1013.xml?AspxAutoDetectCookieSupport=1'
		);

		const poslovi = xml.map((item, index) => {
			const a = {
				title: item.title,

				summary: item.summary,
				description: item.description,
				pubDate: item.pubDate,
				link: item.link,
			};
			console.log(`\n----new job ${index} \n\n `, JSON.stringify(a));
			return a;
		});

		return poslovi;
	} catch (err) {
		console.log(err);
		return null;
	}
};

///RUN THE FUNC
///
(async () => {
	const nameOfScrapingSource = 'burza';

	const date = new Date().toLocaleString().replaceAll('/', '-');
	const jobsToFS = await jobsArray();
	const stringifiedJobsToFs = JSON.stringify(jobsToFS);
	const fileName = `${nameOfScrapingSource}-${date}-${jobsToFS.length}-job.json`;

	fs.writeFileSync('./data/' + fileName, stringifiedJobsToFs);

	console.log(`\n${fileName} - created \n\n total length ${jobsToFS.length} `);
})();
