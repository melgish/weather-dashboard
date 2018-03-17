import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import autoprefixer from 'autoprefixer';
import InterpolateLoaderOptionsPlugin from 'interpolate-loader-options-webpack-plugin';

export default {
  devtool: 'inline-source-map',
  entry: {
    vendor: './client/vendor',
    main: ['webpack-hot-middleware/client?reload=true', './client/index'],
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
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { plugins: [autoprefixer] } },
          'sass-loader'
        ],
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
    path: path.resolve('/'),
    publicPath: '',
    filename: '[name].js',
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
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: '!!pug-loader!client/index.pug',
      title: 'Weather Dashboard',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FaviconsWebpackPlugin({
      logo: './client/favicon.svg',
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
