const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV, entry: __dirname + '/dist/index.ts', output: {
        path: __dirname + '/www/', filename: 'index.js'
    }, module: {
        rules: [{
            test: /.ts$/, exclude: /node_modules/, use: 'ts-loader'
        }, {
            test: /.s[ac]ss$/i, use: ["style-loader", "css-loader", "sass-loader"]
        }]

    }, plugins: [new HtmlWebpackPlugin({template: __dirname + '/www/index.html'})], devServer: {
        open: true, port: 4000, watchFiles: ['./src/**/*']
    }
};
