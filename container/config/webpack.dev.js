const { merge } = require('webpack-merge');
const HtmlWebpakPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            }, 
            shared: packageJSON.dependencies
        }),
        new HtmlWebpakPlugin({
            template: './public/index.html'
        }),

    ]
}

module.exports = merge(commonConfig, devConfig);