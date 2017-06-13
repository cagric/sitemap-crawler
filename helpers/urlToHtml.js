const Promise = require('bluebird');
const cheerio = require('cheerio');
const rp = require('request-promise');

const convert = (url) => {
    return new Promise((resolve, reject) => {
		const options = {
			uri: url.loc[0],
			transform : body => cheerio.load(body)
		};
		
		rp(options)
		.then($ => resolve($))
		.catch(err => reject(err));
    });
};

exports.convert =  convert;