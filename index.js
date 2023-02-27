const parser = require('rss-url-parser');

module.exports = async function (req, res) {
	try {
		const xml = await parser(
			'https://burzarada.hzz.hr/rss/rsskat1013.xml?AspxAutoDetectCookieSupport=1'
		);

		const poslovi = xml.map((item) => {
			//  console.log("item ++",JSON.stringify(item))
			const a = {
				title: item.title,

				summary: item.summary,
				description: item.description,
				pubDate: item.pubDate,
				link: item.link,
			};
			console.log('----a  ++', JSON.stringify(a));
			return a;
		});

		return poslovi;
	} catch (err) {
		console.log(err);
		return null;
	}
};
