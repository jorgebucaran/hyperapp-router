import { h, app, View, ActionsType } from "hyperapp";
import {
  Link,
  Route,
  RenderProps,
  Switch,
  location,
  LocationActions,
  LocationState
} from "router";

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;
const Topic = ({ match }: RenderProps<{ topicId: string }>) => (
  <h3>{match.params.topicId}</h3>
);
const TopicsView = ({ match }: RenderProps<{ topicId: string }>) => (
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

    <Route parent path={`${match.path}/:topicId`} render={Topic} />
  </div>
);

interface RouteState {
  location: LocationState;
}
const state: RouteState = {
  location: location.state
};

interface RouteActions {
  location: LocationActions;
}

const routeActions: ActionsType<RouteState, RouteActions> = {
  location: location.actions
};
const view: View<RouteState, RouteActions> = (state: RouteState) => (
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
    <Switch>
      <Route path="/" render={Home} />
      <Route path="/about" render={About} />
      <Route parent path="/topics" render={TopicsView} />
      <Route path="/" render={Home} />
      <Route path="/about" render={About} />
      <Route render={Home} />
    </Switch>
    <hr />
    <Route path="/" render={Home} />
    <Route path="/about" render={About} />
    <Route parent path="/topics" render={TopicsView} />
  </div>
);

const main = app(state, routeActions, view, document.body);

const unsubscribe = location.subscribe(main.location);
