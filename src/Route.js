import { parseRoute } from "./parseRoute"

export function Route(props) {
  var location = props.location || window.location
  var match = parseRoute(props.path, location.pathname, {
    exact: !props.parent
  })

  if (!match) return

  var child = props.render({
    match: match,
    location: location
  })

  child.props.key = child.props.key || props.path

  return child
}
