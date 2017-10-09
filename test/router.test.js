import { h, app } from "hyperapp"
import { router } from "../src"

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

test("/", done => {
  const routes = [
    [
      "/",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("*", done => {
  location.pathname = "/foo"

  const routes = [
    [
      "*",
      (state, actions) =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("routes", done => {
  window.location.pathname = "/foo/bar/baz"

  const routes = [
    [
      "/foo/bar/baz",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("route params", done => {
  window.location.pathname = "/be_ep/bOp/b00p"

  const routes = [
    [
      "/:foo/:bar/:baz",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("route params separated by a dash", done => {
  window.location.pathname = "/beep-bop-boop"

  const routes = [
    [
      "/:foo-:bar-:baz",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("route params including a dot", done => {
  window.location.pathname = "/beep/bop.bop/boop"

  const routes = [
    [
      "/:foo/:bar/:baz",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("routes params with a dash in key", done => {
  window.location.pathname = "/beep-bop-boop"

  const routes = [
    [
      "/:foo",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
})

test("route params with uri encoded string & parentheses ", done => {
  window.location.pathname = "/Batman%20(1989%20film)"

  const routes = [
    [
      "/:foo",
      state =>
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
    ]
  ]

  const routable = router(routes)
  app(routable)()
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

  const routes = [["/", () => view("")], ["/foo", () => view("foo")]]

  const routable = router(routes)
  app(routable)()
})

test("go", done => {
  const routes = [
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

  const routable = router(routes)
  app(routable)()
})
