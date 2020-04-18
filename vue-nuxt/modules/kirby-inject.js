import fs from 'fs-extra'
import kirby from '../../kirby.config'

const builtSrc = 'dist/'
const builtDest = kirby.base + '/'

export default function() {
  this.nuxt.hook('generate:before', () => {
    kirby.clean(fs)
  })

  // copy static data, built assets and index.html to kirby folder for deployment
  this.nuxt.hook('generate:done', async () => {
    const copyStatic = fs.copy('static', builtDest)
    const copyAssets = fs.copy(builtSrc + kirby.assetsDir, builtDest + kirby.assetsDir)
    const copyIndex = fs.copy(builtSrc + 'index.html', builtDest + kirby.indexPath)

    await Promise.all([copyAssets, copyIndex, copyStatic])

    await fs.remove(builtSrc)

    console.log('√ Built files injected to Kirby')
  })
}
