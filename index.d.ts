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

interface RouteProps {
  parent?: boolean;
  path: string;
  render: (props: RenderProps<any>) => VNode<any>;
}

export function Route(props: RouteProps): any;
/**Switch */
export function Switch(props: any, children: VNode<any>): VNode<any>;

/** Redirect */
type RedirectProps = LinkProps;
export function Redirect(props: RedirectProps): VNode<LinkProps>;

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
