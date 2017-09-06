import { Link } from "./Link"

export function router(routes) {
  return function(emit) {
    return {
      state: {
        router: {}
      },
      actions: {
        router: {
          set: function(state, actions, data) {
            return {
              router: data
            }
          },
          go: function(state, actions, path) {
            if (location.pathname + location.search !== path) {
              history.pushState({}, "", path)
              actions.router.set({
                path: path
              })
            }
          }
        }
      },
      events: {
        load: function(state, actions) {
          addEventListener("popstate", function() {
            actions.router.set({})
          })
        },
        render: function(state, actions, view) {
          return function(state, actions, widgets) {
            widgets = widgets || {}

            widgets.Link = function(props, children) {
              props.go = actions.router.go
              return Link(props, children)
            }

            var route =
              routes[
                (state.router.index >= 0
                  ? state
                  : actions.router.set(
                      emit("route", match(location.pathname, routes))
                    )).router.index
              ][1]

            widgets.Route = function(props, children) {
              return route(state, actions, widgets)
            }

            return view(state, actions, widgets)
          }
        }
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
            route.replace(/\//g, "\\/").replace(/:([\w]+)/g, function(_, key) {
              keys.push(key)
              return "([-\\.%\\w\\(\\)]+)"
            }) +
            "/?$",
        "g"
      ),
      function() {
        for (var j = 1; j < arguments.length - 2; ) {
          var value = arguments[j++]
          try {
            value = decodeURI(value)
          } catch (_) {}
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
