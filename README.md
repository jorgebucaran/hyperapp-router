# Hyperapp Router

[![Travis CI](https://img.shields.io/travis/hyperapp/router/master.svg)](https://travis-ci.org/hyperapp/router) [![Codecov](https://img.shields.io/codecov/c/github/hyperapp/router/master.svg)](https://codecov.io/gh/hyperapp/router) [![npm](https://img.shields.io/npm/v/@hyperapp/router.svg)](https://www.npmjs.org/package/hyperapp) [![Slack](https://hyperappjs.herokuapp.com/badge.svg)](https://hyperappjs.herokuapp.com "Join us")

Hyperapp Router provides declarative routing for [Hyperapp](https://github.com/hyperapp/hyperapp) using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

[Try this example online](http://hyperapp-router.surge.sh).

```jsx
import { h, app } from "hyperapp"
import { Link, Route, location } from "@hyperapp/router"

const Home = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Topic = ({ match }) => <h3>{match.params.topicId}</h3>
const TopicsView = ({ match }) => (
  <div key="topics">
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

    <Route parent path={`${match.path}/:topicId`} render={Topic} />
  </div>
)

const state = {
  location: location.state
}

const actions = {
  location: location.actions
}

const view = state => (
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

    <Route path="/" render={Home} />
    <Route path="/about" render={About} />
    <Route parent path="/topics" render={TopicsView} />
  </div>
)

const main = app(state, actions, view, document.body)

const unsubscribe = location.subscribe(main.location)
```

## Installation

<pre>
npm i <a href="https://www.npmjs.com/package/@hyperapp/router">@hyperapp/router</a>
</pre>

Then with a module bundler like Rollup or Webpack, use as you would anything else.

```jsx
import { Link, Route, Switch, Redirect, location } from "@hyperapp/router"
```

If you don't want to set up a build environment, you can download Hyperapp Router from a CDN like [unpkg.com](https://unpkg.com/@hyperapp/router) and it will be globally available through the <samp>window.hyperappRouter</samp> object. We support all ES5-compliant browsers, including Internet Explorer 10 and above.

## Usage

Add the `location` module to your state and actions and start the application.

```jsx
const state = {
  location: location.state
}

const actions = {
  location: location.actions
}

const main = app(
  state,
  actions,
  (state, actions) => <Route render={() => <h1>Hello!</h1>} />,
  document.body
)
```

Then call `subscribe` to listen to location change events.

```js
const unsubscribe = location.subscribe(main.location)
```

## Components

### Route

Render a component when the given path matches the current [window location](https://developer.mozilla.org/en-US/docs/Web/API/Location). A route without a path is always a match. Routes can have nested routes.

```jsx
<Route path="/" render={Home} />
<Route path="/about" render={About} />
<Route parent path="/topics" render={TopicsView} />
```

#### parent

The route contains child routes.

#### path

The path to match against the current location.

#### render

The component to render when there is a match.

### Render Props

Rendered components are passed the following props.

```jsx
const RouteInfo = ({ location, match }) => (
  <div>
    <h3>Url: {match.url}</h3>
    <h3>Path: {match.path}</h3>
    <ul>
      {Object.keys(match.params).map(key => (
        <li>
          {key}: {match.params[key]}
        </li>
      ))}
    </ul>
    <h3>Location: {location.pathname}</h3>
  </div>
)
```

#### location

The [window location](https://developer.mozilla.org/en-US/docs/Web/API/Location).

#### match.url

The matched part of the url. Use to assemble links inside routes. See [Link](#link).

#### match.path

The route [path](#path).

#### match.isExact

Indicates whether the given path matched the url exactly or not.

### Link

Use the Link component to update the current [window location](https://developer.mozilla.org/en-US/docs/Web/API/Location) and navigate between views without a page reload. The new location will be pushed to the history stack using `history.pushState`.

```jsx
const Navigation = (
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
)
```

#### to

The link's destination url.

### Redirect

Use the Redirect component to navigate to a new location. The new location will override the current location in the history stack using `history.replaceState`.

```jsx
const Login = ({ from, login, redirectToReferrer }) => props => {
  if (redirectToReferrer) {
    return <Redirect to={from} />
  }

  return (
    <div>
      <p>You must log in to view the page at {from}.</p>
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

The redirect's destination url.

#### from

Overwrite the previous pathname. See [location.previous](#previous).

### Switch

Use the Switch component when you want to ensure only one out of several routes is rendered. It always renders the first matching child.

```jsx
const NoMatchExample = (
  <Switch>
    <Route path="/" render={Home} />
    <Route
      path="/old-match"
      render={() => <Redirect from="/old-match" to="/will-match" />}
    />
    <Route path="/will-match" render={WillMatch} />
    <Route render={NoMatch} />
  </Switch>
)
```

## Modules

### location

#### pathname

Same as window.location.pathname.

#### previous

The previous location.pathname. Useful when redirecting back to the referrer url/pathname after leaving a protected route.

#### go(url)

Navigate to the given url.

## License

Hyperapp Router is MIT licensed. See [LICENSE](LICENSE.md).
