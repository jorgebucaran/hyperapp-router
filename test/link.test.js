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

test("Link - Ignore if target ='_blank'", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock,
    target: "_blank"
  })

  link.data.onclick({
    button: 0, // Left click
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})

test("Link - Only capture unmodified left clicks", done => {
  const mock = jest.fn()

  const link = h(Link, {
    to: "foo",
    go: mock
  })

  link.data.onclick({
    button: 1, // Not left click
  })

  link.data.onclick({
    button: 0, // Left click
    metaKey: true,
  })

  link.data.onclick({
    button: 0, // Left click
    ctrlKey: true,
  })

  link.data.onclick({
    button: 0, // Left click
    altKey: true,
  })

  link.data.onclick({
    button: 0, // Left click
    shiftKey: true,
  })

  expect(mock.mock.calls.length).toBe(0)
  done()
})