import { location, Route } from './index'

const fake = () => () => {}
export const Redirect = (props) => {
  const { from, to } = props
  const render = typeof to === 'function' ? to : () => to
  const match = Route({...props, path: from, render })
  return { effect: match ? (props, dispatch) => {
    dispatch([location, match])
    return () => {}
  } : fake }
}