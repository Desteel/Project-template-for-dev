const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const pug = require('./webpack_config/pug');
const devserver = require('./webpack_config/devserver');
const css = require('./webpack_config/css');
const extractCSS = require('./webpack_config/css.extract');
const babel = require('./webpack_config/babel');
const images = require('./webpack_config/images');
const fonts = require('./webpack_config/fonts');

const PATHS = {
	source: path.join(__dirname, 'PROJECT/__template'),
    build: path.join(__dirname, 'PROJECT/_buildTemplate')
};

const _common = merge([
    {
		mode: 'production',
        entry: {
			'bundle': `${PATHS.source}/js/bundle.js`,
			'uncapped': `${PATHS.source}/js/uncapped.js`
		},
        output: {
			path: PATHS.build,
			filename: './assets/js/[name].js',			
			libraryTarget: 'umd',
			library: '[name]',
			umdNamedDefine: true,
			libraryExport: 'default'
		},
		optimization: {
			minimizer: [new TerserPlugin({
				exclude: /\/uncapped/,
				terserOptions: {
					output: {
						comments: false,
					},
				},
			})],
			// minimize: false,
			// splitChunks: {
			// 	cacheGroups: {
			// 		commons: {
			// 			minChunks: 2,
			// 			name: 'common',
			// 			chunks: 'all',
            // 			enforce: true
			// 		}
			// 	}
			// }
		},
		externals: {
			jquery: '$'
		},
        plugins: [
			new HtmlWebpackPlugin({
				favicon: `${PATHS.source}/favicon.png`,
				filename: 'index.html',
				chunks: ['bundle', 'uncapped'],
				template: `${PATHS.source}/pages/index.pug`,
			}),

			// new webpack.ProvidePlugin({
			// 	$: 'jquery',	 
			// 	jQuery: 'jquery',
			// 	React: 'react',
			// 	ReactDOM: 'react-dom',
			// 	styled: 'styled-components',
			// 	cn: 'classnames'
			// }),
		],
	},	
    pug(),
	images(),
	fonts(),
	babel()
]);


module.exports = (env, argv) => {
	if (argv.mode === 'production') {		
		return merge([
			_common,
			extractCSS()
		]);
	} 
	if (argv.mode === 'development') {
        return merge([
            _common,
            devserver(),
			css()
        ]);
    }
};

