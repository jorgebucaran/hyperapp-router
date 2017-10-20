export function Router(props, children) {
  const route = routeMatch(props, children)
  return route.view(props.state, props.actions)
}

function routeMatch(props, children) {
  const match = props.actions.router.set(matcher(location.pathname, children))
  const index = match.path ? match.index : children.length - 1
  return children[index]
}

function matcher(pathname, children) {
  var path
  var index
  var params = {}

  for (var i = 0; i < children.length && !path; i++) {
    var route = children[i].path
    var keys = []
    pathname.replace(
      RegExp(
        route === "*"
          ? ".*"
          : "^" +
          route.replace(/\//g, "\\/").replace(/:([\w]+)/g, function (_, key) {
            keys.push(key)
            return "([-\\.%\\w\\(\\)]+)"
          }) +
          "/?$",
        "g"
      ),
      function () {
        for (var j = 1; j < arguments.length - 2;) {
          var value = arguments[j++]
          try {
            value = decodeURI(value)
          } catch (_) { }
          params[keys.shift()] = value
        }
        path = route
        index = i
      }
    )
  }

  return {
    path: path,
    index: index,
    params: params
  }
}
