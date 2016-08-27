const path = require('path');
const scss = require('dibs-webpack-scss');
module.exports = scss({
    entry: './src/index',
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    externals: [
        'react'
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    devtool: 'source-map'
}, {extractTextName: 'index.css'});