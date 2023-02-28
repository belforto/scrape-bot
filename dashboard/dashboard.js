const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const mustacheExpress = require('mustache-express');

router.get('/', function (req, res) {
	const filenames = fs
		.readdirSync('../data', { withFileTypes: true })
		.filter((item) => !item.isDirectory())
		.map((item) => item.name);
	console.log('filenames: ', filenames);

	res.render('index', {
		name: '4567fff8',
		jobs: filenames,
	});
	//__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.use(require('express-status-monitor')());
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/screens');
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
