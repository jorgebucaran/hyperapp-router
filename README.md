# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

@hyperapp/router provides utilities for routing client-side pages with [HyperApp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

<!--

[Try it Online](..)

```jsx
app({
  view: [
    [
      "/",
      (state, actions) =>
        <div>
          <button onclick={() => actions.router.go("/about")}>About</button>
        </div>
    ],
    [
      "/:route",
      (state, actions) =>
        <div>
          <button onclick={() => actions.router.go("/")}>Home</button>
        </div>
    ]
  ],
  mixins: [Router]
})
``` -->

## Installation

Download from a CDN.

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

Then access the router in the global scope as `Router`.

```jsx
const { Router } = Router
```

Or install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

And import it.

```jsx
import { Router } from "@hyperapp/router"
```

## Usage

Register the router as a [mixin](https://github.com/hyperapp/hyperapp/blob/master/docs/mixins.md). Then compose your view as an array of route / view pairs.

```jsx
app({
  view: [
    ["/", state => <h1>Hi.</h1>]
    ["*", state => <h1>404</h1>],
  ],
  mixins: [Router]
})
```

When the page loads or the browser fires a [popstate](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event, the first route that matches [location.pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location) will be rendered.

### Routes

Routes are matched in the order in which they are declared. If you are using the wildcard `*`, it should be the last route.

#### `/`

Match the index route.

#### `*`

Match any route.

#### `/:foo`

Match using [A-Za-z0-9]+.


## API

### state.router.match

The matched route.

<pre>
string
</pre>

### state.router.params

The matched route params.

<pre>
{
  [key]: string
}
</pre>

|route                 |location.pathname    |state.router.params  |
|----------------------|---------------------|---------------------|
|`/:foo`               |/hyper               | { foo: "hyper" }    |

### actions.router.go

Update [location.pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location).

<pre>
actions.router.go(string)
</pre>

### Events

#### route

This event is fired when a new route is matched. Use it to make a network request, parse [location.search](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/search), etc.

<pre>
<a id="route"></a>route(<a href="#state">State</a>, <a href="#actions">Actions</a>, <a href="#Route">Route</a>): <a href="#Route">Route</a>
</pre>

#### Route

<pre>
{
  match: string,
  params: any
}
</pre>

## License

@hyperapp/router is MIT licensed. See [LICENSE](LICENSE.md).

