export const HtmlUtils = {
  // run a provided callback directly on html of nested page objects that contain it
  modifyPageHtml: async (page, callback) => {
    // allows parsing html without loading anything (e.g. img src trigger)
    const virtualDocument = (await import(`./dom.utils.${process.client ? 'client' : 'server'}`)).DomUtils.getVirtualDocument()

    for (const htmlObject of findObjectsWithProperty(page, 'html')) {
      const el = virtualDocument.createElement('div')
      el.innerHTML = htmlObject.html

      callback(el)

      htmlObject.html = el.innerHTML
    }
  },
}

// find all nested objects which have the specified property
const findObjectsWithProperty = (parent, property) => {
  const result = []
  const traverse = (obj) => {
    if (obj[property]) result.push(obj)

    for (const child of Object.values(obj)) {
      if (child !== null && typeof child === 'object') traverse(child)
    }
  }

  traverse(parent)
  return result
}
