import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  devtool: 'inline-source-map',
  entry: {
    middleware: 'webpack-hot-middleware/client?reload=true',
    // vendor: './client/vendor',
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
              plugins: [
                ['istanbul', { exclude: ['**/*.{spec,test,mock}.js'] }],
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
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?/,
        use: ['file-loader?name=fonts/[name].[ext]'],
      },
    ],
  },
  output: {
    path: path.resolve('/'),
    publicPath: '',
    filename: '[name].js',
  },
  plugins: [
    // Create HTML file that includes reference to bundled JS
    new HtmlWebpackPlugin({
      template: '!!pug-loader!client/index.pug',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
