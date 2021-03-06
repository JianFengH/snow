var path = require('path');
var webpack = require('webpack');

var srcPath = path.resolve(__dirname, '../src');
var theme = require('./theme');

module.exports = {
    devtool: 'hidden-source-map',
    mode: 'production',

    entry: {
        entry: './src/entry.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name].bundle.[hash].js'
    },
    module: {
        rules: [{
            test: /src\/.+\.css$/,
            exclude: /node_modules/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]__[hash:base64]',
                    importLoaders: 1
                }
            }]
        }, {
            test: /node_modules\/.+\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', {
                loader: 'less-loader',
                options: {
                    modifyVars: theme,
                    javascriptEnabled: true,
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'eslint-loader']
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            use: ['file-loader']
        }, {
            test: /\.svg$/,
            use: 'svg-inline-loader'
        }]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
        new webpack.ProgressPlugin(function(percentage, msg) {
            var v = Math.round(percentage * 100);
            console.log('进度: ' + v + '%; ' + msg);
        })
    ],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            boxes: `${srcPath}/boxes`,
            buss: `${srcPath}/buss`,
            styles: `${srcPath}/styles`,
            utils: `${srcPath}/utils`,
            common: `${srcPath}/common`,
            actions: `${srcPath}/actions`,
            reducers: `${srcPath}/reducers`
        }
    }
};
