import { h } from "hyperapp"
import { Route } from "../src"

test("autokey", () => {
  const route = h(Route, { path: "/test", render: () => h("div", {}, "test") })
  expect(route.props.key).toBe("/test")
})

test("don't replace keys", () => {
  const route = h(Route, {
    path: "/test",
    render: () => h("div", { key: "wow" }, "test")
  })
  expect(route.props.key).toBe("wow")
})
