import modifyHtml from '@/plugins/modify-html'

// HTTP Basic auth headers
const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
const headers = { Authorization: 'Basic ' + auth }

let apiUrl

const toPageId = path => {
  if (path.startsWith('/')) path = path.slice(1)
  if (path.endsWith('/')) path = path.slice(0, -1)

  return path.replace('/', '+') || 'home'
}

const get = async request => {
  const resp = await fetch(`${apiUrl}/${request}`, { headers: headers })
  const json = await resp.json()

  return json.data
}

const getSite = async () => {
  const site = await get('site?select=title')
  const children = await get('site/children?select=id,title,template,status,hasChildren')
  const { social } = await getPage('about')

  return {
    ...site,
    children: await Promise.all(
      children.map(async page => ({
        ...page,
        children: page.hasChildren ? await getChildren(page.id) : []
      }))
    ),
    social
  }
}

const getPage = async path => {
  const { id, content } = await get(`pages/${toPageId(path)}?select=id,content`)

  return { id, ...content }
}

const getChildren = path => {
  return get(`pages/${toPageId(path)}/children?select=id,template,status,content`)
}

const getKirbyText = async (path, ...fields) => {
  const kt = await get(`pages/${toPageId(path)}/kt?select=${fields.join(',')}`)

  // fix relative links
  modifyHtml(kt, html => {
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(process.env.VUE_APP_KIRBY_URL, process.env.VUE_APP_BASE_URL.slice(0, -1))
    }
  })

  return kt
}

const getFiles = path => {
  return get(`pages/${toPageId(path)}/files?select=url,type,link,content`)
}

const getFile = link => {
  return get(`${link}?select=content`)
}

const getFileThumb = (link, method, ...params) => {
  return get(`${link}/thumb?method=${method}&params=${params.join(',')}`)
}

export default {
  init: url => {
    apiUrl = url

    return {
      getSite,
      getPage,
      getChildren,
      getKirbyText,
      getFiles,
      getFile,
      getFileThumb
    }
  }
}
