import { Link } from "../src"

test('Link passes given attributes except "to" and "location" to underlying element', () => {
  const vnode = Link({ to: "/path", pass: "through", location })({}, {})
  expect(vnode.attributes.to).toBeUndefined()
  expect(vnode.attributes.location).toBeUndefined()
  expect(vnode.attributes.href).toEqual("/path")
  expect(vnode.attributes.pass).toEqual("through")
})

test("Calling onclick of VNode transparently calls Link's onclick prop", () => {
  const onclickProp = jest.fn()
  const vnode = Link({ onclick: onclickProp })({}, {})
  const event = new Object()
  expect(vnode.attributes.onclick).not.toBe(onclickProp)
  vnode.attributes.onclick(event)
  expect(onclickProp).toBeCalledWith(event)
})
