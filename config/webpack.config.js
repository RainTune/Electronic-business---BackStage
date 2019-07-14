const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    entry: path.resolve(__dirname, '../src/index.jsx'),
    output: {
        filename: (isDev ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'),
        publicPath: '/dist/',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(sa|sc)ss$/,
                /*注意开发环境下，使用下面的代码不会让webpack-dev-server实时刷新*/
                /*use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']*/
                /*必须得像下面这么写*/
                /*use: ['style-loader','css-loader','postcss-loader','sass-loader']*/
                /*生产环境就需要这么写了*/
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',{
                    loader:"postcss-loader",
                        options: {
                            sourceMap: isDev
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'resource/image/[name].[ext]'
                        }
                    },
                    {
                        loader:'image-webpack-loader',
                        options: {
                            disable: isDev,
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/icon/[name].[ext]'
                        }
                    }
                ]

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            /*
                            html-loader 接受 attrs 参数，表示什么标签的什么属性需要调用 webpack 的 loader 进行打包。
                            比如 <img> 标签的 src 属性，webpack 会把 <img> 引用的图片打包，然后 src 的属性值替换为打包后的路径。
                            使用什么 loader 代码，同样是在 module.rules 定义中使用匹配的规则。

                            如果 html-loader 不指定 attrs 参数，默认值是 img:src, 意味着会默认打包 <img> 标签的图片。
                            这里我们加上 <link> 标签的 href 属性，用来打包入口 index.html 引入的 favicon.png 文件。
                            */
                            attrs: ['img:src', 'link:href']
                        }
                    }
                ]
            },
            {
                /*
                匹配 favicon.ico
                上面的 html-loader 会把入口 index.html 引用的 favicon.ico 图标文件解析出来进行打包
                打包规则就按照这里指定的 loader 执行
                */
                test: /favicon\.ico$/,
                use: [
                    {
                        // 使用 file-loader
                        loader: 'file-loader',
                        options: {
                            /*
                            name：指定文件输出名
                            [hash] 为源文件的hash值，[ext] 为后缀。
                            */
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunksSortMode: "none",
            inject: true
        })
    ],
    resolve: {
        alias: {
            rootSrc : path.resolve(__dirname, '../src')
        }
    }
};
