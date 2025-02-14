const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OverwolfPlugin = require('./overwolf.webpack');
const webpack = require('webpack');

module.exports = env => ({
    entry: {
        background: './src/background/background.ts',
        desktop: './src/desktop/desktop.ts',
        in_game: './src/in_game/in_game.ts'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"),
            "fs": false, // fs is not typically needed in the browser
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "assert": require.resolve("assert"),
            "url": require.resolve("url"),
            "util": require.resolve("util"),
            "buffer": require.resolve("buffer"),
            "process": require.resolve("process/browser"),
            "vm": require.resolve("vm-browserify"),
            "net": false, // net is not typically needed in the browser
            "tls": false, // tls is not typically needed in the browser
            "child_process": false, // child_process is not typically needed in the browser
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'js/[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{ from: "public", to: "./" }],
        }),
        new HtmlWebpackPlugin({
            template: './src/background/background.html',
            filename: path.resolve(__dirname, './dist/background.html'),
            chunks: ['background']
        }),
        new HtmlWebpackPlugin({
            template: './src/desktop/desktop.html',
            filename: path.resolve(__dirname, './dist/desktop.html'),
            chunks: ['desktop']
        }),
        new HtmlWebpackPlugin({
            template: './src/in_game/in_game.html',
            filename: path.resolve(__dirname, './dist/in_game.html'),
            chunks: ['in_game']
        }),
        new OverwolfPlugin(env),
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^node:/, // Ignore `node:` protocol imports
        }),
    ]
});