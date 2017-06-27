import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  context: path.resolve('.'),
  devtool: 'source-map',
  entry: {
    vendor: './client/vendor',
    main: './client/index',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ng-annotate-loader',
            options: {
              single_quotes: true,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                ['env', {
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7'],
                  },
                }],
              ],
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        exclude: /(node_modules)/,
        use: ['html-loader', 'pug-html-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    // Generate external css file with hash
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Hash files using Md5 so names change when content changes.
    new WebpackMd5Hash(),
    // Use CommonsChunkPlugin to create a separate bundle of vendor
    // libraries so that they are cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: '!!pug-loader!client/index.pug',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};
