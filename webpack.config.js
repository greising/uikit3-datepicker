var fs = require('fs');
var glob = require('glob');
var path = require('path');
var webpack = require('webpack');
var util = require('./build/util');
var version = require('./package.json').version;

var loaders = {
    loaders: [
        {loader: 'buble-loader', test: /(src|tests)(\/|\\).*\.js$/},
        {loader: 'html-loader', test: /\.svg$/, options: {minimize: false}}
    ]
};

module.exports = [

    {
        entry: './tests/js/uikit-datepicker',
        output: {
            filename: 'dist/js/uikit-datepicker.js',
            library: 'UIkit',
            libraryTarget: 'umd'
        },
        module: loaders,
        externals: {jquery: 'jQuery'},
        plugins: [
            new webpack.DefinePlugin({
                BUNDLED: true,
                VERSION: `'${version}'`
            })
        ]
    },

    {
        entry: './tests/js/uikit-datepicker',
        output: {
            filename: 'dist/js/uikit-datepicker.min.js',
            library: 'UIkit',
            libraryTarget: 'umd'
        },
        module: loaders,
        externals: {jquery: 'jQuery'},
        plugins: [
            new webpack.optimize.UglifyJsPlugin,
            new webpack.DefinePlugin({
                BUNDLED: true,
                VERSION: `'${version}'`
            })
        ]
    },

    {
        entry: {
            index: './tests/js/index'
        },
        output: {
            filename: 'tests/js/test.js'
        },
        module: loaders,
        externals: {jquery: 'jQuery', uikit: 'UIkit'}
    }

];
