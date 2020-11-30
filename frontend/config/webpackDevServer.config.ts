import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware'
import paths from './paths'
import WebpackDevServer from 'webpack-dev-server'
import { statsOptions } from './webpack.config'

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
const host = process.env.HOST || '0.0.0.0'

const webpackConfig = (
  proxy: WebpackDevServer.ProxyConfigArray,
  allowedHost?: string
): WebpackDevServer.Configuration => {
  return {
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    port: 8080,
    publicPath: paths.servedPath,
    quiet: false,
    watchOptions: {
      ignored: /node_modules/,
    },
    stats: statsOptions,
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    setup(app: any) {
      app.use(errorOverlayMiddleware())
      app.use(noopServiceWorkerMiddleware(paths.servedPath))
    },
  }
}

export default webpackConfig
