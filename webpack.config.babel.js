import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from './src/server/config';

const webpackConfig = {
  entry: path.join(__dirname, 'src/client/index.js'),
  output: {
    path: path.join(__dirname, 'build', 'client'),
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?importLoaders=1!postcss-loader')
      },
      {
        test: /\.(png|jpe?g|eot|ttf|woff|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[hash].[ext]'
      }
    ]
  },
  postcss: () => [
    require('postcss-modules-values'),
    require('postcss-modules-local-by-default'),
    require('postcss-modules-extract-imports'),
    require('postcss-modules-scope')({ generateScopedName: config.generateScopedName }),
    require('postcss-cssnext')
  ],
  plugins: [
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.DedupePlugin()
  ],
  devtool: 'source-map'
};

if (config.env === 'production') {
  webpackConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    ...webpackConfig.plugins
  ];
}

export default webpackConfig;
