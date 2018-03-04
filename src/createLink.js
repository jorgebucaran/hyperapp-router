import { h } from "hyperapp"

export var createLink = function(provider) {
  return function(props, children) {
    var to = props.to
    props.href = to
    props.onclick = function(e) {
      if (
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === "_blank" ||
        e.currentTarget.origin !== window.location.origin
      ) {
      } else {
        e.preventDefault()

        if (to !== provider.get()) {
          provider.go(to)
        }
      }
    }

    return h("a", props, children)
  }
}
