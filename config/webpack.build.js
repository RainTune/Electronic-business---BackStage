const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    optimization: {
        minimize:true,
        minimizer: [new TerserPlugin({
            cache: true,
            parallel: true, //多线程打包，优化打包速度,
            sourceMap:false,
            terserOptions: {
                compress: {
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                },
                output: {
                    beautify: false,
                    comments: false
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    enforce: true,
                    name: 'vendor',
                    priority: 1
                }
            }
        },
        runtimeChunk: {
            name: entrypoint => `manifest.${entrypoint.name}`
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require("cssnano"),
            cssProcessorPluginOptions:{
                preset:['default',{discardComments:{removeAll:true}}]
            },
            canPrint:true
        }),
        //new BundleAnalyzerPlugin()
    ],
    devServer: {
        proxy : {
            '/manage' : {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            },
            '/user/logout.do': {
                target: 'http://admintest.happymmall.com',
                changeOrigin : true
            }
        }
    }
});