import fs from 'fs-extra'
import kirby from '../../kirby.config'

const builtSrc = 'dist/'
const builtDest = kirby.base + '/'
const assetsDir = kirby.assetsDir

export default function() {
  // copy static data, built assets and index.html to kirby folder for deployment
  this.nuxt.hook('generate:done', async () => {
    const copyStatic = fs.copy('static', builtDest)
    const copyIndex = fs.copy(builtSrc + 'index.html', builtDest + kirby.indexPath)
    const copyAssets = fs.emptyDir(builtDest + assetsDir).then(() => fs.copy(builtSrc + assetsDir, builtDest + assetsDir))

    await Promise.all([copyAssets, copyIndex, copyStatic])

    console.log('√ Built files injected to Kirby')
  })
}
