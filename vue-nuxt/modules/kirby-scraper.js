import fs from 'fs-extra'
import KirbyApi from '../plugins/kirby-api'
import modifyPageHtml from '../plugins/modify-page-html-server'

const api = KirbyApi.init(process.env.NUXT_ENV_KIRBY_URL)
const imgDir = `static/${process.env.NUXT_ENV_IMG_DIR}`

export default function() {
  this.nuxt.hook('generate:before', async () => {
    await fs.emptyDir(imgDir)

    await Promise.all((await this.options.generate.routes()).map(downloadImages))

    console.log('√ Images downloaded')
  })

  this.nuxt.hook('generate:done', async () => {
    await fs.remove(imgDir)
  })
}

const downloadImages = async route => {
  const page = await api.getPage(route)
  const files = []

  modifyPageHtml(page, html => {
    files.push([...html.getElementsByTagName('img')].map(img => outputFile(`${imgDir}/${img.dataset.id}`, img.src)))
  })

  return Promise.all(files)
}

const outputFile = async (path, url) => {
  if (await fs.pathExists(path)) return

  const [file] = await Promise.all([api.getFile(url), fs.ensureFile(path)])

  return new Promise(resolve => file.pipe(fs.createWriteStream(path)).on('finish', resolve))
}
