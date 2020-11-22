import fs from 'fs-extra'
import { useKirby } from '../composables/use-kirby'
import { HtmlUtils } from '../utils/html.utils'

export default function () {
  const { getRoutes, getPage, getFile } = useKirby()

  const imgDir = `static/${process.env.NUXT_ENV_IMG_DIR}`

  this.nuxt.hook('generate:before', async () => {
    await fs.emptyDir(imgDir)

    const routes = await getRoutes()

    await Promise.all(routes.map(downloadImages))

    // eslint-disable-next-line no-console
    console.log('\x1B[32m%s\x1B[0m', '√', 'Images scraped from Kirby')
  })

  this.nuxt.hook('generate:done', async () => {
    await fs.remove(imgDir)
  })

  const downloadImages = async (route) => {
    const page = await getPage(route)
    const files = []

    HtmlUtils.modifyPageHtml(page, (html) => {
      for (const img of html.getElementsByTagName('img')) {
        files.push(outputFile(`${imgDir}/${img.dataset.id}`, img.src))
      }
    })

    return Promise.all(files)
  }

  const outputFile = async (path, url) => {
    if (await fs.pathExists(path)) return

    const [file] = await Promise.all([getFile(url), fs.ensureFile(path)])

    return new Promise((resolve) => file.pipe(fs.createWriteStream(path)).on('finish', resolve))
  }
}
