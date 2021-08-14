/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname,'./client/index.tsx'),
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	output: {
		path: path.resolve(__dirname,'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,'index.html'),
		}),
	],
	devServer: {
		contentBase: './build',
		historyApiFallback: true,
		proxy: {
		  '/api': {
			target: 'http://localhost:3000',
		  },
		},
	  },
};