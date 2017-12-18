import { parseRoute } from "./parseRoute"

export function Route(props) {
  var location = props.location || window.location
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
