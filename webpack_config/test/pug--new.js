/* main */
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
					use: [
					  // html loader gets webpack to process <img> src
					  'html-loader',
					  // requires pretty option otherwise some spacing between elements is lost
					  'pug-html-loader?{"pretty":true,"exports":false}'
					],
                }
            ]
        }
    };
};


/* worked
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }
            ]
        }
    };
};
*/

/* old
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
					use: [
						"html-loader",
						{
							loader: "pug-loader",
							options: {
								pretty: true
							}
						},
						//"extract-loader",
						
					]
                }
            ]
        }
    };
};
*/