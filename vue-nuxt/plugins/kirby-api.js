import axios from 'axios'

let baseUrl

const getPage = async id => {
  const resp = await axios.get(`${baseUrl}/${id}.json`)

  return resp.data
}

const getFile = async url => {
  const resp = await axios.get(url, { responseType: 'stream' })

  return resp.data
}

export default {
  init: url => {
    baseUrl = url

    return {
      getPage,
      getFile
    }
  }
}
