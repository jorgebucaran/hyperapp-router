export function Redirect(props) {
  var location = props.location || window.location
  history.replaceState(props.from || location.pathname, "", props.to)
}
