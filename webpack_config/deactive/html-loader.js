/* main */
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.(jpg|png|svg|gif|ico|mp4)$/,
                    use: ["file-loader"]
                }
            ]
        }
    };
};
