var path = require('path');

module.exports = function(paths) {
    return {
        module: {
            rules: [
                {	
					enforce: 'pre',
					
                    test: /third-party\.scss$/,			
					loader: 'mixin-loader',
                },
				
				{
                    test: /\.scss$/,
                    include: paths,					
					loader: "style-loader!raw-loader!sass-loader?includePaths[]=" + path.resolve(__dirname, "../node_modules/compass-mixins/lib")
                },
            ]
        }
    };
};
