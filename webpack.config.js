var webpack = require('webpack');

module.exports = {
    entry: ['./index.js'],
    target: 'node',
    output: {
        path: './dist',
        filename: 'build.js',
        library: 'SlimSlider',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    cache: true,
    module: {
      rules: [
        {
          test: /\.js/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ]
    }
}
