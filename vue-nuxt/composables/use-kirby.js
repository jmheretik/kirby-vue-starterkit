import axios from 'axios'
import { PathUtils } from '../utils/path.utils'
import { HtmlUtils } from '../utils/html.utils'
import { useLanguage } from './use-language'

export const useKirby = (language) => {
  const kirbyUrl = PathUtils.strip(
    process.client && process.env.NODE_ENV === 'development' ? window.location.origin + process.env.NUXT_ENV_BASE_URL : process.env.NUXT_ENV_KIRBY_URL
  )

  const getJson = async (uri) => {
    const { prefix } = useLanguage()

    const baseUrl = PathUtils.strip(`${kirbyUrl}/${prefix}`)
    const { data } = await axios.get(`${baseUrl}/${uri}.json`)

    return data
  }

  const getLanguages = async () => await getJson('languages')

  const getSite = async () => await getJson('site')

  const getPage = async (path) => {
    const page = await getJson(PathUtils.toPageUri(path))

    // fix relative links and img tags
    HtmlUtils.modifyPageHtml(page, (html) => {
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.getAttribute('href').replace(PathUtils.strip(process.env.NUXT_ENV_KIRBY_URL), '/' + PathUtils.strip(process.env.NUXT_ENV_BASE_URL))
      }

      if (process.env.isStatic) {
        for (const img of html.getElementsByTagName('img')) {
          img.src = `${process.env.NUXT_ENV_BASE_URL}${process.env.NUXT_ENV_IMG_DIR}/${img.dataset.id}`
        }
      }
    })

    return page
  }

  const getFile = async (url) => (await axios.get(url, { responseType: 'stream' })).data

  return {
    getLanguages,
    getSite,
    getPage,
    getFile,
  }
}
