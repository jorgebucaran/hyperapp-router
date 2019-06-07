import pathToRegexp from 'path-to-regexp'

const cache = {}
const compile = (path, { exact: end, strict }, keys = []) => {
  const id = `${path}/${end}/${strict}`
  return cache[id] ? cache[id] : (cache[id] = {
    regexp: pathToRegexp(path, keys, { end, strict }), keys
  })
}

export const Route = (context, child) => {
  const {
    path = '',
    exact = false,
    strict = false,
    render = () => child,
    location = window.location
  } = context

  const compiled = compile(path, { exact, strict })
  const match = compiled.regexp.exec(location.pathname)
  const [ url, ...values ] = match || []
  return match ? render({ route: {
    params: compiled.keys.reduce((params, key, index) =>
      Object.assign(params, {[ key.name ]: values[index]}), {}),
    context,
    path,
    url
  }}, (props, ...args) => Route.call(undefined, {
    ...context, ...props,
    render: props.render || undefined,
    path: path + (props.path || ''),
  }, ...args)) : null
}