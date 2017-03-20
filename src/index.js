/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-20 02:07:07
 * @modify date 2017-03-20 02:07:07
 * @desc [common methods for html5 localStorage]
*/

export default {
  set(key, value) {
    value = JSON.stringify(value)
    localStorage.setItem(key, value)
  },
  get(key) {
    if (key) {
      let value = localStorage.getItem(key)
      try {
        return JSON.parse(localStorage.getItem(key))
      } catch (error) {
        return value || undefined
      }
    } else { // equal to getAll()
      let ret = {}
      this.forEach((key, value) => {
        ret[key] = value
      })
      return ret
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
  length() {
    return localStorage.length
  },
  forEach(callback) {
    if (typeof callback !== 'function') return
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i)
      let value = this.get(key)
      callback(key, value)
    }
  },
  getAll() {
    let ret = {}
    this.forEach((key, value) => {
      ret[key] = value
    })
    return ret
  },
  keys() {
    let ret = []
    this.forEach((key, value) => {
      ret.push(key)
    })
    return ret
  },
  has(key) {
    let keys = this.keys()
    for (let i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return true
      }
    }
    return false
  }
}
