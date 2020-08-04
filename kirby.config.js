module.exports = {
  serve: true,
  host: '127.0.0.1',
  port: 8000,

  inject: false,
  base: __dirname + '/kirby',
  assetsDir: 'vue-assets',
  indexPath: 'site/plugins/kirby-vue-starterkit/vue-index.php',

  start: async php => {
    const server = await php({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.base,
      router: module.exports.base + '/kirby/router.php'
    })

    console.log('\x1b[36m%s\x1b[0m', 'i', `Kirby running at: ${server.url}`)

    return server
  },

  clean: fs => {
    fs.removeSync(module.exports.base + '/' + module.exports.assetsDir)
    fs.removeSync(module.exports.base + '/' + module.exports.indexPath)
  }
}
