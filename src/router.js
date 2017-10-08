import { h } from 'hyperapp'

export function router(routes) {
  return function (app) {
    return function (props) {
      return app(enhance(props))

      function enhance(props) {
        props = Object.assign({ state: {}, actions: {} }, props)

        props.state.router = {}
        props.actions.router = {
          set: function (state, actions, data) {
            return data
          },
          go: function (state, actions, path) {
            if (location.pathname + location.search !== path) {
              history.pushState({}, '', path)
              actions.set({ path: path })
            }
          }
        }

        props.view = function (state, actions) {
          window.onpopstate = function () {
            actions.router.set({})
          }

          const m = match(location.pathname, routes)
          const v = routes[m.index][1]
          state.router.params = m.params
          return v(state, actions)
        }

        return props
      }
    }
  }
}

function match(pathname, routes) {
  var match
  var index
  var params = {}

  for (var i = 0; i < routes.length && !match; i++) {
    var route = routes[i][0]
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
        match = route
        index = i
      }
    )
  }

  return {
    match: match,
    index: index,
    params: params
  }
}
