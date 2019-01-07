module.exports = {
    main: 'badge.component.js',
    webpack: {
        loaders: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
