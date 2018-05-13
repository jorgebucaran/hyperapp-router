import { h } from "hyperapp"

function getOrigin(loc) {
  var protocol = (loc.protocol && ':' !== loc.protocol) ? loc.protocol : location.protocol
  var host = [loc.hostname, loc.port].filter(Boolean).join(":")
      || [location.hostname, location.port].filter(Boolean).join(":")
  return protocol + "//" + host
}

function isExternal(anchorElement) {
  // Location.origin and HTMLAnchorElement.origin are not
  // supported by IE and Safari.
  return getOrigin(location) !== getOrigin(anchorElement)
}

export function Link(props, children) {
  return function(state, actions) {
    var to = props.to
    var location = state.location
    var onclick = props.onclick
    delete props.to
    delete props.location

    props.href = to
    props.onclick = function(e) {
      if (onclick) {
        onclick(e)
      }
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === "_blank" ||
        isExternal(e.currentTarget)
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
}
