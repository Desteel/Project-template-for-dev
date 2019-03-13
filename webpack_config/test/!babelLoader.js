module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                //use: 'babel-loader',
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
				//use end
            }
        ]
		//rules end
    }
};