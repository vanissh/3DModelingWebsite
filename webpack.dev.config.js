const path = require('path');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
    },
    mode: 'development',
    devServer: {
        open: true,
        hot: true,
        port: 9000,
        writeToDisk: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                    },
                },
                exclude: /node-modules/,
            }
        ]
    }

};