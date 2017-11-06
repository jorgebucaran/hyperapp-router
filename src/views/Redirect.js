export const Redirect = props => {
  history.replaceState(null, null, props.to)
}
