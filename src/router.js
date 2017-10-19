import { h } from 'hyperapp'

// router module
export const router = {
  actions: {
    set: function (state, actions, data) {
      return data
    },
    go: function (state, actions, path) {
      if (location.pathname + location.search !== path) {
        history.pushState({}, '', path)
        actions.set({ path: path })
      }
    }
  },
  init(state, actions) {
    window.addEventListener('popstate', function () {
      actions.set({})
    })
  }
}

// Router component
export function Router(props, children) {
  const m = match(location.pathname, children)
  const i = m.match ? m.index : children.length - 1
  const v = children[i].component
  return v(props.state, props.actions)
}

// Route component
export function Route(props, children) {
  return props
}

function match(pathname, children) {
  var match
  var index
  var params = {}

  for (var i = 0; i < children.length && !match; i++) {
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
