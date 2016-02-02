import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from './src/server/config';

export const babelLoader = (preset) => {
  return {
    test: /\.js$/,
    loader: 'babel',
    exclude: /node_modules/,
    query: {
      cacheDirectory: true,
      presets: [ preset, "react", "stage-0" ]
    }
  };
};

const baseConfig = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader?importLoaders=1&modules&localIdentName=[name]__[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.(png|jpe?g|eot|ttf|woff|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        query: {
          name: '[hash].[ext]'
        }
      }
    ]
  },
  postcss: () => [
    require('postcss-discard-duplicates'),
    require('postcss-cssnext')
  ],
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};

if (config.env === 'production') {
  baseConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    ...baseConfig.plugins
  ];
} else {
  baseConfig.devtool = '#eval-source-map';
}

const webpackConfig = [
  { // Server build configuration
    ...baseConfig,
    name: 'server',
    entry: ['./src/server/index.js'],
    output: {
      path: 'build/server',
      publicPath: '/',
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      ...baseConfig.module,
      loaders: [
        ...baseConfig.module.loaders,
        babelLoader('node5')
      ]
    },
    plugins: [
      ...baseConfig.plugins,
      new webpack.BannerPlugin(
        `require("dotenv").load({ silent: true });
         require("source-map-support/register");`,
        {
          raw: true,
          entryOnly: false
        }
      )
    ],
    target: "node"
  },
  { // Client build configuration
    ...baseConfig,
    name: 'client',
    entry: ['./src/client/index.js'],
    output: {
      path: 'build/client',
      publicPath: '/',
      filename: 'index.js'
    },
    module: {
      loaders: [
        ...baseConfig.module.loaders,
        babelLoader('es2015-webpack')
      ]
    },
    target: "web"
  }
];

export default webpackConfig;
