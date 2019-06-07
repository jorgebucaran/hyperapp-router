import { location } from './index'

const effect = (_, dispatch) => {
  const handleLocationChange = () =>
    dispatch([ location, window.location.pathname ])
  addEventListener('popstate', handleLocationChange)

  return ['pushState', 'replaceState'].reduce((next, key) => {
    const fn = history[key]
    history[key] = (data, tittle, url) => {
      !data.ignore && dispatch([location, url])
      return fn.call(history, data, tittle, url)
    }
    return () => {
      history[key] = fn
      next()
    }
  }, () => removeEventListener("popstate", handleLocationChange))
}

export default location => {
  if(location && window.location.pathname !== location.pathname)
    history.pushState({ location, ignore: true }, '', location.pathname)
  return { effect }
}