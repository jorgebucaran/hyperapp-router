import { parseRoute } from "./parseRoute"

export function Route(props, children) {
  return function(state, actions) {
    var location = state.location
    var match = parseRoute(props.path, location.pathname, {
      exact: !props.parent
    })

    return (
      match &&
      children[0]({
        match: match,
        location: location
      })
    )
  }
}
