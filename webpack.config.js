var webpack = require('webpack');
var path = require('path');

var dist = path.resolve(__dirname);
var source_dir = path.resolve(__dirname);

var config = {
    entry: source_dir + '/index.js',
    output: {
        path: dist + '/build',
        filename: 'bundle.js',
        publicPath: '/build/',
        library: 'Framework'
    },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: source_dir,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2', 'babel-polyfill']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
}

module.exports = config;
