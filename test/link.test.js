import { h } from "hyperapp"
import { Link } from "../src"

const BUTTON_LEFT_CLICK = 0
const BUTTON_RIGHT_CLICK = 1

Object.defineProperty(window.location, "origin", {
  writable: true
})

test("Link", done => {
  const preventDefault = jest.fn()

  const link = Link({
    to: "foo",
    go(path) {
      expect(path).toBe("foo")
      expect(preventDefault.mock.calls.length).toBe(1)
      done()
    }
  })

  expect(link.data.href).toBe("foo")

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    currentTarget: {
      origin: window.location.origin
    },
    preventDefault: preventDefault
  })
})

test("ignore if target ='_blank'", done => {
  const go = jest.fn()

  const link = h(Link, {
    go,
    to: "foo",
    target: "_blank"
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK
  })

  expect(go.mock.calls.length).toBe(0)
  done()
})

test("ignore if different origin", done => {
  const defaultOrigin = window.location.origin
  window.location.origin = "https://hyperapp.js.org"

  const go = jest.fn()

  const link = h(Link, {
    to: "https://github.com",
    go: go
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    currentTarget: {
      origin: "https://github.com"
    }
  })

  expect(go.mock.calls.length).toBe(0)
  window.location.origin = defaultOrigin
  done()
})

test("only capture unmodified left clicks", done => {
  const go = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: go
  })

  link.data.onclick({
    button: BUTTON_RIGHT_CLICK
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    metaKey: true
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    ctrlKey: true
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    altKey: true
  })

  link.data.onclick({
    button: BUTTON_LEFT_CLICK,
    shiftKey: true
  })

  expect(go.mock.calls.length).toBe(0)
  done()
})
