import { VNode } from "hyperapp";

/** Link */
interface LinkProps {
  to: string;
  location?: Location;
}
export function Link(props: LinkProps): VNode<LinkProps>;

/** Route */
interface Match<P> {
  url: string;
  path: string;
  isExact: boolean;
  params: P;
}
interface RenderProps<P> {
  location: Location;
  match: Match<P>;
}

interface RouteProps<P> {
  parent?: boolean;
  path: string;
  location?: Location;
  render: (props: RenderProps<P>) => VNode<RenderProps<P>>;
}

export function Route<P>(
  props: RouteProps<P>
): VNode<RenderProps<P>> | void;

/**Switch */
export function Switch<P>(
  props: object,
  children: Array<VNode<RouteProps<P>>>
): VNode<object>;

/** Redirect */
interface RedirectProps extends LinkProps {
  from?: string
}
export function Redirect(props: RedirectProps): VNode<RedirectProps>;

/** location */
interface LocationState {
  pathname: string;
  previous: string;
}

interface LocationActions {
  go: (pathname: string) => void;
}
interface RouterLocation {
  state: LocationState;
  actions: LocationActions;
  subscribe: (actions: LocationActions) => Function;
}

export declare const location: RouterLocation;
