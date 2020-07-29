const config = require('./webpack.config.js');

const development = {
	...config,
	mode: 'development',
	devtool: 'inline-source-map',
};

module.exports = development;
