const php = require('node-php-server')
const fs = require('fs-extra')
const kirby = require('../kirby.config')

const serveKirby = true
const injectKirby = true
const publicPath = '/'
const apiUrl = ''

process.env.VUE_APP_API_URL = apiUrl
process.env.VUE_APP_KIRBY_URL = process.env.NODE_ENV === 'production' ? apiUrl : serveKirby ? `http://${kirby.host}:${kirby.port}` : ''

if (process.env.NODE_ENV === 'development' && serveKirby) kirby.start(php)
if (process.env.NODE_ENV === 'production' && injectKirby) kirby.cleanAssets(fs)

module.exports = {
  outputDir: injectKirby ? kirby.base : 'dist',
  assetsDir: injectKirby ? kirby.assetsDir : '',
  indexPath: injectKirby ? kirby.indexPath : 'index.html',
  publicPath: publicPath,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/*.json': {
        target: `http://${kirby.host}:${kirby.port}`,
        pathRewrite: { [publicPath]: '/' }
      }
    }
  }
}
