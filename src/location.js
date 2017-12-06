export var location = {
  state: {
    pathname: window.location.pathname,
    previous: window.location.pathname
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

    addEventListener("pushstate", handleLocationChange)
    addEventListener("popstate", handleLocationChange)

    return function() {
      removeEventListener("pushstate", handleLocationChange)
      removeEventListener("popstate", handleLocationChange)
      unwrap()
    }

    function handleLocationChange(e) {
      actions.set({
        pathname: window.location.pathname,
        previous: e.detail
          ? (window.location.previous = e.detail)
          : window.location.previous
      })
    }
  }
}

function wrapHistory(keys) {
  return keys.reduce(function(next, key) {
    var method = history[key]

    history[key] = function(data, title, url) {
      method.call(this, data, title, url)
      dispatchEvent(new CustomEvent("pushstate", { detail: data }))
    }

    return function() {
      history[key] = method
      next && next()
    }
  }, null)
}
