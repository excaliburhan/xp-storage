'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  set: function set(key, value) {
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
    return this.get(key);
  },
  get: function get(key) {
    if (key) {
      var value = localStorage.getItem(key) || undefined;
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        return value || undefined;
      }
    } else {
      var ret = {};
      this.forEach(function (key, value) {
        ret[key] = value;
      });
      return ret;
    }
  },
  remove: function remove(key) {
    localStorage.removeItem(key);
    return this.get(key);
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