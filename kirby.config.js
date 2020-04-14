module.exports = {
  host: '127.0.0.1',
  port: 8000,

  base: __dirname + '/kirby',
  assetsDir: 'vue-assets',
  indexPath: 'site/snippets/vue-index.php',
  routerPath: 'kirby/router.php',

  start: php => {
    php.createServer({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.base,
      router: module.exports.routerPath
    })

    console.log(`i Kirby running at: http://${module.exports.host}:${module.exports.port}`)
  },

  stop: () => php.close(),

  cleanAssets: fs => fs.emptyDirSync(module.exports.base + '/' + module.exports.assetsDir)
}
