export function parseRoute(path, url, options) {
  if (path === url) {
    return { isExact: true, url: url, path: url }
  }

  var exact = options && options.exact
  var paths = trimTrailingSlash(path).split("/")
  var urls = trimTrailingSlash(url).split("/")

  if (paths.length > urls.length || (exact && paths.length < urls.length)) {
    return
  }

  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (58 === paths[i].charCodeAt(0)) {
      try {
        params[paths[i].slice(1)] = urls[i] = decodeURI(urls[i])
      } catch (_) {
        continue
      }
    } else if (paths[i] !== urls[i]) {
      return
    }
    url += urls[i] + "/"
  }

  return {
    isExact: false,
    path: path,
    url: url.slice(0, -1),
    params: params
  }
}

function trimTrailingSlash(url) {
  for (var len = url.length; 47 === url.charCodeAt(--len); );
  return url.slice(0, len + 1)
}
