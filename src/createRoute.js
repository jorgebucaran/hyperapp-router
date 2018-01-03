import { parseRoute } from "./parseRoute"

export function createRoute(provider) {
  return function(props) {
    var location = provider.get()
    var match = parseRoute(props.path, location, {
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
