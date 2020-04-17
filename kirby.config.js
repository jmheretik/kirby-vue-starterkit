module.exports = {
  serve: true,
  host: '127.0.0.1',
  port: 8000,

  inject: false,
  base: __dirname + '/kirby',
  assetsDir: 'vue-assets',
  indexPath: 'site/plugins/kirby-vue-starterkit/vue-index.php',

  start: php => {
    php.createServer({
      hostname: module.exports.host,
      port: module.exports.port,
      base: module.exports.base,
      router: 'kirby/router.php'
    })

    console.log(`i Kirby running at: http://${module.exports.host}:${module.exports.port}`)
  },

  stop: php => php.close()
}
