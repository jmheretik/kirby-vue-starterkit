const fs = require('./vue/node_modules/fs-extra')

module.exports = {
  serve: true,
  host: '127.0.0.1',
  port: 8000,

  inject: false,
  baseKirby: __dirname + '/kirby',
  baseVue: __dirname + '/vue/dist',
  assetsDir: 'vue-assets',
  indexPath: 'site/plugins/kirby-vue-starterkit/vue-index.php',

  start: async php => {
    const server = await php({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.baseKirby,
      router: module.exports.baseKirby + '/kirby/router.php'
    })

    console.log('\x1b[36m%s\x1b[0m', 'i', `Kirby running at: ${server.url}`)

    return server
  },

  clean: () => {
    fs.removeSync(module.exports.baseKirby + '/favicon.ico')
    fs.removeSync(module.exports.baseKirby + '/' + module.exports.assetsDir)
    fs.removeSync(module.exports.baseKirby + '/' + module.exports.indexPath)
  },

  tryInject: () => {
    if (!module.exports.inject) return

    fs.copySync(module.exports.baseVue + '/favicon.ico', module.exports.baseKirby + '/favicon.ico')
    fs.copySync(module.exports.baseVue + '/' + module.exports.assetsDir, module.exports.baseKirby + '/' + module.exports.assetsDir)
    fs.copySync(module.exports.baseVue + '/index.html', module.exports.baseKirby + '/' + module.exports.indexPath)
  }
}
