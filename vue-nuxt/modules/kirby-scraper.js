import fs from 'fs-extra'
import KirbyApi from '../plugins/kirby-api'
import modifyPageHtml from '../plugins/modify-page-html-server'

const api = KirbyApi.init(process.env.NUXT_ENV_KIRBY_URL)
const imgDir = `static/${process.env.NUXT_ENV_IMG_DIR}`

export default function() {
  this.nuxt.hook('generate:before', async () => {
    await fs.emptyDir(imgDir)

    await Promise.all(this.options.generate.routes.map(downloadImages))

    console.log('\x1b[32m%s\x1b[0m', '√', 'Images scraped from Kirby')
  })

  this.nuxt.hook('generate:done', async () => {
    await fs.remove(imgDir)
  })
}

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
