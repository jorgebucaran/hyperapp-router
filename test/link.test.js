import { h, app } from "hyperapp"
import { Route, Link, location } from "../src"

const fakeEvent = {
  button: 0,
  currentTarget: { origin: window.location.origin },
  preventDefault: () => {}
}

test("redirect", done => {
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
          render: () => {
            h(Link, {
              to: "/done"
            }).props.onclick(fakeEvent)
          }
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

test("pass through attributes", () => {
  const vnode = h(Link, { to: "/path", pass: "through", location })
  expect(vnode.props.to).toBeUndefined()
  expect(vnode.props.location).toBeUndefined()
  expect(vnode.props.href).toEqual("/path")
  expect(vnode.props.pass).toEqual("through")
})
