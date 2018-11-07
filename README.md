<p align="center"><img width="100" src="https://raw.githubusercontent.com/excaliburhan/xp-storage/master/logo.png" alt="logo"></p>

# xp-storage
A lib for html5 localStorage, support expired time.

## Installation

> npm i xp-storage --save

## Usage

```js
import { LStorage } from 'xp-storage'

LStorage.set('name', 'xp', '2018-11-11 23:59:59') // localStorage['xp_name'] = 'xp'

// or with custom prefix
import Storage from 'xp-storage'
const LStorage = new Storage({ prefix: 'sheep' })
LStorage.set('name', 'xp', '2018-11-11 23:59:59') // localStorage['sheep_name'] = 'xp'
```

## API

### set(key, value, expired)
- set a key and return the value
- Example
```js
let name = LStorage.set('name', 'xp', '2018-11-11 23:59:59') // xp
```

### setWithSec(key, value, expired)
- set a key and expires with seconds
- Example
```js
let name = LStorage.setWithSec('name', 'xp', 3600) // xp, after 3600 seconds, key will be expired
```

### get(key)
- return the value of key, return null if it is undefined or expired
- Example
```js
LStorage.set('name1', 'xp')
LStorage.set('name2', 'xp2')
let name1 = LStorage.get('name1') // xp
let name2 = LStorage.get('name2') // null
```

### remove(key)
- remove a key and return the value of removed key, return null if it is undefined
- Example
```js
LStorage.remove('name') // xp
```

### keys()
- get all keys in LStorage, note that expired keys will also be listed
- Example
```js
let keys = LStorage.keys()
```

### length()
- return the length of all keys in LStorage
- Example
```js
let len = LStorage.length()
```

### forEach(callback)
- loop all keys in LStorage and callback
- Example
```js
LStorage.forEach((k, v) => {
  console.log(k, v)
})
```

### clear()
- remove all keys in LStorage
- Example
```js
LStorage.clear()
```

### getAll()
- get all key and value in LStorage
- Example
```js
LStorage.set('name1', 'xp')
LStorage.set('name2', 'xp2')
let names = LStorage.getAll() // Object { 'xp-name1': "xp", 'xp-name2': "xp2" }
```

### has()
- return true if the key is defined, otherwise return false
- Example
```js
LStorage.set('name1', 'xp')
LStorage.has('name1') // true
LStorage.has('name2') // false
```
