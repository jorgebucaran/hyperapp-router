# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

@hyperapp/router provides a state/actions module and components for routing client-side pages with [HyperApp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

## Installation

Using [npm](https://npmjs.com):

[Try it Online](http://hyperapp-router.surge.sh)

```jsx
import router, { Route } from "@hyperapp/router"
```

## Installation

Download the minified library from a [CDN](https://unpkg.com/@hyperapp/router).

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

Then access the router in the global scope as <samp>router</samp>.

## Mixin

Register the router as a [module](https://github.com/hyperapp/hyperapp/blob/master/docs/modules.md) in your app. Then use the router components in your view.

```jsx

app({
  modules: { router },
  view: (state, actions) =>
    <main>
      <Route path="/" exact="true" view={() => <h1>Hi</h1>} />
      <Route path="/adventure" view={() => <h1>Bye</h1>} />
    </main>
  ,
})
```

## Components

The router package exports a collection of view components as well as the main module. Use these components in various configurations to suit your specific routing requirements.

### Route

Use the Route component to decide what UI gets shown on certain URLs. Route matches are evaluated every render. If a route doesn't match it returns `false` and is not rendered, otherwise the routes [view](#view) is rendered. A match occurs if the [location.pathname]() [matches]() the routes [path](#path). A route with no path is always matches. Routes work as expected when nested inside other routes.

```js
<Route
  path="/"
  exact={true}
  view={Component}
/>
```

#### path: string

Any valid URL path with named parameters (defined by a colon prefix `/:foo`).

```
<Route path="/users/:id" view={User}/>
```

#### exact: bool

When `true`, will only match if the route's path matches the `location.pathname` _exactly_.

```js
<Route path="/one" exact={true} component={Love} />
```

| path | location.pathname | exact | matches? |
| --- | --- | --- | --- |
| `/one`  | `/one/two`  | `true` | no |
| `/one`  | `/one/two`  | `false` | yes |


#### view: Component

A route's `view` is itself a component. It gets passed an arguments object.

```js

// Example URL
// /game/chess/?level=expert

{
  path: "/game/:id",
  params: { id: "chess" },
  query: { level: "expert" },
}
```

- `params` are extracted from any named parameters in the path
- `query` object contains data extracted from location.search


### Link

Use the Link component to update the windows location and navigate between views without reloading the page. It gets rendered an an `a` tag with the appropriate `href`. When clicked it calls `history.pushState` and updates the state which triggers [Route](#Route) matching.

```js
<Link to='/neverland?by=pixiedust' />
```

### Redirect

Use the Redirect component to guard routes based on certain conditions. If the `when` prop evaluates to true `history.replaceState` is called and the state is updated which triggers [Route](#Route) matching.

```js
<Redirect to="/login" when={!state.user} />
```

### Popstate

The Popstate component is required to notify your app when the windows location changes. It updates `state.router.path` every time `history.pushState` or `history.replaceState` is called, including when the user navigates the browser forward and backwards. Place this before any [Routes](#Routes) or [Redirects](#Redirects)

```
Popstate({ update: actions.router.update })
```

### Switch

Use the Switch component when you want to ensure only one out of an array of routes is rendered. It always will render the first matching child only.

```js
<Switch>
  <Route path="/" exact={true} component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={Lost}/>
</Switch>
```


## License

@hyperapp/router is MIT licensed. See [LICENSE](LICENSE.md).
