const path = require('path');
const scss = require('dibs-webpack-scss');
module.exports = scss({
    entry: './src/index.jsx',
    output: {
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js'
    },
    externals: [
        // Externalize any `require` not from our source
        (context, request, callback) => callback(null, /^[a-z0-9]/i.test(request) ? 'commonjs ' + request : false)
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: require.resolve('babel-loader'),
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    devtool: 'source-map'
}, {extractTextName: 'index.css'});