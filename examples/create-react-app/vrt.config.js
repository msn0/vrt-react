module.exports = {
    webpack: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            }
        ]
    }
};
