export function location(state, path){
  return Object.assign({}, state, {
    location: {
      pathname: path || window.location.pathname,
      previous: state && state.location
        ? state.location.pathname
        : window.location.pathname
    }
  })
}