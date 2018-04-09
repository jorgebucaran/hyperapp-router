import { parseRoute } from "./parseRoute"

export function Route(props) {
  return function(state, actions) {
    var location = state.location
    var match = parseRoute(props.path, location.pathname, {
      exact: !props.parent
    })

    return (
      match &&
      props.render({
        match: match,
        location: location
      })
    )
  }
}
