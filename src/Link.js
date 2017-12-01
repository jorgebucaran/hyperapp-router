import { h } from "hyperapp"

export function Link(props, children) {
  var href = props.to
  var location = props.location || window.location

  return h(
    "a",
    {
      href: href,
      onclick: function(e) {
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

          if (location.pathname !== href) {
            history.pushState(location.pathname, "", href)
          }
        }
      }
    },
    children
  )
}
