let setup = false
export const Popstate = ({ update }) => {
  if (!setup) {
    setup = true
    // Update path when a pushState occurs
    const pushState = history.pushState
    history.pushState = function() {
      pushState.apply(history, arguments)
      typeof update === 'function' && update()
    }
    // Update path when a replaceState occurs
    const replaceState = history.replaceState
    history.replaceState = function() {
      replaceState.apply(history, arguments)
      typeof update === 'function' && update()
    }
    // Update path when ever the window url changes
    addEventListener('popstate', update)
  }
}
