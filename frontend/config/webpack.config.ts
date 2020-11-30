import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import paths from './paths'

const isProd = process.env.NODE_ENV === 'production'

export const statsOptions =
  isProd || process.env.VERBOSE
    ? {
        env: true,
        chunkModules: false,
        modules: false,
        children: false,
        assetsSort: '!size',
        excludeAssets: /\.(svg|gif|ico|ttf|png|jpg|woff|woff2|cur|eot)(\?.*)?$/,

        // NOTE: MiniCssExtractPlugin will warn about inconsistent use of CSS import
        // ordering. There are very valid reasons to warn about this, as it is
        // highly fragile, but it is almost impossible (or desirable) to make sure
        // this order is consistent. We could instead consider some guidelines when
        // using multiple classes. In any case, we ignore thos warnings.
        warningsFilter: (warning: any) => {
          return /Conflicting order/.test(warning)
        },
      }
    : 'minimal'

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
  stats: statsOptions,
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
              postcssOptions: {
                sourceMap: !isProd,
                plugins: () => [
                  autoprefixer({
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        include: paths.appSrc,
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
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new HtmlWebpackPlugin({
      template: `${paths.appPublic}/index.html`,
    }),
  ],
}

export default configuration
