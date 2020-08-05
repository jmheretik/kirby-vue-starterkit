import fs from 'fs-extra'
import modifyPageHtml from '../plugins/modify-page-html-server'

export default function({ api, site }) {
  const imgDir = `static/${process.env.NUXT_ENV_IMG_DIR}`

  this.nuxt.hook('generate:before', async () => {
    await fs.emptyDir(imgDir)

    const routes = site.children.flatMap(page => [page.id, ...page.children.map(child => child.id)])

    await Promise.all(routes.map(downloadImages))

    console.log('\x1b[32m%s\x1b[0m', '√', 'Images scraped from Kirby')
  })

  this.nuxt.hook('generate:done', async () => {
    await fs.remove(imgDir)
  })

  const downloadImages = async route => {
    const page = await api.getPage(route)
    const files = []

    modifyPageHtml(page, html => {
      for (const img of html.getElementsByTagName('img')) {
        files.push(outputFile(`${imgDir}/${img.dataset.id}`, img.src))
      }
    })

    return Promise.all(files)
  }

  const outputFile = async (path, url) => {
    if (await fs.pathExists(path)) return

    const [file] = await Promise.all([api.getFile(url), fs.ensureFile(path)])

    return new Promise(resolve => file.pipe(fs.createWriteStream(path)).on('finish', resolve))
  }
}
