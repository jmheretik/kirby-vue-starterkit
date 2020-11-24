import { useLanguage } from '../composables/use-language'
import { HtmlUtils } from '../utils/html.utils'
import { PathUtils } from '../utils/path.utils'

export const useKirby = () => {
  const kirbyUrl = PathUtils.strip(
    import.meta.env.MODE === 'development' ? window.location.origin + import.meta.env.VITE_BASE_URL : import.meta.env.VITE_KIRBY_URL
  )

  const getJson = async uri => {
    const { prefix } = useLanguage()

    const baseUrl = PathUtils.strip(`${kirbyUrl}/${prefix}`)
    const resp = await fetch(`${baseUrl}/${uri}.json`)

    return await resp.json()
  }

  const getLanguages = async () => await getJson('languages')

  const getSite = async () => await getJson('site')

  const getPage = async path => {
    const page = await getJson(PathUtils.toPageUri(path))

    // fix relative links
    HtmlUtils.modifyPageHtml(page, html => {
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.getAttribute('href').replace(PathUtils.strip(import.meta.env.VITE_KIRBY_URL), '/' + PathUtils.strip(import.meta.env.VITE_BASE_URL))
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
