import modifyPageHtml from '@/plugins/modify-page-html'

let baseUrl

const getPage = async id => {
  const resp = await fetch(`${baseUrl}/${id}?content=json`)
  const page = await resp.json()

  modifyPageHtml(page, document, html => {
    // fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(baseUrl, process.env.BASE_URL.slice(0, -1))
    }
  })

  return page
}

export default {
  init: url => {
    baseUrl = url

    return {
      getPage
    }
  }
}
