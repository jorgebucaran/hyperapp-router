export { Link } from "./Link"
export { Route } from "./Route"
export { Router } from "./Router"

// router module
export const router = {
  actions: {
    set: function (state, actions, data) {
      return data
    },
    go: function (state, actions, path) {
      if (location.pathname + location.search !== path) {
        history.pushState({}, "", path)
        actions.set({ path: path })
      }
    }
  },
  init(state, actions) {
    addEventListener("popstate", function () {
      actions.set({})
    })
  }
}
