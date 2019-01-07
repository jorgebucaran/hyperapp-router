export const location = (state, path) => ({
  ...state,
  location: {
    pathname: path,
    previous: state && state.location ? state.location : null
  }
})

location.back = (state, n = 1) => ({
  ...state,
  location: new Array(n).fill(n).reduce(location =>
    location.previous || location, state.location)
})

location.go = url => (state, event) => {
  event.preventDefault()
  event.stopPropagation()
  return [location, url]
}