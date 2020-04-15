import modifyHtml from '@/plugins/modify-html'

// HTTP Basic auth headers
const auth = btoa(process.env.VUE_APP_API_EMAIL + ':' + process.env.VUE_APP_API_PASSWORD)
const headers = { Authorization: 'Basic ' + auth }

let apiUrl

const asyncMap = async (array, callback) => Promise.all(array.map(callback))

const get = async path => {
  const resp = await fetch(`${apiUrl}/${path}`, { headers: headers })
  const json = await resp.json()

  return json.data
}

const getSite = async () => {
  const site = await get('site?select=title')
  const children = await get('site/children?select=id,title,template,status,hasChildren')
  const about = await getPage('about')

  return {
    ...site,
    children: await asyncMap(children, async page => ({
      ...page,
      children: page.hasChildren ? await getChildren(page.id) : []
    })),
    social: about.social
  }
}

const getPage = async id => {
  const page = await get(`pages/${id}?select=content`)

  return page.content
}

const getChildren = page => {
  return get(`pages/${page}/children?select=id,template,status,content`)
}

const getKirbyText = async (page, ...fields) => {
  const select = fields.map(field => field).join(',')

  const kt = await get(`pages/${page}/kt?select=${select}`)

  modifyHtml(kt, document, html => {
    // fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(process.env.VUE_APP_KIRBY_URL, process.env.BASE_URL.slice(0, -1))
    }
  })

  return kt
}

const getFiles = page => {
  return get(`pages/${page}/files?select=url,type,link,content`)
}

const getFile = path => {
  return get(`${path}?select=content`)
}

const getFileThumb = (path, method, ...params) => {
  params = params.map(field => field).join(',')

  return get(`${path}/thumb?method=${method}&params=${params}`)
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
