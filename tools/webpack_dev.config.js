var path = require('path');
var webpack = require('webpack');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

var environment = process.env.NODE_ENV || 'development';
var srcPath = path.resolve(__dirname, '../src');

module.exports = {
    devtool: 'eval',
    mode: 'development',

    entry: {
        entry: ['./src/entry.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].bundle.js'
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
        new DashboardPlugin(dashboard.setData),
        new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(zh-cn)$/),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__ENV__': JSON.stringify(environment),
            'process.env.NODE_ENV': JSON.stringify(environment)
        })
    ],
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
