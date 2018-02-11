import { VNode } from "hyperapp";

/** Link */
interface LinkProps {
  to: string;
  location?: Location;
}
export function Link(props: LinkProps): VNode<LinkProps>;

/** Route */
interface RouteProps {
  parent: any;
  path: string;
  render: () => VNode<any>;
}
export function Route(props: RouteProps): any;

/**Switch */
export function Switch(props: any, children: VNode<any>): VNode<any>;

/** Redirect */
type RedirectProps = LinkProps;
export function Redirect(props: RedirectProps): VNode<RedirectProps>;

/** location */
interface LocationState {
  pathname: string;
  previous: string;
}
interface LocationActions {
  go: (pathname: string) => any;
  set: (data: any) => any;
}
interface Location {
  state: LocationState;
  actions: LocationActions;
  subscribe: (actions: LocationActions) => void;
}

export declare const location: Location;
