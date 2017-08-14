import { h, app } from "hyperapp"
import { Router } from "../src"

window.requestAnimationFrame = setTimeout

Object.defineProperty(window.location, "pathname", {
  writable: true
})

beforeEach(() => {
  document.body.innerHTML = ""
  location.pathname = "/"
  history.pushState = function(state, title, url) {
    location.pathname = url
  }
})

test("/", done => {
  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("*", done => {
  location.pathname = "/foo"

  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("routes", done => {
  window.location.pathname = "/foo/bar/baz"

  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("route params", done => {
  window.location.pathname = "/be_ep/bOp/b00p"

  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("route params separated by a dash", done => {
  window.location.pathname = "/beep-bop-boop"

  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("route params including a dot", done => {
  window.location.pathname = "/beep/bop.bop/boop"

  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("routes with dashes into a single param key", done => {
  window.location.pathname = "/beep-bop-boop"

  app({
    view: [
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
    ],
    mixins: [Router]
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
    view: [["/", () => view("")], ["/foo", () => view("foo")]],
    mixins: [Router]
  })
})

test("go", done => {
  app({
    view: [
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
    ],
    mixins: [Router]
  })
})

test("route", done => {
  app({
    events: {
      route(state, actions, route) {
        expect(route.match).toBe("/")
        done()
      }
    },
    view: [["/", (state, actions) => h("div", {}, "foo")]],
    mixins: [Router]
  })
})

test("do not fire route for unrelated state updates", done => {
  app({
    state: {
      value: "foo"
    },
    actions: {
      bar() {
        return {
          value: "bar"
        }
      }
    },
    events: {
      route(state, actions, route) {
        expect(state.value).toBe("foo")
      }
    },
    view: [
      [
        "/",
        (state, actions) =>
          h(
            "div",
            {
              oncreate() {
                actions.bar()
              },
              onupdate() {
                done()
              }
            },
            "foo"
          )
      ]
    ],
    mixins: [Router]
  })
})

test("fire route only if path changes", done => {
  app({
    state: {
      value: "foo"
    },
    actions: {
      bar() {
        return {
          value: "bar"
        }
      }
    },
    events: {
      route(state, actions, route) {
        expect(state.value).toBe("foo")
      }
    },
    view: [
      [
        "/",
        (state, actions) =>
          h(
            "div",
            {
              oncreate() {
                actions.bar()
                actions.router.go("/")
              },
              onupdate() {
                done()
              }
            },
            "foo"
          )
      ]
    ],
    mixins: [Router]
  })
})
