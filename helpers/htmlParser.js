const Promise = require('bluebird');

const getFieldFromHtml = (field, $) => {
	return new Promise((resolve, reject) => {
		resolve($(field.selector).text().trim());
	});
};

const getFieldsFromHtml = ($, fields) => {
	const actions = fields.map( field => getFieldFromHtml(field, $));
	return Promise.all(actions);
};

exports.getFieldsFromHtml = getFieldsFromHtml;