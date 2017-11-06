export const Switch = children =>
  children.reduce((a, b) => (b && !a.length ? a.concat(b) : a), [])
