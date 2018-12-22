export function history(location){
  if(location && window.location.pathname !== location.pathname){
    window.history.pushState(location, '', location.pathname)
  }
}