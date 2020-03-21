const php = require('node-php-server')
const path = require('path')
const rimraf = require('rimraf')

module.exports = {
  host: '127.0.0.1',
  port: 80,
  baseDir: 'www',
  assetsDir: 'assets',
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
    rimraf.sync(path.join(module.exports.baseDir, module.exports.assetsDir))
  }
}
