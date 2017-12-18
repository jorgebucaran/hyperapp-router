import { h } from "hyperapp"

export function Link(props, children) {
  var to = props.to
  var location = props.location || window.location

  props.href = to
  props.onclick = function(e) {
    if (
      e.button !== 0 ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      props.target === "_blank" ||
      e.currentTarget.origin !== location.origin
    ) {
    } else {
      e.preventDefault()

      if (to !== location.pathname) {
        history.pushState(location.pathname, "", to)
      }
    }
  }

  return h("a", props, children)
}
