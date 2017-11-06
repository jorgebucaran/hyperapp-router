export const extractParams = route => {
  var params = {}
  var keys = []
  location.pathname.replace(
    RegExp(
      '^' +
        route.replace(/\//g, '\\/').replace(/:([\w]+)/g, function(_, key) {
          keys.push(key)
          return '([-\\.%\\w\\(\\)]+)'
        }) +
        '/?$',
      'g'
    ),
    function() {
      for (var j = 1; j < arguments.length - 2; ) {
        var value = arguments[j++]
        try {
          value = decodeURI(value)
        } catch (_) {}
        params[keys.shift()] = value
      }
    }
  )
  return params
}

export const extractQuery = queryString => {
  var query = {}
  var pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString
  ).split('&')
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=')
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '')
  }
  return query
}
