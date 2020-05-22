import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import paths from './paths'

const isProd = process.env.NODE_ENV === 'production'

const configuration: webpack.Configuration = {
  mode: isProd ? 'production' : 'development',
  entry: paths.appIndexTs,
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: isProd
      ? 'static/js/[name].[chunkhash:8].js'
      : 'static/js/[name].js',
    chunkFilename: isProd
      ? 'static/js/[name].[chunkhash:8].js'
      : 'static/js/[name].chunk.js',
    publicPath: paths.servedPath,
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            compact: isProd,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              reloadAll: !isProd,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !isProd,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProd,
              plugins: () => [
                autoprefixer({
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd
        ? 'static/css/[name].[contenthash:10].css'
        : 'static/css/[name].css',
      chunkFilename: isProd
        ? 'static/css/[name].[contenthash:10].css'
        : 'static/css/[name].css',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: `${paths.appPublic}/index.html`,
    }),
  ],
}

export default configuration
