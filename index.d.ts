import { VNode } from "hyperapp";

/** Link */
interface LinkProps {
  to: string;
  location?: LocationState;
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
  location: LocationState;
  match: Match<P>;
}

interface RouteProps {
  parent?: boolean;
  path: string;
  render: (props: RenderProps<object>) => VNode<object>;
}

export function Route(props: RouteProps): VNode<object>;
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
  subscribe: (actions: LocationActions) => Function;
}

export declare const location: Location;
