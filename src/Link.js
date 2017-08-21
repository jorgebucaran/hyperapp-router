import { h } from "hyperapp"

export function Link(props, children) {
  props.href = props.to
  props.to = null

  props.onclick = function(e) {
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props.target === "_blank"
    )
      return

    e.preventDefault()
    props.go(props.href)
  }

  return h("a", props, children)
}
