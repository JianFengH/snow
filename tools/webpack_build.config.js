var path = require('path');
var webpack = require('webpack');

var environment = process.env.NODE_ENV || 'production';
var srcPath = path.resolve(__dirname, '../src');

module.exports = {
    devtool: 'sourcemap',
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
        new webpack.DefinePlugin({
            '__ENV__': JSON.stringify(environment),
            'process.env.NODE_ENV': JSON.stringify(environment)
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     sourceMap: false
        // }),
        //
        // new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.AggressiveMergingPlugin(),
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