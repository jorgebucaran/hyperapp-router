export function Switch(props, children) {
  var i = 0
  while (!children[i] && i < children.length) i++
  return children[i]
}
