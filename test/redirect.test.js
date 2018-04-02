import { h, app } from "hyperapp"
import { Route, Redirect, location } from "../src"

test("Redirect", done => {
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
      h("div", {}, [
        h(Route, {
          path: "/test",
          render: () =>
            h(Redirect, {
              to: "/done"
            })
        }),
        h(Route, {
          path: "/done",
          render: () =>
            h(
              "h1",
              {
                oncreate() {
                  expect(document.body.innerHTML).toBe(
                    `<div><h1>Hello</h1></div>`
                  )
                  unsubscribe()
                  done()
                }
              },
              "Hello"
            )
        })
      ]),
    document.body
  )

  const unsubscribe = location.subscribe(main.location)

  main.location.go("/test")
})
