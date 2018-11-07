export function isExpired(stamp) {
  return Date.now() > stamp
}

export function getTimestamp(stamp) {
  let ret
  if (typeof stamp === 'number') {
    return stamp
  }
  stamp = stamp.replace(/-|\./g, '/') // for ios
  ret = new Date(stamp)
  if (ret === 'Invalid Date') {
    return null
  }
  return ret
}
