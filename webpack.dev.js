const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const copyWebpackPlugin = require('copy-webpack-plugin');
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
    watch: true,
    mode: 'production',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, './dist')
    },
    plugins: [
        new copyWebpackPlugin([
            {
                from: './src/assets/favicon',
                toType: 'dir'
            }
        ]),
        new bundleAnalyzerPlugin({
            analyzerPort: 8001
        })
    ]
});