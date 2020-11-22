import { useLanguage } from '../composables/use-language'
import { HtmlUtils } from '../utils/html.utils'
import { PathUtils } from '../utils/path.utils'
import { useRoot } from './use-root'

export const useKirby = () => {
  const toPageSlug = path => PathUtils.toPageSlug(path ?? useRoot().$route.path)

  const unwrapContent = page => {
    page = { ...page, ...page.content }
    delete page.content

    return page
  }

  // HTTP Basic auth headers
  const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
  const headers = { Authorization: 'Basic ' + auth }

  const kirbyUrl =
    PathUtils.strip(process.env.NODE_ENV === 'development' ? window.location.origin + process.env.VUE_APP_BASE_URL : process.env.VUE_APP_KIRBY_URL) +
    process.env.VUE_APP_API_SLUG

  const get = async request => {
    const { prefix } = useLanguage()
    headers['X-Language'] = prefix

    const resp = await fetch(`${kirbyUrl}/${request}`, { headers: headers })
    const json = await resp.json()

    return json.data
  }

  const getLanguages = async () => {
    const languages = await get('languages?select=code,name,default,url')

    languages?.forEach(language => (language.url = PathUtils.strip(language.url.replace(process.env.VUE_APP_KIRBY_URL, ''))))

    return languages ?? []
  }

  const getSite = async () => {
    const { title } = await get('site?select=title')
    const children = await get('site/children?select=slug,title,template,status,hasChildren')
    const { social } = await getPage('about')

    for await (let page of children) {
      page.childTemplate = page.hasChildren ? (await get(`pages/${toPageSlug(page.slug)}/children?limit=1&select=template`))[0].template : null
    }

    return { title, children, social }
  }

  const getPage = async path => unwrapContent(await get(`pages/${toPageSlug(path)}?select=slug,content`))

  const getChildren = async path => (await get(`pages/${toPageSlug(path)}/children?select=slug,status,content`)).map(unwrapContent)

  const getKirbyText = async (...fields) => await getKirbyTextForPath(undefined, fields)

  const getKirbyTextForPath = async (path, ...fields) => {
    const kt = await get(`pages/${toPageSlug(path)}/kt?select=${fields.join(',')}`)

    // fix relative links
    HtmlUtils.modifyHtml(kt, html => {
      for (const a of html.getElementsByTagName('a')) {
        a.href = a.getAttribute('href').replace(PathUtils.strip(process.env.VUE_APP_KIRBY_URL), '/' + PathUtils.strip(process.env.VUE_APP_BASE_URL))
      }
    })

    return kt
  }

  const getFiles = async path =>
    (await get(`pages/${toPageSlug(path)}/files?select=url,type,link,content`)).map(file => ({ ...file, fileLink: file.link })).map(unwrapContent)

  const getFile = async link => unwrapContent(await get(`${link}?select=content`))

  const getFileThumb = async (link, method, ...params) => await get(`${link}/thumb?method=${method}&params=${params.join(',')}`)

  return {
    getLanguages,
    getSite,
    getPage,
    getChildren,
    getKirbyText,
    getKirbyTextForPath,
    getFiles,
    getFile,
    getFileThumb
  }
}
