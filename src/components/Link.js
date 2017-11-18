import { h } from 'hyperapp'

export const Link = ({ href = '#', target }, children) =>
  h(
    'a',
    {
      href,
      target,
      onclick: e => {
        if (
          !e.metaKey &&
          !e.altKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          target !== '_blank'
        ) {
          location.pathname + location.search !== href &&
            history.pushState(null, null, href)
          e.preventDefault()
        }
      },
    },
    children
  )
