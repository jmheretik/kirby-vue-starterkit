const backend = require('./backend.js')
const webpack = require('webpack')

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
  },
  configureWebpack: {
    plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)]
  }
}
