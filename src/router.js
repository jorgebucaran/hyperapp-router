export function Router(emit) {
  return {
    actions: {
      router: {
        update: function(state, actions, data) {
          return {
            router: {
              url: location.pathname,
              route: data || {}
            }
          }
        },
        go: function(state, actions, data) {
          history.pushState({}, "", data)
          actions.router.update()
        }
      }
    },
    events: {
      load: function(_, actions) {
        actions.router.update()
        addEventListener("popstate", function() {
          actions.router.update()
        })
      },
      render: function(state, actions, view) {
        if (state.router.url !== state.router.route.url) {
          var pathname = state.router.url
          var pattern = function(route) {
            return RegExp(
              route === "*"
                ? "." + route
                : "^" +
                    route
                      .replace(/\//g, "\\/")
                      .replace(/:([\w]+)/g, "([-\\.\\w]+)") +
                    "/?$",
              "g"
            )
          }
          var values
          var count = 1
          var params = {}
          var regex = RegExp(/\/(\w+)/g)
          var route = view.filter(function(x) {
            return pathname.match(pattern(x[0]))
          })[0]
          var keys = route[0].split("/")
          while (keys[count] && (values = regex.exec(pathname))) {
            keys[count][0] === ":" && (params[keys[count].slice(1)] = values[1])
            count++
          }
          emit(
            "route",
            actions.router.update({
              url: pathname,
              view: route[1],
              match: route[0],
              params: params
            })
          )
          return route[1]
        }
        return state.router.route.view
      }
    }
  }
}
