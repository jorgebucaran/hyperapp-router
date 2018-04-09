import { Switch } from "../src/Switch"

test("Switch expects children are implemented as lazy components", () => {
  const state = new Object()
  const actions = new Object()
  const child = jest.fn()
  Switch(null, [child])(state, actions)
  expect(child.mock.calls.length).toBe(1)
  expect(child).toBeCalledWith(state, actions)
})

test("Switch returns only the first truthy child", () => {
  const state = new Object()
  const actions = new Object()
  const children = [
    jest.fn(() => 0),
    jest.fn(() => null),
    jest.fn(() => "first truthy value"),
    jest.fn(() => "another truthy")
  ]
  expect(Switch(null, children)(state, actions)).toEqual("first truthy value")
  expect(children[0]).toBeCalledWith(state, actions)
  expect(children[1]).toBeCalledWith(state, actions)
  expect(children[2]).toBeCalledWith(state, actions)
  expect(children[3]).not.toBeCalled()
})

test("Switch returns falsy when all children falsy", () => {
  const state = new Object()
  const actions = new Object()
  const children = [
    jest.fn(() => 0),
    jest.fn(() => ""),
    jest.fn(() => false),
    jest.fn(() => null)
  ]
  expect(Switch(null, children)(state, actions)).toBeFalsy()
  children.forEach(child => expect(child).toBeCalledWith(state, actions))
})

test("Switch returns falsy when children is empty", () => {
  expect(Switch(null, [])({}, {})).toBeFalsy()
})
