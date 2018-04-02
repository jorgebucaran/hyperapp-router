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
    (state, actions) => (
      <div>
        <Route path="/test" render={() => <Redirect to="/done" />} />
        <Route
          path="/done"
          render={() => (
            <h1
              oncreate={() => {
                expect(document.body.innerHTML).toBe(
                  `<div><h1>Hello</h1></div>`
                )
                unsubscribe()
                done()
              }}
            >
              Hello
            </h1>
          )}
        />
      </div>
    ),
    document.body
  )

  const unsubscribe = location.subscribe(main.location)

  main.location.go("/test")
})
