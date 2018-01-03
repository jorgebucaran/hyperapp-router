import {locationProvider, hashProvider} from './locationProvider'
import {createLink} from './createLink'
import {createRoute} from './createRoute'

function createPreset(provider) {
	return {
		state: {
			pathname: provider.get(),
			previous: provider.get(),
		},
		actions: {
			go: function(pathname) {
				provider.go(pathname)
			},
			set: function(data) {
				return data
			},
		},
		subscribe: function(actions) {
			return provider.subscribe(actions)
		},
	}
}
export var location = Object.assign(createPreset(locationProvider), {
	Link: createLink(locationProvider),
	Route: createRoute(locationProvider),
})
export var hash = Object.assign(createPreset(hashProvider), {
	Link: createLink(hashProvider),
	Route: createRoute(hashProvider),
})
