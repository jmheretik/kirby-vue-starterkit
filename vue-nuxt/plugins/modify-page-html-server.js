import { JSDOM } from 'jsdom'
import modifyPageHtml from './modify-page-html'

const dom = new JSDOM('<!doctype html><html><body></body></html>')
const document = dom.window.document

export default (page, callback) => modifyPageHtml(page, document, callback)
