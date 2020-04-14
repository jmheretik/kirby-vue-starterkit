const config = require('./kirby.config')

process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? config.api : config.devApi

module.exports = {
  outputDir: config.baseDir,
  assetsDir: config.assetsDir,
  indexPath: config.indexPath,
  publicPath: config.publicPath,
  productionSourceMap: false,
  pluginOptions: {
    proxy: {
      context: (path, req) => req.url.endsWith('?content=json'),
      options: { target: `http://${config.host}:${config.port}` }
    }
  }
}
