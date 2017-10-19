# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

@hyperapp/router provides utilities for routing client-side pages with [Hyperapp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

Include `router` as a module in your app. Then compose your routes with `Router` and `Route` using views.

[Try it Online](http://hyperapp-router.surge.sh)

```jsx
import { h, app } from "hyperapp";
import { router, Router, Route } from "@hyperapp/router";

app({
  state: { ... },
  actions: { ... },
  view: (state, actions) => (
    <Router state={state} actions={actions}>
      <Route path="/" view={Home} />
      <Route path="/login" view={Login} />
      <Route path="/404" view={NotFound} />
    </Router>
  ),
  modules: { router }
})
```

## Installation

Download the minified library from a [CDN](https://unpkg.com/@hyperapp/router).

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

Then import from `router`.

```jsx
const { router, Link, Route, Router } = router
```

Or install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

Then [bundle](https://github.com/hyperapp/hyperapp/blob/master/docs/getting-started.md#build-pipeline) and use as you would any other module.

```jsx
import { router, Link, Route, Router } from "@hyperapp/router"
```

### Paths

#### `/`, `/foo`

Match if location.pathname is `/`, `/foo`, etc.

#### `/:key`

Match location.pathname using `[A-Za-z0-9]+` and save the matched path to [state.router.params](#staterouterparams).

#### `*`

Match anything. Declaration order dictates matching precedence. If you are using `*`, declare it last.

### state.router.path

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

