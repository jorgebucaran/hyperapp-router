export { Switch } from "./Switch"
export { Redirect } from "./Redirect"
export { location, hash } from "./location"

import { locationProvider } from './locationProvider'
import { createLink } from "./createLink"
import { createRoute } from "./createRoute"
export var Link = createLink(locationProvider)
export var Route = createRoute(locationProvider)
