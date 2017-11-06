// Return the first truthy item in array
export const Switch = children =>
  children.reduce((a, b) => (b && !a.length ? a.concat(b) : a), [])
