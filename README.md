# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

Official router for HyperApp.

## Installation

With npm

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

or from a CDN

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

and access the Router from the global scope.

## Usage

```jsx
import Router from "@hyperapp/router"
```

The router treats the view as an array of route/view pairs.

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

Routes are matched in the order in which they are declared. To use the wildcard <samp>*</samp> correctly, it must be declared last.

|route                    | location.pathname    |
|-------------------------|-----------------------------------|
| <samp>/</samp>          | <samp>/</samp>
| <samp>/:foo</samp>      | Match <samp>[A-Za-z0-9]+</samp>. See [params](#params).
| <samp>*</samp>          | Match anything.

To navigate to a different route use [actions.router.go](#go).

## Example

[Try it online](https://hyperapp-router-example.glitch.me/)

```jsx
app({
  view: [
    [
      "/",
      (state, actions) =>
        <div>
          <h1>Home</h1>
          <a href="#about">About</a>
        </div>
    ],
    [
      "/:route",
      (state, actions) =>
        <div>
          <h1>About</h1>
          <a href="#home">Home</a>
        </div>
    ]
  ],
  mixins: [Router]
})
```

## API

### state
#### params

Type: { <i>foo</i>: string, ... }

The matched route params.

|route                 |location.pathname    |state.router.params  |
|----------------------|---------------------|---------------------|
|<samp>/:foo</samp>    |/hyper               | { foo: "hyper" }    |

#### match

Type: string

The matched route.

### actions
#### go

Type: ([path](#router_go_path))
* path: string

Update [location.pathname](https://developer.mozilla.org/en-US/docs/Web/API/Location).

### events
#### route

Type: ([state](/docs/api.md#state), [actions](/docs/api.md#actions), [data](#events-data), [emit](/docs/api.md#emit)) | Array\<[route](#route)\>

* <a name="events-data"></a>data
  * [params](#params)
  * [match](#match)

Fired when a route is matched.

## License

MIT. See [LICENSE](LICENSE.md).

