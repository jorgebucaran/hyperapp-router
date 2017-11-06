export const Redirect = props => {
  // Update window location and state
  props.when && history.replaceState(null, null, props.to)
}
