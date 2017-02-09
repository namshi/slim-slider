var webpack = require('webpack');

module.exports = {
    entry: ['./index.js'],
    output: {
        path: './dist',
        filename: 'build.js',
        library: 'slim-slider',
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
