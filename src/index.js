export { Popstate } from './components/Popstate'
export { Route } from './components/Route'
export { Redirect } from './components/Redirect'
export { Link } from './components/Link'
export { Switch } from './components/Switch'

export default {
  state: {
    path: location.pathname,
  },
  actions: {
    update: () => ({ path: location.pathname }),
  },
}
