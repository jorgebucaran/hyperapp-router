import { Switch } from "../src/Switch"

test("Switch returns only the first truthy child", () => {
  const expected = "truthy value"
  const children = [0, null, expected, false, "other"]
  expect(Switch(null, children)).toBe(expected)
})

test("Switch returns falsy when all children falsy", () => {
  const children = [0, "", false, null]
  expect(Switch(null, children)).toBeFalsy()
})
