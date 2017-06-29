import path from 'path';

export default {
  devtool: 'inline-source-map',
  entry: {
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
                ['istanbul', { exclude: ['**/*.spec.js'] }],
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    path: path.resolve('/'),
    publicPath: '/',
    filename: '[name].js',
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    // }),
  ],
};
