const Promise = require('bluebird');
const xmlToJson = require('./helpers/xmlToJson.js');
const urlToHtml = require('./helpers/urlToHtml.js');
const htmlParser = require('./helpers/htmlParser.js');
const config = require('config');

const processFile = file => {
	return new Promise((resolve, reject) => {
		xmlToJson.parse(file.name)
		.then(sitemap => {
			const actions = sitemap.urlset.url.map(urlToHtml.convert);
			return Promise.all(actions);
		})
		.then(htmlArray => {
			const actions = htmlArray.map( html => htmlParser.getFieldsFromHtml(html, file.fields));
			return Promise.all(actions);
		})
		.then(data => {
			resolve(data);
		})
		.catch(err => {
			reject(err);
		});    
	});
};

const files = config.get("files");

const actions = files.map(processFile);

const results = Promise.all(actions);

results
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(JSON.stringify(err));
});