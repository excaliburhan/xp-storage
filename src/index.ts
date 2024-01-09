import { ConfigInterface } from './interface';
import { getTimestamp, isExpired } from './utils';

export default class Storage {
  private prefix: string;
  private expiredExt: string;
  private ls;
  constructor({ prefix = 'xp' } = {} as ConfigInterface) {
    this.ls = window.localStorage;
    this.prefix = `${prefix}_`;
    this.expiredExt = `__expired__`;
  }

  private getStoreKey(key) {
    return `${this.prefix}${key}`;
  }
  private getExpiredKey(key) {
    return `${this.prefix}${key}${this.expiredExt}`;
  }

  set(key, value, expired?) {
    try {
      if (value == null) {
        value = null;
      }
      this.ls[this.getStoreKey(key)] = JSON.stringify(value);
      let expiredStamp = getTimestamp(expired);
      if (expired && expiredStamp) {
        this.ls[this.getExpiredKey(key)] = expiredStamp;
      }
    } catch (e) {
      value = null;
    }
    return value;
  }

  setWithSec(key, value, sec) {
    if (typeof sec === 'number') {
      return this.set(key, value, Date.now() + sec * 1000);
    }
    return this.set(key, value);
  }

  get(key) {
    let ret = null;
    try {
      let expiredStamp = this.ls[this.getExpiredKey(key)] || Date.now() + 1000;
      if (isExpired(expiredStamp)) {
        this.remove(key);
        return null;
      }
      ret = JSON.parse(this.ls[this.getStoreKey(key)]);
    } catch (e) {}
    return ret;
  }

  remove(key) {
    let ret = null;
    try {
      ret = this.ls[this.getStoreKey(key)];
      delete this.ls[this.getStoreKey(key)];
      delete this.ls[this.getExpiredKey(key)];
    } catch (e) {}
    return ret;
  }

  keys() {
    let ret: any[] = [];
    const len = this.ls.length;
    for (let i = 0; i < len; i++) {
      let key = this.ls.key(i);
      // match prefix and not match expiredExt
      if (key.indexOf(this.prefix) > -1 && key.indexOf(this.expiredExt) === -1) {
        let cleanKey = key.replace(this.prefix, '');
        ret.push(cleanKey);
      }
    }
    return ret;
  }

  length() {
    return this.keys().length;
  }

  forEach(callback) {
    if (typeof callback !== 'function') return;
    let keys = this.keys();
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      let key = keys[i];
      let value = this.get(key);
      callback(key, value);
    }
  }

  clear() {
    try {
      this.forEach((k, v) => {
        this.remove(k);
      });
    } catch (e) {}
  }

  getAll() {
    const ret = {};
    this.forEach((k, v) => {
      ret[k] = v;
    });
    return ret;
  }

  has(key) {
    let keys = this.keys();
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      if (key === keys[i]) {
        return true;
      }
    }
    return false;
  }
}

const LStorage = new Storage();
export { LStorage };
