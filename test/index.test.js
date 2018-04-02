import { h, app } from "hyperapp"
import { Route, location } from "../src"

test("Router", done => {
  const state = {
    location: location.state
  }

  const actions = {
    location: location.actions
  }

  const main = app(
    state,
    actions,
    (state, actions) => (
      <Route
        path="/test"
        render={() => (
          <h1
            oncreate={() => {
              expect(document.body.innerHTML).toBe(`<h1>Hello</h1>`)
              unsubscribe()
              done()
            }}
          >
            Hello
          </h1>
        )}
      />
    ),
    document.body
  )

  const unsubscribe = location.subscribe(main.location)

  main.location.go("/test")
})
