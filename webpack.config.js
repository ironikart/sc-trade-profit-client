"use strict";
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

let StringReplacePlugin = require('string-replace-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('main.css');
let extractHTML = new ExtractTextPlugin('index.html');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/src',
    entry:   {
        javascript: './app/index.jsx',
        html:       './html/index.html',
        css:        './styles/main.scss'
    },
    devServer: {
        contentBase: './build'
    },
    plugins: [
        extractCSS,
        extractHTML,
        new webpack.DefinePlugin({
            'process.env': Object.keys(process.env).reduce(function(o, k) {
                o[k] = JSON.stringify(process.env[k]);
                return o;
            }, {})
        }),
        new StringReplacePlugin()
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
                exclude: /node_modules\/(?!node-dijkstra)/,
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
            },
            {
                test:   /\.html$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern:     /{version}/ig,
                            replacement: function () {
                                return pkg.version;
                            }
                        }
                    ]})
            }
        ]
    }
};
