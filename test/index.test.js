import { h, app } from "hyperapp"
import { Route, location } from "../src"

test("router", done => {
  const state = {
    location: location.state
  }

  const actions = {
    location: location.actions
  }

  const main = app(
    state,
    actions,
    (state, actions) =>
      h(Route, {
        render: () =>
          h(
            "h1",
            {
              oncreate() {
                expect(document.body.innerHTML).toBe(`<h1>Hello</h1>`)
                unsubscribe()
                done()
              }
            },
            "Hello"
          )
      }),
    document.body
  )

  const unsubscribe = location.subscribe(main.location)
})

test("route autokey", () => {
  const route = h(Route, {path: "/test", render: () => h("div", {}, "test")})
  expect(route.props.key).toBe("/test")
})

test("route don't replace keys", () => {
  const route = h(Route, {path: "/test", render: () => h("div", { key: "wow" }, "test")})
  expect(route.props.key).toBe("wow")
})
