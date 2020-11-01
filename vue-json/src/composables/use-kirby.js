import { useLanguage } from '../composables/use-language'
import { HtmlUtils } from '../utils/html.utils'
import { PathUtils } from '../utils/path.utils'

export const useKirby = () => {
  const kirbyUrl =
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_KIRBY_URL : window.location.origin + process.env.VUE_APP_BASE_URL.slice(0, -1)

  const getJson = async uri => {
    const { prefix } = useLanguage()
    const resp = await fetch(`${kirbyUrl}/${prefix}/${uri}.json`)

    return await resp.json()
  }

  const getLanguages = async () => await getJson('languages')

  const getSite = async () => await getJson('site')

  const getPage = async path => {
    const page = await getJson(PathUtils.toPageUri(path))

    // fix relative links
    HtmlUtils.modifyPageHtml(page, html => {
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.href.replace(process.env.VUE_APP_KIRBY_URL, process.env.VUE_APP_BASE_URL.slice(0, -1))
      }
    })

    return page
  }

  return {
    getLanguages,
    getSite,
    getPage
  }
}
