const path = require('path');
const siteConfig = require('./config.json');
const outputDir = path.resolve(__dirname, './dist');
const vueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const optimizeCssAssets = require('optimize-css-assets-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        publicPath: '',
        path: outputDir,
        filename: '[name].bundle.js',
    },
    resolve: {
        unsafeCache: true,
        modules: [path.resolve(__dirname), 'node_modules'],
        extensions: ['.js', '.vue', 'json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'],
        alias: {
            'vue$': 'vue/dist/vue',
            '@': path.resolve(__dirname, './src'),
            'data': path.resolve(__dirname, './src/data'),
            'store': path.resolve(__dirname, './src/store'),
            'assets': path.resolve(__dirname, './src/assets'),
            'components': path.resolve(__dirname, './src/components'),
            'helpers': path.resolve(__dirname, './src/components/_helpers')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        failOnError: true
                    }
                }
            },
            {
                test: /\.(vue)$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(c|sa|sc)ss$/,
                use: [
                    // process.env.NODE_ENV !== 'production' ? 'vue-style-loader' : miniCssExtractPlugin.loader,
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                exclude: path.resolve(__dirname, './src/assets/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[folder]/[name].[ext]',
                        publicPath: 'public/images/',
                        outputPath: 'public/images/'
                    }
                }
            },
            {
                test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
                exclude: path.resolve(__dirname, './src/assets/images'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'public/fonts/',
                        outputPath: 'public/fonts/'
                    }
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
                    name: 'vue',
                    chunks: 'all'
                },
                corejs: {
                    test: /[\\/]node_modules[\\/](core-js)[\\/]/,
                    name: 'corejs',
                    chunks: 'all',
                    priority: 2
                }
            }
        }
    },
    plugins: [
        new vueLoaderPlugin(),
        new cleanWebpackPlugin([outputDir]),
        new extractTextWebpackPlugin('css/style.css'),
        new optimizeCssAssets(),
        new htmlWebpackPlugin({
            template: './index.ejs',
            inject: 'body',
            meta: siteConfig
        })
    ]
};

module.exports = config;