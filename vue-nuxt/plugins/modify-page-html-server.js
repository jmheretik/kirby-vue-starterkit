import { JSDOM } from 'jsdom'
import modifyPageHtml from './modify-page-html'

const dom = new JSDOM('<!doctype html><html><body></body></html>')

export default (page, callback) => modifyPageHtml(page, dom.window.document, callback)
