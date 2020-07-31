const config = require('./webpack.config.js');

const development = {
	...config,
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		port: 8080,
		hot: true,
	},
};

module.exports = development;
