const php = require('node-php-server')
const host = '127.0.0.1'
const port = 80

module.exports = {
  host: host,
  port: port,
  serve: () => {
    php.createServer({
      hostname: host,
      port: port,
      base: './backend',
      router: './kirby/router.php'
    })

    console.log(`Backend running at: http://${host}:${port}`)
  }
}
