// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
var CustomEvent = (function (c) {
  if (typeof c === "function") return c
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype
  return CustomEvent
})(window.CustomEvent)

function wrapHistory(keys) {
  return keys.reduce(function(next, key) {
    var fn = history[key]

    history[key] = function(data, title, url) {
      fn.call(this, data, title, url)
      dispatchEvent(new CustomEvent("pushstate", { detail: data }))
    }

    return function() {
      history[key] = fn
      next && next()
    }
  }, null)
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
