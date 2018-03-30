import { Route } from "../src/Route"

test("Route is a lazy component", () => {
  expect(Route(null, [])).toBeInstanceOf(Function)
})

test("Route returns falsy if it doesn't match to current location", () => {
  const state = { location: { pathname: "/" } }
  const actions = {}
  const render = jest.fn()
  expect(Route({ path: "/users", render }, [])(state, actions)).toBeFalsy()
  expect(render).not.toBeCalled()
})

test("Route returns result of render prop if it exactly matches to current location", () => {
  expect.assertions(3)
  const state = { location: { pathname: "/users" } }
  const actions = {}
  const render = jest.fn(({ match }) => {
    expect(match.isExact).toBe(true)
    return "result"
  })
  expect(Route({ path: "/users", render }, [])(state, actions)).toEqual(
    "result"
  )
  expect(render).toBeCalled()
})

test("Route returns result of render prop if it matches to current location", () => {
  expect.assertions(4)
  const state = { location: { pathname: "/users/1" } }
  const actions = {}
  const render = jest.fn(({ match }) => {
    expect(match.isExact).toBe(false)
    expect(match.params).toEqual({ id: "1" })
    return "result"
  })
  expect(Route({ path: "/users/:id", render }, [])(state, actions)).toEqual(
    "result"
  )
  expect(render).toBeCalled()
})

test("Route without path prop matches to every location", () => {
  const render = () => true
  expect(Route({ render }, [])({ location: { pathname: "/" } })).toBe(true)
  expect(Route({ render }, [])({ location: { pathname: "/users" } })).toBe(true)
})
