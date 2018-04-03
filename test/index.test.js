import { h, app } from "hyperapp"
import { Route, Link, Redirect, location } from "../src"

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms))
const click = e => e.dispatchEvent(new MouseEvent("click", { button: 0 }))

let state, actions, unsubscribe

beforeEach(() => {
  state = { location: location.state }
  actions = {
    location: location.actions,
    getLocation: () => state => state.location
  }
  unsubscribe = null
})

afterEach(() => {
  unsubscribe && unsubscribe()
})

test("Transition by location.go()", async done => {
  const spy = jest.fn()
  const view = () => <Route path="/test" render={spy} />
  const main = app(state, actions, view, document.body)
  unsubscribe = location.subscribe(main.location)
  await wait(0)
  expect(spy).not.toBeCalled()
  main.location.go("/test")
  await wait(0)
  expect(spy).toBeCalled()
  done()
})

test("Transition by clicking Link", async done => {
  const spy = jest.fn()
  const view = () => (
    <div>
      <Link to="/test" />
      <Route path="/test" render={spy} />
    </div>
  )
  const main = app(state, actions, view, document.body)
  unsubscribe = location.subscribe(main.location)
  await wait(0)
  expect(spy).not.toBeCalled()
  click(document.body.getElementsByTagName("a")[0])
  await wait(0)
  expect(spy).toBeCalled()
  // Clicking the same link again doesn't cause transition.
  const count = spy.mock.calls.length
  click(document.body.getElementsByTagName("a")[0])
  await wait(0)
  expect(spy).toHaveBeenCalledTimes(count)
  done()
})

test('Click Link with target="_blank"', async done => {
  const spy = jest.fn()
  const view = () => (
    <div>
      <Link to="/test" target="_blank" />
      <Route path="/test" render={spy} />
    </div>
  )
  const main = app(state, actions, view, document.body)
  unsubscribe = location.subscribe(main.location)
  await wait(0)
  click(document.body.getElementsByTagName("a")[0])
  await wait(0)
  expect(spy).not.toBeCalled()
  done()
})

test("Transition by clicking Link including non alphanumeric characters", async done => {
  const spy = jest.fn()
  const view = () => (
    <div>
      <Link to="/test/café" />
      <Route path="/test/:id" render={spy} />
    </div>
  )
  const main = app(state, actions, view, document.body)
  unsubscribe = location.subscribe(main.location)
  await wait(0)
  expect(spy).not.toBeCalled()
  click(document.body.getElementsByTagName("a")[0])
  await wait(0)
  expect(spy).toBeCalled()
  expect(spy.mock.calls[0][0].match.params).toEqual({ id: "café" })
  expect(main.getLocation().pathname).toEqual("/test/caf%C3%A9")
  done()
})

test("Transition by rendering Redirect", async done => {
  const spy = jest.fn()
  const view = () => (
    <div>
      <Route path="/test" render={() => <Redirect to="/somewhere" />} />
      <Route path="/somewhere" render={spy} />
    </div>
  )
  const main = app(state, actions, view, document.body)
  unsubscribe = location.subscribe(main.location)
  await wait(0)
  expect(spy).not.toBeCalled()
  main.location.go("/test")
  await wait(0)
  expect(spy).toBeCalled()
  done()
})
