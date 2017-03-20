# xp-storage
A tiny lib for html5 localStorage

## Installation

> npm i xp-storage --save

## Usage

```js
import store from 'xp-storage'
// var store = require('xp-storage').default

store.set('test', 'abc')
let test = store.get('test')
console.log(test) // abc
```

## API

### set(key, value)
- set a key and return the set value
- Example
```js
let name = store.set('name', 'xp') // xp
```

### get(key)
- return the value of key, return undefined if it is not defined; get() = getAll()
- Example
```js
store.set('name1', 'xp')
store.set('name2', 'xp2')
let name1 = store.get('name1') // xp
let name2 = store.get('name3') // undefined
let names = store.get() // Object {name1: "xp", name2: "xp2"}
```

### remove(key)
- remove a key and return the value of removed key, return undefined if it is not defined
- Example
```js
store.remove('name') // xp
```

### clear()
- remove all keys
- Example
```js
store.clear()
```

### length()
- get the length of keys
- Example
```js
store.set('name', 'xp')
let len = store.length() // 1
```

### forEach(callback)
- foreach all keys with callbacks
- Example
```js
store.set('name', 'xp')
store.set('obj', { a: 1 })
store.forEach((key, value) => {
  console.log(key, value)
})
// name, xp
// obj, Object {a: 1}
```
### getAll()
- return all keys and values
- Example
```js
store.set('name1', 'xp')
store.set('name2', 'xp2')
let names = store.getAll() // Object {name1: "xp", name2: "xp2"}
```

### keys()
- reurn all keys
- Example
```js
store.set('name1', 'xp')
store.set('name2', 'xp2')
let names = store.keys() // ["name1", "name2"]
```

### has()
- return true if the key is defined, otherwise return false
- Example
```js
store.set('name1', 'xp')
store.has('name1') // true
store.has('name3') // false
```
