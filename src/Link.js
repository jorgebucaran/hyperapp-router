import { h } from 'hyperapp'
import { location } from './location'

function onClick(state, link, e){
  if(
    e.defaultPrevented ||
    e.button !== 0 ||
    e.altKey ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.target.getAttribute("target") === "_blank" ||
    link.href === state.location.pathname
  ){
    return state
  } else {
    e.preventDefault()
    return location(state, link.href)
  }
}

export function Link(props, childrens){
  props.onClick = props.onClick || [ onClick, props ]
  props.href = props.to
  delete props.to
  return h('a', props, childrens)
}
