const path = require('path');
const fs = require('fs');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('main.css');
let extractHTML = new ExtractTextPlugin('index.html');

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/src',
    entry:   {
        javascript: './app/index.jsx',
        html:       './html/index.html',
        css:        './styles/main.scss'
    },
    plugins: [
        extractCSS,
        extractHTML
    ],
    output: {
        path:       path.join(__dirname, 'build'),
        filename:   'bundle.js',
        publicPath: '',
    },
    module: {
        loaders: [
            {
                test:    /\.js(x)?$/,
                loader:  'babel',
                exclude: /node_modules/,
                query:   {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:   /\.json$/,
                loader: 'json'
            },
            {
                test:   /\.scss/,
                loader: extractCSS.extract(
                    'style',
                    'css!sass'
                )
            },
            {
                test:   /\.(png|gif|jpe?g|svg)$/,
                loader: 'file?name=images/[name].[ext]'
            },
            {
                test:   /\.html$/,
                loader: extractHTML.extract(
                    'html?attrs=img:src'
                )
            }
        ]
    }
};