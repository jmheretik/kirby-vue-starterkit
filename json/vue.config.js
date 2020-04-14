const php = require('node-php-server')
const fs = require('fs-extra')
const config = require('../kirby.config')

process.env.VUE_APP_API_URL = process.env.NODE_ENV === 'production' ? config.api : ''

if (process.env.NODE_ENV === 'development') config.serveBackend(php)

module.exports = {
  outputDir: config.baseDir,
  assetsDir: config.assetsDir,
  indexPath: config.indexPath,
  publicPath: config.publicPath,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/*.json': {
        target: `http://${config.host}:${config.port}`,
        pathRewrite: { [config.publicPath]: '/' }
      }
    }
  }
}
