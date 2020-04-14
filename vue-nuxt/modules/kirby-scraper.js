import fs from 'fs-extra'
import { JSDOM } from 'jsdom'
import config from '../kirby.config'
import KirbyApi from '../plugins/kirby-api'
import modifyPageHtml from '../plugins/modify-page-html'

const apiUrl = config.getApiUrl()
const api = KirbyApi.init(apiUrl)

const dom = new JSDOM('<!doctype html><html><body></body></html>')
const document = dom.window.document

const tmpDir = 'tmp'
const dataDir = 'static/' + config.staticDataDir
const clientDataDir = config.publicPath + config.staticDataDir

export default function() {
  if (process.env.NODE_ENV !== 'generate') return

  // create data required for static site generation
  this.nuxt.hook('generate:before', async () => {
    const routes = await this.options.generate.routes()

    await Promise.all([fs.emptyDir(tmpDir), fs.emptyDir(dataDir)])

    await Promise.all(routes.map(route => generateData(route)))

    console.log('√ Static data generated')
  })

  // remove the data when the generation is done
  this.nuxt.hook('generate:done', async () => {
    await Promise.all([fs.remove(tmpDir), fs.remove(dataDir)])
  })
}

const generateData = async route => {
  const files = []
  const page = await api.getPage(route)

  modifyPageHtml(page, document, html => {
    // fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(apiUrl, config.publicPath.slice(0, -1))
    }

    // download images and point img tags to the downloaded copies
    for (const img of html.getElementsByTagName('img')) {
      files.push(outputFile(`${dataDir}/${img.dataset.id}`, img.src))
      img.src = `${clientDataDir}/${img.dataset.id}`
    }
  })

  // save the modified page json for api to read during static site generation
  // TODO remove once full static generation is supported (https://github.com/nuxt/rfcs/issues/22)
  files.push(fs.outputJson(`${tmpDir}/${route}.json`, page))

  return Promise.all(files)
}

const outputFile = async (path, url) => {
  if (await fs.pathExists(path)) return

  const [file] = await Promise.all([api.getFile(url), fs.ensureFile(path)])

  return new Promise(resolve => file.pipe(fs.createWriteStream(path)).on('finish', resolve))
}
