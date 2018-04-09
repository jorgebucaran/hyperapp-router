function createMatch(isExact, path, url, params) {
  return {
    isExact: isExact,
    path: path,
    url: url,
    params: params
  }
}

function trimTrailingSlash(url) {
  for (var len = url.length; "/" === url[--len]; );
  return url.slice(0, len + 1)
}

function decodeParam(val) {
  try {
    return decodeURIComponent(val)
  } catch (e) {
    return val
  }
}

export function parseRoute(path, url, options) {
  if (path === url || !path) {
    return createMatch(path === url, path, url)
  }

  var exact = options && options.exact
  var paths = trimTrailingSlash(path).split("/")
  var urls = trimTrailingSlash(url).split("/")

  if (paths.length > urls.length || (exact && paths.length < urls.length)) {
    return
  }

  for (var i = 0, params = {}, len = paths.length, url = ""; i < len; i++) {
    if (":" === paths[i][0]) {
      params[paths[i].slice(1)] = urls[i] = decodeParam(urls[i])
    } else if (paths[i] !== urls[i]) {
      return
    }
    url += urls[i] + "/"
  }

  return createMatch(false, path, url.slice(0, -1), params)
}
