import { parseRoute } from "./parseRoute"

export function Route(props) {
  var location = props.location || window.location
  var path = props.path
  var match =
    !path ||
    parseRoute(path, location.pathname, {
      exact: !props.parent
    })

  return (
    match &&
    props.view({
      location: location,
      match: match
    })
  )
}
