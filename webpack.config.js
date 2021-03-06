const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './client/src/index.ts',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'index.css',
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.ts$/,
				use: ['ts-loader'],
			},
			{
				test: /\.(scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: './dist/',
							name: '[name].[ext]?[hash]',
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)$/,
				use: {
					loader: 'url-loader',
					options: {
						publicPath: './dist/',
						name: '[name].[ext]?[hash]',
						limit: 5000,
					},
				},
			},
		],
	},
};
