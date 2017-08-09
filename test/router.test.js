import { h, app } from "hyperapp"
import { Router } from "../src"

window.requestAnimationFrame = setTimeout

const expectHTMLToBe = (body, ...values) =>
  expect(document.body.innerHTML).toBe(
    body.reduce((a, b, i) => a + values[i - 1] + b).replace(/\s{2,}/g, "")
  )

Object.defineProperty(window.location, "pathname", {
  writable: true
})

beforeEach(() => {
  document.body.innerHTML = ""
  location.pathname = "/"
  history.pushState = Function.prototype
})

test("/", () => {
  app({
    view: [["/", state => h("div", {
      oncreate() {
        expect(document.body.innerHTML).toBe(`<div>foo</div>`)
      }
    }, "foo")]],
    mixins: [Router]
  })
})

test("*", () => {
  app({
    view: [["*", state => h("div", {}, "foo")]],
    mixins: [Router],
    events: {
      loaded: (state, actions) => {
        actions.router.go("/bar")
        expectHTMLToBe`
          <div>
            foo
          </div>`

        actions.router.go("/baz")
        expectHTMLToBe`
          <div>
            foo
          </div>`

        actions.router.go("/")
        expectHTMLToBe`
          <div>
            foo
          </div>`
      }
    }
  })
})

test("routes", () => {
  window.location.pathname = "/foo/bar/baz"

  app({
    view: [["/foo/bar/baz", state => h("div", {
      oncreate() {
        expect(document.body.innerHTML).toBe(`<div>foobarbaz</div>`)
      }
    }, "foo", "bar", "baz")]],
    mixins: [Router]
  })
})

test("route params", () => {
  window.location.pathname = "/be_ep/bOp/b00p"

  app({
    view: [
      [
        "/:foo/:bar/:baz",
        state =>
          h("ul", {
            oncreate() {
              expect(document.body.innerHTML).toBe(`
                <ul>
                  <li>foo:be_ep</li>
                  <li>bar:bOp</li>
                  <li>baz:b00p</li>
                </ul>
              `)
            }
          },
          Object.keys(state.router.route.params).map(key =>
            h("li", {}, `${key}:${state.router.route.params[key]}`)
          ))
      ]
    ],
    mixins: [Router]
  })
})

test("route params separated by a dash", () => {
  window.location.pathname = "/beep-bop-boop"

  app({
    view: [
      [
        "/:foo-:bar-:baz",
        state =>
          h("ul", {
            oncreate() {
              expect(document.body.innerHTML).toBe(`
                <ul>
                  <li>foo:beep</li>
                  <li>bar:bop</li>
                  <li>baz:boop</li>
                </ul>
              `)
            }
          },
          Object.keys(state.router.route.params).map(key =>
            h("li", {}, `${key}:${state.router.route.params[key]}`)
          ))
      ]
    ],
    mixins: [Router]
  })
})

test("route params including a dot", () => {
  window.location.pathname = "/beep/bop.bop/boop"

  app({
    view: [
      [
        "/:foo/:bar/:baz",
        state =>
          h("ul", {
            oncreate() {
              expect(document.body.innerHTML).toBe(`
                <ul>
            			<li>foo:beep</li>
                  <li>bar:bop.bop</li>
                  <li>baz:boop</li>
                </ul>
              `)
            }
          },
          Object.keys(state.router.route.params).map(key =>
            h("li", {}, `${key}:${state.router.route.params[key]}`)
          ))
      ]
    ],
    mixins: [Router]
  })
})

test("routes with dashes into a single param key", () => {
  window.location.pathname = "/beep-bop-boop"

  app({
    view: [["/:foo", state => h("div", {
      oncreate() {
        expect(document.body.innerHTML).toBe(`
          <div>
            beep-bop-boop
          </div>
        `)
      }
    }, state.router.route.params.foo)]],
    mixins: [Router]
  })
})

test("popstate", () => {
  app({
    view: [["/", state => ""], ["/foo", state => h("div", {
      oncreate() {
        expect(document.body.innerHTML).toBe(`<div>foo</div>`)
      }
    }, "foo")]],
    mixins: [Router]
  })

  window.location.pathname = "/foo"

  const event = document.createEvent("Event")
  event.initEvent("popstate", true, true)
  window.document.dispatchEvent(event)
})

test("go", () => {
  window.history.pushState = (data, title, url) =>
    expect(url).toMatch(/^\/(foo|bar|baz)$/)

  app({
    view: [
      ["/", state => ""],
      ["/foo", state => h("div", {}, "foo")],
      ["/bar", state => h("div", {}, "bar")],
      ["/baz", state => h("div", {}, "baz")]
    ],
    mixins: [Router],
    events: {
      loaded: (state, actions) => {
        actions.router.go("/foo")
        expectHTMLToBe`
          <div>
            foo
          </div>
        `

        actions.router.go("/bar")
        expectHTMLToBe`
          <div>
            bar
          </div>
        `

        actions.router.go("/baz")
        expectHTMLToBe`
          <div>
            baz
          </div>
        `
      }
    }
  })
})
