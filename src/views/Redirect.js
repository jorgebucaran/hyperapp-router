export const Redirect = props => {
  // Update window location and state
  history.replaceState(null, null, props.to)
}
