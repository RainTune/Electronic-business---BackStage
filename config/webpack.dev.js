const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: 5000,
        hot: true,
        overlay: {
            errors: true
        },
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