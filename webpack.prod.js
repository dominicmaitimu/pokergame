const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const copyWebpackPlugin = require('copy-webpack-plugin');
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new uglifyJSPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        new copyWebpackPlugin([
            {
                from: './src/assets/favicon',
                toType: 'dir'
            }
        ])
    ]
});