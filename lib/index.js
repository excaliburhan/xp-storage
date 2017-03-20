'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-20 02:07:07
 * @modify date 2017-03-20 02:07:07
 * @desc [common methods for html5 localStorage]
*/

exports.default = {
  set: function set(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  },
  get: function get(key) {
    if (key) {
      return JSON.parse(localStorage.getItem(key));
    } else {
      // equal to getAll()
      var ret = {};
      this.forEach(function (key, value) {
        ret[key] = value;
      });
      return ret;
    }
  },
  remove: function remove(key) {
    localStorage.removeItem(key);
  },
  clear: function clear() {
    localStorage.clear();
  },
  length: function length() {
    return localStorage.length;
  },
  forEach: function forEach(callback) {
    if (typeof callback !== 'function') return;
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var value = this.get(key);
      callback(key, value);
    }
  },
  getAll: function getAll() {
    var ret = {};
    this.forEach(function (key, value) {
      ret[key] = value;
    });
    return ret;
  },
  keys: function keys() {
    var ret = [];
    this.forEach(function (key, value) {
      ret.push(key);
    });
    return ret;
  },
  has: function has(key) {
    var keys = this.keys();
    for (var i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return true;
      }
    }
    return false;
  }
};