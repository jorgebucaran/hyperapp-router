# @hyperapp/router
[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router)
[![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router)
[![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp)
[![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

@hyperapp/router provides components for routing client-side pages with [Hyperapp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

[Try it Online](http://hyperapp-router.surge.sh)

```jsx
import { h, app } from "hyperapp"
import { location, Link, Route } from "@hyperapp/router"

const homeView = () => <h2>Home</h2>
const aboutView = () => <h2>About</h2>
const topicsView = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/single-state-tree`}>Single State Tree</Link>
      </li>
      <li>
        <Link to={`${match.url}/routing`}>Routing</Link>
      </li>
    </ul>

    {match.isExact && <h3>Please select a topic.</h3>}

    <Route parent path={`${match.path}/:topicId`} view={topicView} />
  </div>
)
const topicView = ({ match }) => <h3>{match.params.topicId}</h3>

const actions = app({
  state: {
    location: location.state
  },
  actions: {
    location: location.actions
  },
  view: state =>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />

      <Route path="/" view={homeView} />
      <Route path="/about" view={aboutView} />
      <Route parent path="/topics" view={topicsView} />
    </div>
})

location.subscribe(actions.location)
```

## Installation

Download the minified library from a [CDN](https://unpkg.com/@hyperapp/router).

```html
<script src="https://unpkg.com/@hyperapp/router"></script>
```

Then import from `router`.

```jsx
const { location, Route, Link } = router
```

Or install with npm / Yarn.

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

Then with a module bundler like [Rollup](https://github.com/rollup/rollup) or [Webpack](https://github.com/webpack/webpack), use as you would anything else.

```jsx
import { location, Route, Link } from "@hyperapp/router"
```

## Usage

Add the `location` state and actions to your application.

```jsx
const actions = app({
  state: {
    location: location.state
  },
  actions: {
    location: location.actions
  }
})
```

Then call `subscribe` to listen to location change events.

```js
location.subscribe(actions.location)
```

## Components

### Route

Render some UI when the current [window location](https://developer.mozilla.org/en-US/docs/Web/API/Location) matches the given path. A route with no path always matches. Routes work as expected when nested inside other routes.

```jsx
<Route path="/" render={homeView} />
<Route path="/about" render={aboutView} />
<Route parent path="/topics" render={topicsView} />
```

#### parent

The route contains child routes.

#### path

The path to match against the current location.

#### render

The component to render when a match occurs.

#### props

Rendered components are passed the following props.

##### match.url

The matched part of the url. Use to assemble links inside routes. See Link.

##### match.path

The route path. Same as path.

#####  match.isExact

Indicates whether the given path matched the url exactly or not. I am still debating whether we need this or not.


### Link

Use the Link component to update the current [window location](https://developer.mozilla.org/en-US/docs/Web/API/Location) and navigate between views without a page reload. The new location will be pushed to the history stack using `history.pushState`.

```jsx
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>
  <li>
    <Link to="/about">About</Link>
  </li>
  <li>
    <Link to="/topics">Topics</Link>
  </li>
</ul>
```

#### to

The link's destination.

### Redirect

Use the Redirect component to navigate to a new location. The new location will override the current location in the history stack using `history.replaceState`.

```jsx
const Login = ({ from, login, redirectToReferrer }) => props => {
  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <div>
      <p>
        You must log in to view the page at {from}.
      </p>
      <button
        onclick={() => {
          auth.authenticate(userId => login(userId))
        }}
      >
        Log in
      </button>
    </div>
  )
}
```

#### to

The redirect's destination.

#### from

Overwrite the previous pathname. See [location.previous](#previous).

### Switch

Use the Switch component when you want to ensure only one out of several routes is rendered. It always renders the first matching child.

```jsx
<Switch>
  <Route path="/" view={Home} />
  <Route
    path="/old-match"
    view={() => <Redirect from="/old-match" to="/will-match" />}
  />
  <Route path="/will-match" view={WillMatch} />
  <Route view={NoMatch} />
</Switch>
```

## Modules

### location

#### pathname

Same as window.location.pathname.

#### previous

The previous location.pathname. Useful when redirecting back to the referrer url/pathname after leaving a guarded/protected route.

#### go(url)

Navigate to the given url.

## License

@hyperapp/router is MIT licensed. See [LICENSE](LICENSE.md).
