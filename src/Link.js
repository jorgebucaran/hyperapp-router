import { h } from "hyperapp"

export function Link(props, children) {
  props.href = props.to
  props.to = null

  props.onclick = function(e) {
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return

    if (e.button === 0) {
      e.preventDefault()
      props.go(props.href)
    }
  }

  return h("a", props, children)
}
