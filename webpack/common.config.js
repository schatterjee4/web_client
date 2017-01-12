/* eslint-disable */ ;

const webpack = require('webpack');
const path = require('path');
const IsomorphicPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new IsomorphicPlugin(require('./isomorphic.config')); // eslint-disable-line
const development = (process.env.NODE_ENV || 'development') === 'development';
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    app: ['webpack-dev-server/client?http://localhost:4001/', 'webpack/hot/dev-server',
      './src/client'
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    publicPath: development ? `http://localhost:${+process.env.PORT + 1}/assets/` : '',
    path: path.resolve(__dirname, '../dist/assets'),
    filename: development ? '[name].js' : '[name].[hash].js',
    chunkFilename: development ? '[id].js' : '[id].[hash].js',
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|libs)/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      { test: /\.css$/, loader: 'style!css' },
      // LESS
      { test: /\.scss$/i, loaders: ['style', 'css', 'postcss-loader', 'sass'] },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'svg-loader' },
      // {
      //   // test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      //   //   loader: 'url-loader?name=images/[name].[ext]&limit=10240',
      // },
    ],
  },
  postcss: [autoprefixer({
    browsers: [
      'Android 2.3',
      'Android >= 4',
      'Chrome >= 20',
      'Firefox >= 24',
      'Explorer >= 8',
      'iOS >= 6',
      'Opera >= 12',
      'Safari >= 6',
    ],
  })],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  devtool: 'source-map',
  keepalive: true,
  debug: true,
  cache: true,
};
