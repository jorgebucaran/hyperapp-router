function wrapHistory(keys) {
  return keys.reduce(function(next, key) {
    var fn = history[key]

    history[key] = function(data, title, url) {
      fn.call(this, data, title, url)
      dispatchEvent(createCustomEvent("pushstate", data))
    }

    return function() {
      history[key] = fn
      next && next()
    }
  }, null)
}

var createCustomEvent = "object" === typeof CustomEvent
    ? function (target, data) {
      // `new CustomEvent` is not supported by IE
      var event  = document.createEvent("CustomEvent")
      event.initCustomEvent(target, false, false, data)
      return event
    }
    : function (target, data) {
      return new CustomEvent(target, { detail: data })
    }

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
    function handleLocationChange(e) {
      actions.set({
        pathname: window.location.pathname,
        previous: e.detail
          ? (window.location.previous = e.detail)
          : window.location.previous
      })
    }

    var unwrap = wrapHistory(["pushState", "replaceState"])

    addEventListener("pushstate", handleLocationChange)
    addEventListener("popstate", handleLocationChange)

    return function() {
      removeEventListener("pushstate", handleLocationChange)
      removeEventListener("popstate", handleLocationChange)
      unwrap()
    }
  }
}
