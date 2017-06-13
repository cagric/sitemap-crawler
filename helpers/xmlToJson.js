const Promise = require('bluebird');
const xml2js = Promise.promisifyAll(require('xml2js'));
const fs = Promise.promisifyAll(require('fs'));

const parse = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFileAsync(filePath)
		.then(fileContent => xml2js.parseStringAsync(fileContent))
		.then(result => resolve(result))
		.catch(err=> reject(err));
    });
};

exports.parse =  parse;


