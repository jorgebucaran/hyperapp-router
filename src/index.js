export { Popstate } from './views/Popstate'
export { Route } from './views/Route'
export { Redirect } from './views/Redirect'
export { Link } from './views/Link'
export { Switch } from './views/Switch'

export default {
  state: {
    path: location.pathname,
  },
  actions: {
    update: () => ({ path: location.pathname }),
  },
}
