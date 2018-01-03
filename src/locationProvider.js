function wrapHistory(keys) {
	return keys.reduce(function(next, key) {
		var fn = history[key]

		history[key] = function(data, title, url) {
			fn.call(this, data, title, url)
			dispatchEvent(new CustomEvent('pushstate', {detail: data}))
		}

		return function() {
			history[key] = fn
			next && next()
		}
	}, null)
}

function createProvider(methods) {
	var _listeners = []
	var provider = {
		_trigger: function(pathname, previous) {
			for (var i = 0; i < _listeners.length; ++i) {
				_listeners[i].set({pathname: pathname, previous: previous})
			}
		},
		get: function() {
			return methods.get()
		},
		go: function(pathname) {
			return methods.go(pathname, provider)
		},
		subscribe: function(actions) {
			function handleLocationChange(e) {
				actions.set({
					pathname: window.location.pathname,
					previous: e.detail
						? (window.location.previous = e.detail)
						: window.location.previous,
				})
			}

			var unwrap = wrapHistory(['pushState', 'replaceState'])

			addEventListener('pushstate', handleLocationChange)
			addEventListener('popstate', handleLocationChange)
			addEventListener('hashchange', handleLocationChange)

			return function() {
				removeEventListener('pushstate', handleLocationChange)
				removeEventListener('popstate', handleLocationChange)
				removeEventListener('hashchange', handleLocationChange)
				unwrap()
			}
		},
	}
	return provider
}

export var locationProvider = createProvider({
	get: function() {
		return window.location.pathname
	},
	go: function(pathname, provider) {
		var prev = provider.get()
		history.pushState(null, '', pathname)
		provider._trigger(pathname, prev)
	},
})
export var hashProvider = createProvider({
	get: function() {
		return (window.location.hash || '#/').replace(/^#/, '')
	},
	go: function(pathname, provider) {
		var prev = provider.get()
		window.location.hash = '#' + pathname
		provider._trigger(pathname, prev)
	},
})
