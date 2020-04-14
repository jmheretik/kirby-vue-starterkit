import fs from 'fs-extra'
import config from '../kirby.config'

const builtSrc = 'dist/'
const builtDest = config.kirbyBase + '/'
const assetsDir = config.kirbyAssetsDir

export default function() {
  if (process.env.NODE_ENV !== 'production' || !config.injectKirby) return

  // copy static data, built assets and index.html to kirby folder for deployment
  this.nuxt.hook('generate:done', async () => {
    const copyStatic = fs.copy('static', builtDest)
    const copyIndex = fs.copy(builtSrc + 'index.html', builtDest + config.kirbyIndexPath)
    const copyAssets = fs.emptyDir(builtDest + assetsDir).then(() => fs.copy(builtSrc + assetsDir, builtDest + assetsDir))

    await Promise.all([copyAssets, copyIndex, copyStatic])

    console.log('√ Built files injected to Kirby')
  })
}
