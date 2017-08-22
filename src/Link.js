import { h } from "hyperapp"

export function Link(props, children) {
  props.href = props.to
  props.to = null

  props.onclick = function(event) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey ||
      props.target === "_blank"
    ) {
      return
    }

    event.preventDefault()
    props.go(props.href)
  }

  return h("a", props, children)
}
