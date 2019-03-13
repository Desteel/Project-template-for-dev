module.exports = {
  module: {
    loaders: [
      {
		type: 'javascript/auto',
        test: /\.json$/,
		use: [
			{
			  loader: 'file-loader',
			  options: {
				  name: "assets/json/[name].[ext]"
			  }
			}
		]
      }
    ]
  }
}