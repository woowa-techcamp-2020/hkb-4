const config = require('./webpack.config.js');

const development = {
	...config,
	mode: 'development',
};

module.exports = development;
