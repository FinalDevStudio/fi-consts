# Fi Consts
Simple constant management for your application.

## Installing

```sh
npm install --save fi-consts
```

## Usage

```js
const CONSTS = require('fi-consts');
```

### Loading
You must first load your constants with a valid `config` object:

```js
consts CONSTS = require('fi-consts');

CONSTS.load(config);

// CONSTS now has your constants!

```

### Configuration
The configuration `Object` must have the `basedir` property defined as a valid path `String`. The `debug` parameter is optional.

- **basedir**: This is required and must be a `String`. This must be the absolute path to where the consts are located.
- **debug**: This option can be a `Function` to log with or a `Boolean`. If `true` it'll use `console.log`.

#### Example configuration

```js
{

  debug = require('debug')('app:statics'),

  basedir: path.join(__dirname, 'consts'),

}
```

### Getting values
Suppose we have this folder structure for the constants:

```
consts
├── other
│   ├── embedded
│   │   └── values.json
│   └── values.json
└── roles.json
```

Once loaded, this module will cache all your constants data into memory. To obtain a value just navigate the object. Keep in mind that all constant properties are defined in UPPER_CASE:

```js
console.log(CONSTS.ROLES.USER); // => { VALUE: 'value1234', SLUG: 'ROLE.USER' };
console.log(CONSTS.ROLES.USER.SLUG); // => 'ROLE.USER'
console.log(CONSTS.ROLES.OTHER.EMBEDDED.VALUES); // => { VALUE_1: {...}, VALUE_2: {...}}
```
