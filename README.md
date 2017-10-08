# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

@hyperapp/router provides utilities for routing client-side pages with [Hyperapp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).


Use the router as a Higher Order App [HOA](https://github.com/hyperapp/hyperapp/releases#higher-order-apps). Then compose your view as an array of [routes](#routes).


[Try it Online](http://hyperapp-router.surge.sh)

```jsx
import { router, Link } from "@hyperapp/router"

const routes = [
  [
    "/",
    (state, actions) =>
      <Link to="/test" go={actions.router.go}>
        Test
      </Link>
  ],
  [
    "/test",
    (state, actions) =>
      <Link to="/" go={actions.router.go}>
        Back
      </Link>
  ]
]

const routable = router(routes)

app(routable)({
  state: {
    count: 0
  },
  actions: {
    down: state => ({ count: state.count - 1 }),
    up: state => ({ count: state.count + 1 })
  }
})

```

## Installation

Download the minified library from a [CDN](https://unpkg.com/@hyperapp/router).

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

Then import from `router`.

```jsx
const { router, Link } = router
```

Or install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

Then [bundle](https://github.com/hyperapp/hyperapp/blob/master/docs/getting-started.md#build-pipeline) and use as you would any other module.

```jsx
import { router, Link } from "@hyperapp/router"
```

### Routes

A route is a tuple that consists of a [path](#paths) and a [view](https://github.com/hyperapp/hyperapp/blob/master/docs/view.md).

<pre>
[string, <a href="https://github.com/hyperapp/hyperapp/blob/master/docs/api.md#view">View</a>]
</pre>

Routes are matched in the following three scenarios:

- After the page is loaded.
- When the browser fires a [popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event.
- When [actions.router.go](#actionsroutergo) is called.

If [location.pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location) matches the path of a supplied route, we'll render its view.

### Paths

#### `/`, `/foo`

Match if location.pathname is `/`, `/foo`, etc.

#### `/:key`

Match location.pathname using `[A-Za-z0-9]+` and save the matched path to [state.router.params](#staterouterparams).

#### `*`

Match anything. Declaration order dictates matching precedence. If you are using `*`, declare it last.

### state.router.match

The matched path.

<pre>
string
</pre>

### state.router.params

The matched path params.

<pre>
{
  [key]: string
}
</pre>

|path                 |location.pathname    |state.router.params  |
|----------------------|---------------------|---------------------|
|`/:foo`               |/hyper               | { foo: "hyper" }    |

### actions.router.go

Update [location.pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location) with the supplied path.

<pre>
actions.router.go(<a href="#paths">path</a>)
</pre>

### events.route

Use route to make a network request, parse [location.search](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search), etc. This event is fired when a new route is matched.

<pre>
<a id="routeevent"></a>route(<a href="#state">State</a>, <a href="#actions">Actions</a>, <a href="#routeinfo">RouteInfo</a>): <a href="#routeinfo">RouteInfo</a>
</pre>

#### RouteInfo

<pre>
{
  match: string,
  params: any
}
</pre>

## Link

Use `Link` to create hyperlinks that map to a [route](#routes).

```jsx
<Link to="/" go={actions.router.go}>Back Home</Link>
```

### to

A route [path](#paths).

### go

A function that will be called with the supplied path when the hyperlink is clicked.

## License

@hyperapp/router is MIT licensed. See [LICENSE](LICENSE.md).

