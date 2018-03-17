import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import autoprefixer from 'autoprefixer';
import InterpolateLoaderOptionsPlugin from 'interpolate-loader-options-webpack-plugin';
export default {
  devtool: 'source-map',
  entry: {
    vendor: './client/vendor',
    main: './client/index',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: /client/,
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
        include: /client/,
        oneOf: [
          {
            resourceQuery: /svg/,
            use: [
              'raw-loader',
              {
                loader: 'svgo-loader',
                options: {
                  plugins: [
                    // must match InterpolateLoaderOptionsPlugin path
                    // plugins.0.cleanupIDs.prefix
                    { cleanupIDs: { prefix: 'p-[hash:base64]-' } },
                    { removeViewBox: false },
                  ],
                },
              },
              'pug-html-loader',
            ],
          },
          {
            use: ['html-loader', 'pug-html-loader']
          }
        ]
      },
      {
        test: /\.s?css$/,
        include: /client/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
            'sass-loader'
          ]
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?/,
        include: [/client/, /font-awesome/],
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new InterpolateLoaderOptionsPlugin({
      loaders: [
        { name: 'svgo-loader', include: ['plugins.0.cleanupIDs.prefix'] }
      ],
    }),
    // Use CommonsChunkPlugin to create a separate bundle of vendor
    // libraries so that they are cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    // Hash files using Md5 so names change when content changes.
    new WebpackMd5Hash(),
    // Generate external css file with hash
    new ExtractTextPlugin('[name].[contenthash].css'),
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: '!!pug-loader!client/index.pug',
      title: 'Weather Dashboard',
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
    // Minify CSS
    new OptimizeCSSPlugin({
      sourceMap: true,
    }),
    // site icon
    new FaviconsWebpackPlugin({
      logo: './client/favicon.svg',
      title: 'Weather Dashboard',
      emitStats: false,
      prefix: 'icons/',
      inject: true,
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ],
};
