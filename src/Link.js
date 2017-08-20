import { h } from "hyperapp"

export function Link(props, children) {
  props.href = props.to
  props.to = null

  props.onclick = function(element) {
    element.preventDefault()
    props.go(props.href)
  }

  return h("a", props, children)
}
