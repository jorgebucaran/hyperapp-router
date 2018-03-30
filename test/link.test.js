import { h, app } from "hyperapp"
import { Route, Link, location } from "../src"

const fakeEvent = {
  button: 0,
  currentTarget: { origin: window.location.origin },
  preventDefault: () => {}
}

test("Link", done => {
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
            })(state, actions).attributes.onclick(fakeEvent)
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

test("Link without state/actions module", done => {
  const state = {}

  const actions = {}

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
            })(state, actions).attributes.onclick(fakeEvent)
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
                  done()
                }
              },
              "Hello"
            )
        })
      ]),
    document.body
  )

  history.pushState(null, "", "/test")
})

test("pass through attributes", () => {
  const vnode = h(Link, { to: "/path", pass: "through", location })({}, {})
  expect(vnode.attributes.to).toBeUndefined()
  expect(vnode.attributes.location).toBeUndefined()
  expect(vnode.attributes.href).toEqual("/path")
  expect(vnode.attributes.pass).toEqual("through")
})

test("custom onclick handler", () => {
  const event = { defaultPrevented: false }
  const onclick = e => {
    e.defaultPrevented = true
  }
  const vnode = h(Link, { to: "/path", onclick })({}, {})
  vnode.attributes.onclick(event)
  expect(event.defaultPrevented).toBe(true)
})
