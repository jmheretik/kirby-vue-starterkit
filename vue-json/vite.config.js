require('dotenv-flow').config()
const php = require('php-server')
const kirby = require('../kirby.config')
const htmlMinifier = require('html-minifier-terser')

if (process.env.NODE_ENV === 'development' && kirby.serve) kirby.start(php)
if (process.env.NODE_ENV === 'production' && kirby.inject) kirby.clean()

module.exports = {
  ...(kirby.inject ? { assetsDir: kirby.assetsDir } : {}),
  base: process.env.VITE_BASE_URL,
  proxy: {
    '/*.json': {
      target: process.env.VITE_KIRBY_URL,
      pathRewrite: { [process.env.VITE_BASE_URL]: '/' }
    }
  },
  indexHtmlTransforms: [
    ({ code }) =>
      htmlMinifier.minify(code, {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeScriptTypeAttributes: true
      })
  ]
}
