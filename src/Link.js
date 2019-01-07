import { h } from 'hyperapp'
import { location } from './index'

const onClick = (state, link, e) => {
  const { pathname } = state.location
  if(!(
    e.defaultPrevented ||
    e.button !== 0 ||
    e.altKey ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.target.getAttribute('target') === '_blank'
  )){
    e.preventDefault()
    return link.to !== pathname
      ? [location, link.to] : state
  } else return state
}

export const Link = (props, children) => {
  props.onClick = props.onClick || [ onClick, props ]
  props.href = props.to
  return h('a', props, children)
}