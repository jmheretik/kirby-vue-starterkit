import fs from 'fs-extra'
import kirby from '../../kirby.config'

export default function() {
  this.nuxt.hook('generate:before', () => {
    kirby.clean(fs)
  })

  // copy static data, built assets and index.html to kirby folder for deployment
  this.nuxt.hook('generate:done', async () => {
    await Promise.all([
      fs.copy('static', `${kirby.base}`),
      fs.copy(`dist/${kirby.assetsDir}`, `${kirby.base}/${kirby.assetsDir}`),
      fs.copy('dist/index.html', `${kirby.base}/${kirby.indexPath}`)
    ])

    await fs.remove('dist')

    console.log('√ Built files injected to Kirby')
  })
}
