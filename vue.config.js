const backend = require('./backend.js')

module.exports = {
  publicPath: process.env.VUE_APP_FRONTEND_PUBLIC_PATH || '/',
  outputDir: './frontend',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '^/api': {
        target: `http://${backend.host}:${backend.port}`
      }
    }
  }
}
