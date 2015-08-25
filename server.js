import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {Schema} from './data/schema';

const APP_PORT = 3000;
const WEBPACK_PORT = 8080;

var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Expose a GraphQL endpoint
var app = express();
app.set('view engine', 'jade');

// GraphQL routes
app.get('/graphiql', (req,res) => res.render('graphiql.jade'));

app.use('/graphql', graphQLHTTP((request) => ({
  schema: Schema,
  pretty: true,
  rootValue: request
})));

// App routes
app.get(['/blog', '/blog/*'], (req,res) => res.render('index.jade'));

app.listen(APP_PORT, () => console.log(
  `Server is now running on http://localhost:${APP_PORT}`
));

// Serve the Relay app
var compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {stage: 0, plugins: ['./build/babelRelayPlugin']}
      },
      { test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!cssnext-loader')
      }
    ]
  },
  output: {filename: 'app.js', path: '/'},
  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'js/components']
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
});
var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: {colors: true}
});
// Serve static resources
app.use(express.static('public'));

app.use('/node_modules/react', express.static('node_modules/react'));
app.use('/node_modules/react-relay', express.static('node_modules/react-relay'));
app.use('/node_modules/graphiql', express.static('node_modules/graphiql'));

app.listen(WEBPACK_PORT, () => {
  console.log(`Webpack is now running on http://localhost:${WEBPACK_PORT}`);
});
