import { parseRoute } from "./parseRoute"

export function Route(props) {
  return function(state, actions) {
    var location = state.location;
    // Basepath must end with /
    if(props.basepath && props.basepath[props.basepath.length] !== "/"){
      props.basepath += "/";
    }
    // Remove basepath from path
    if(~props.path.indexOf(props.basepath)){
      props.path = props.path.split(props.basepath)[1];
    }
    // Remove basepath from url
    if(~location.pathname.indexOf(props.basepath)){
      location.pathname = location.pathname.split(props.basepath)[1];
    }
    var match = parseRoute(props.path, location.pathname, {
      exact: !props.parent
    })

    return (
      match &&
      props.render({
        match: match,
        location: location
      })
    )
  }
}
