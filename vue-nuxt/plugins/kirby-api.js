import axios from 'axios'

let apiUrl

const getPage = async id => {
  const resp = await axios.get(`${apiUrl}/${id}.json`)

  return resp.data
}

const getFile = async url => {
  const resp = await axios.get(url, { responseType: 'stream' })

  return resp.data
}

export default {
  init: url => {
    apiUrl = url

    return {
      getPage,
      getFile
    }
  }
}
