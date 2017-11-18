import { extractParams, extractQuery } from '../utils'

export const Route = ({ exact, path = '', view }) => {
  const match = exact
    ? location.pathname === path
    : location.pathname.match(
        path.replace(/\//g, '\\/').replace(/:([\w]+)/g, '([-\\.%\\w\\(\\)]+)')
      )
  if (match) {
    const params = extractParams(path)
    const query = extractQuery(location.search)
    return view({ path, params, query })
  }
}
