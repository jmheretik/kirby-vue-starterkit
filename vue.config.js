const backend = require('./backend.js')

module.exports = {
  publicPath: '/',
  devServer: {
    proxy: `http://${backend.hostname}:${backend.port}`
  }
}
