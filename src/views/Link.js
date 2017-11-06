import { h } from 'hyperapp'

export const Link = ({ to = '#' }, children) =>
  h(
    'a',
    {
      href: to,
      onclick: e => {
        // Prevent the page from reloading
        e.preventDefault()
        // Don't navigate to the same location
        location.pathname + location.search !== to &&
          history.pushState(null, null, to)
      },
    },
    children
  )
