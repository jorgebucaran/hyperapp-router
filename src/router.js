import { h } from 'hyperapp'

export function router(routes) {
  return function (app) {
    return function (props) {
      const actions = app(enhance(props))

      window.addEventListener('popstate', function () {
        actions.router.set({})
      })

      return actions

      function enhance(props) {
        props = props || {}
        props.state = props.state || {}
        props.actions = props.actions || {}

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

        const view = props.view
        props.view = function (state, actions) {
          const m = match(location.pathname, routes)
          state.router.params = m.params
          const v = m.match ? routes[m.index][1] : view
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
