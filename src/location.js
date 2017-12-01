var pathname = location.pathname
var PUSHSTATE = "pushstate"
var POPSTATE = "popstate"

export default {
  state: {
    pathname: pathname,
    previous: pathname
  },
  actions: {
    go: function(pathname) {
      history.pushState(null, "", pathname)
    },
    set: function(data) {
      return data
    }
  },
  subscribe: function(actions) {
    var unwrap = wrapHistory(["pushState", "replaceState"])

    addEventListener(PUSHSTATE, handleLocationChange)
    addEventListener(POPSTATE, handleLocationChange)

    return function() {
      removeEventListener(PUSHSTATE, handleLocationChange)
      removeEventListener(POPSTATE, handleLocationChange)
      unwrap()
    }

    function handleLocationChange(e) {
      actions.set({
        pathname: location.pathname,
        previous: e.detail ? (location.previous = e.detail) : location.previous
      })
    }
  }
}

function wrapHistory(keys) {
  return keys.reduce(function(next, key) {
    var method = history[key]

    history[key] = function(data, title, url) {
      method.call(this, data, title, url)
      dispatchEvent(
        new CustomEvent("pushstate", {
          detail: data
        })
      )
    }

    return function() {
      history[key] = method
      next && next()
    }
  }, null)
}
