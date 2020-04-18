const php = require('node-php-server')
const fs = require('fs-extra')
const kirby = require('../kirby.config')

if (process.env.NODE_ENV === 'development' && kirby.serve) kirby.start(php)
if (process.env.NODE_ENV === 'production' && kirby.inject) kirby.clean(fs)

fs.removeSync('dist')

module.exports = {
  outputDir: kirby.inject ? kirby.base : 'dist',
  assetsDir: kirby.inject ? kirby.assetsDir : '',
  indexPath: kirby.inject ? kirby.indexPath : 'index.html',
  publicPath: process.env.PUBLIC_PATH,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/*.json': {
        target: process.env.VUE_APP_KIRBY_URL,
        pathRewrite: { [process.env.PUBLIC_PATH]: '/' }
      }
    }
  }
}
