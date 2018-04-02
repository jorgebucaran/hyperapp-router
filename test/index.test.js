import { h, app } from "hyperapp"
import { Route, Link, Redirect, location } from "../src"

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms))

let state, actions, unsubscribe

beforeEach(() => {
  state = { location: location.state }
  actions = { location: location.actions }
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
  document.body
    .getElementsByTagName("a")[0]
    .dispatchEvent(new MouseEvent("click", { button: 0 }))
  await wait(0)
  expect(spy).toBeCalled()
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
