const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
                        publicPath: '../../',
                        fallback: 'style-loader',
                        //use: ['css-loader','postcss-loader','sass-loader'],
						use: [{
                            loader: 'css-loader',
                            options: { 
								importLoaders: 1,
								url: true,
							},
                        },
                        'postcss-loader','sass-loader'],
                    }),
                },
                {
                    test: /\.css$/,
                    include: paths,
                    use: ExtractTextPlugin.extract({
						publicPath: '../../',
                        fallback: 'style-loader',
                        //use: ['css-loader','postcss-loader'],
						use: [{
                            loader: 'css-loader',
                            options: { 
								importLoaders: 1,
								url: true
							},
                        },
                        'postcss-loader'],
                    }),
                },
            ],
        },
        plugins: [
            //new ExtractTextPlugin('css/[name].css'),
			new ExtractTextPlugin('assets/css/main.css'),
        ],
    };
};