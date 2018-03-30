import { Switch } from "../src/Switch"

test("Switch returns only the first truthy child", () => {
  const expected = "truthy value"
  const children = [0, null, expected, false, "other"].map(child => () => child)
  expect(Switch(null, children)()).toBe(expected)
})

test("Switch returns falsy when all children falsy", () => {
  const children = [0, "", false, null].map(child => () => child)
  expect(Switch(null, children)()).toBeFalsy()
})

test("Switch returns falsy when children is empty", () => {
  expect(Switch(null, [])()).toBeFalsy()
})
