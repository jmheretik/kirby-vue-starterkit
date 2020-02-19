const config = require('./kirby.config.js')

module.exports = {
  outputDir: config.baseDir,
  assetsDir: config.assetsDir,
  indexPath: config.indexPath,
  publicPath: process.env.NODE_ENV === 'production' ? config.publicPath : '/',
  productionSourceMap: false,
  devServer: {
    proxy: `http://${config.host}:${config.port}`
  }
}
