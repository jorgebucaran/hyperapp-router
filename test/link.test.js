import { h } from "hyperapp"
import { Link } from "../src"

test("/", done => {
  const link = h(Link, {
    to: "foo",
    go(path) {
      expect(path).toBe("foo")
      done()
    }
  })

  expect(link.data.href).toBe("foo")

  link.data.onclick({
    preventDefault() {} // Noop
  })
})
