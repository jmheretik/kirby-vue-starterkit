// run a provided callback directly on html of the given nested object
export default (obj, callback) => {
  // allows parsing html without loading anything (e.g. img src trigger)
  const virtualDocument = document.implementation.createHTMLDocument()

  for (const key in obj) {
    const el = virtualDocument.createElement('div')
    el.innerHTML = obj[key]

    callback(el)

    obj[key] = el.innerHTML
  }
}
