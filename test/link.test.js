import { h } from "hyperapp"
import { Link } from "../src"

test("Link", done => {
  const link = h(Link, {
    to: "foo",
    go(path) {
      expect(path).toBe("foo")
      done()
    }
  })

  expect(link.data.href).toBe("foo")

  link.data.onclick({
    button: 0, // Left click
    preventDefault() {} // Noop
  })
})

test("Link - Ignore middle click", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 1, // Not left click
    preventDefault() {} // Noop
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

test("Link - Ignore if Meta key", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 0, // Left click
    metaKey: true,
    preventDefault() {} // Noop
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

test("Link - Ignore if CTRL key", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 0, // Left click
    ctrlKey: true,
    preventDefault() {} // Noop
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

test("Link - Ignore if ALT key", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 0, // Left click
    altKey: true,
    preventDefault() {} // Noop
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

test("Link - Ignore if Shift key", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 0, // Left click
    shiftKey: true,
    preventDefault() {} // Noop
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

