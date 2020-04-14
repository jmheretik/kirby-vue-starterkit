const php = require('node-php-server')
const fs = require('fs-extra')

module.exports = {
  api: 'http://127.0.0.1:8000',
  host: '127.0.0.1',
  port: 8000,
  baseDir: 'www',
  assetsDir: 'vue-assets',
  indexPath: 'site/snippets/vue-index.php',
  routerPath: 'kirby/router.php',
  publicPath: '/',

  serveBackend: () => {
    php.createServer({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.baseDir,
      router: module.exports.routerPath
    })

    console.log(`Backend running at: http://${module.exports.host}:${module.exports.port}`)
  },

  cleanAssets: () => {
    fs.emptyDirSync(module.exports.baseDir + '/' + module.exports.assetsDir)
  }
}
