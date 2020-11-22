export const PathUtils = {
  strip: path => {
    if (path.startsWith('/')) path = path.slice(1)
    if (path.endsWith('/')) path = path.slice(0, -1)

    return path
  },

  toPageSlug: path => PathUtils.strip(path).replace('/', '+') || 'home'
}
