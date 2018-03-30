export function Switch(props, children) {
  return function(state, actions) {
    var child,
      i = 0
    while (
      !(child = children[i] && children[i](state, actions)) &&
      i < children.length
    )
      i++
    return child
  }
}
