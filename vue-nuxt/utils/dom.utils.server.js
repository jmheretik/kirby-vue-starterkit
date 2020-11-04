import { JSDOM } from 'jsdom'

export const DomUtils = {
  getVirtualDocument: () => new JSDOM('<!doctype html><html><body></body></html>').window.document,
}
