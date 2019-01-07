module.exports = {
    main: 'badge.component.1.js',
    webpack: {
        loaders: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
