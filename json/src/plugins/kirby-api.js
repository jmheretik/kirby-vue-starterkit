import modifyPageHtml from '@/plugins/modify-page-html'

let apiUrl

const getPage = async id => {
  const resp = await fetch(`${apiUrl}/${id}.json`)
  const page = await resp.json()

  modifyPageHtml(page, document, html => {
    // fix relative links
    for (const a of html.getElementsByTagName('a')) {
      a.href = a.href.replace(apiUrl, process.env.BASE_URL.slice(0, -1))
    }
  })

  return page
}

export default {
  init: url => {
    apiUrl = url

    return {
      getPage
    }
  }
}
