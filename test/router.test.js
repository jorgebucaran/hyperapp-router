import { h, app } from "hyperapp"
import { router, Router, Route } from "../src"

window.requestAnimationFrame = setTimeout

Object.defineProperty(window.location, "pathname", {
  writable: true
})

beforeEach(() => {
  document.body.innerHTML = ""
  location.pathname = "/"
  history.pushState = function (state, title, url) {
    location.pathname = url
  }
})

const notFound = h(Route, { path: "/404", view: h("div", "not found") })

test("/", done => {
  const path = "/"
  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>foo</div>`)
          done()
        }
      },
      "foo"
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("*", done => {
  location.pathname = "/foo"

  const path = "*"
  const view = (state, actions) =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>foo</div>`)
          actions.router.go("/bar")
        },
        onupdate() {
          expect(document.body.innerHTML).toBe(`<div>foo</div>`)
          done()
        }
      },
      "foo"
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("routes", done => {
  window.location.pathname = "/foo/bar/baz"

  const path = "/foo/bar/baz"
  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>foobarbaz</div>`)
          done()
        }
      },
      "foo",
      "bar",
      "baz"
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("route params", done => {
  window.location.pathname = "/be_ep/bOp/b00p"

  const path = "/:foo/:bar/:baz"
  const view = state =>
    h(
      "ul",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(
            `<ul><li>foo:be_ep</li><li>bar:bOp</li><li>baz:b00p</li></ul>`
          )
          done()
        }
      },
      Object.keys(state.router.params).map(key =>
        h("li", {}, `${key}:${state.router.params[key]}`)
      )
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("route params separated by a dash", done => {
  window.location.pathname = "/beep-bop-boop"

  const path = "/:foo-:bar-:baz"
  const view = state =>
    h(
      "ul",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(
            `<ul><li>foo:beep</li><li>bar:bop</li><li>baz:boop</li></ul>`
          )
          done()
        }
      },
      Object.keys(state.router.params).map(key =>
        h("li", {}, `${key}:${state.router.params[key]}`)
      )
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("route params including a dot", done => {
  window.location.pathname = "/beep/bop.bop/boop"

  const path = "/:foo/:bar/:baz"
  const view = state =>
    h(
      "ul",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(
            `<ul><li>foo:beep</li><li>bar:bop.bop</li><li>baz:boop</li></ul>`
          )
          done()
        }
      },
      Object.keys(state.router.params).map(key =>
        h("li", {}, `${key}:${state.router.params[key]}`)
      )
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("routes params with a dash in key", done => {
  window.location.pathname = "/beep-bop-boop"

  const path = "/:foo"
  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>beep-bop-boop</div>`)
          done()
        }
      },
      state.router.params.foo
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("route params with uri encoded string & parentheses ", done => {
  window.location.pathname = "/Batman%20(1989%20film)"

  const path = "/:foo"
  const view = state =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(
            `<div>Batman (1989 film)</div>`
          )
          done()
        }
      },
      state.router.params.foo
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path, view }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("popstate", done => {
  const view = name =>
    h(
      "div",
      {
        oncreate() {
          expect(document.body.innerHTML).toBe(`<div>${name}</div>`)

          const event = document.createEvent("Event")
          event.initEvent("popstate", true, true)

          window.location.pathname = `/foo`
          window.document.dispatchEvent(event)
        },
        onupdate() {
          expect(document.body.innerHTML).toBe(`<div>${name}</div>`)
          done()
        }
      },
      name
    )

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        h(Route, { path: "/", view: () => view("") }),
        h(Route, { path: "/foo", view: () => view("foo") }),
        notFound
      ])
    ),
    modules: { router }
  })
})

test("go", done => {
  const views = [
    [
      "/",
      (state, actions) =>
        h("div", {
          oncreate() {
            expect(document.body.innerHTML).toBe("<div></div>")
            actions.router.go("/foo")
          }
        })
    ],
    [
      "/foo",
      (state, actions) =>
        h(
          "div",
          {
            onupdate() {
              expect(document.body.innerHTML).toBe("<div>foo</div>")
              actions.router.go("/bar")
            }
          },
          "foo"
        )
    ],
    [
      "/bar",
      (state, actions) =>
        h(
          "div",
          {
            onupdate() {
              expect(document.body.innerHTML).toBe("<div>bar</div>")
              actions.router.go("/baz")
            }
          },
          "bar"
        )
    ],
    [
      "/baz",
      (state, actions) =>
        h(
          "div",
          {
            onupdate() {
              expect(document.body.innerHTML).toBe("<div>baz</div>")
              done()
            }
          },
          "baz"
        )
    ]
  ]

  app({
    view: (state, actions) => (
      h(Router, { state, actions }, [
        views.map(v => h(Route, { path: v[0], view: v[1] })),
        notFound
      ])
    ),
    modules: { router }
  })
})
