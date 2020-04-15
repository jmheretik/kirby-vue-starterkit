// run a provided callback directly on html of the given nested object
export default (parent, document, callback) => {
  // allows parsing html without loading anything (e.g. img src trigger)
  const virtualDocument = document.implementation.createHTMLDocument()

  for (const key in parent) {
    const el = virtualDocument.createElement('div')
    el.innerHTML = parent[key]

    callback(el)

    parent[key] = el.innerHTML
  }
}
