import { Switch } from './Switch'
import { parseRoute } from './parseRoute'

export function Route(props, childrens){
  var location = props.location
  var path = props.path || ''
  var render = props.render || Switch
  var match = parseRoute(path, location.pathname, {
    exact: !props.parent
  })
  return (match && render(
    function(){
      var args = Array.prototype.slice.call(arguments, 0)
      args[0] = Object.assign({}, args[0], {
        location: location,
        path: path + args[0].path || '',
      })
      return Route.apply(this, args)
    },
    Object.assign({}, props, { match: match, location: location } ),
    childrens)
  )
}