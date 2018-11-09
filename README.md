# ynn-ms-idalloc

Ynn micro-service module for ID allocation. Supported FlakeID and UUID.

 [![Build Status](https://travis-ci.com/ynnjs/ynn-ms-idalloc.svg?branch=master)](https://travis-ci.com/ynnjs/ynn-ms-idalloc)
 [![Coverage Status](https://img.shields.io/codecov/c/github/ynnjs/ynn-ms-idalloc.svg?style=flat)](https://codecov.io/gh/ynnjs/ynn-ms-idalloc)
 [![Node Version](https://img.shields.io/node/v/ynn-ms-idalloc.svg)](https://nodejs.org)
 [![License](https://img.shields.io/npm/l/ynn-ms-idalloc.svg)](https://en.wikipedia.org/wiki/MIT_License)
 [![NPM Version](https://img.shields.io/npm/v/ynn-ms-idalloc.svg)](https://www.npmjs.com/package/ynn-ms-idalloc)
 [![NPM Download](https://img.shields.io/npm/dw/ynn-ms-idalloc.svg)](https://www.npmjs.com/package/ynn-ms-idalloc) [![Greenkeeper badge](https://badges.greenkeeper.io/ynnjs/ynn-ms-idalloc.svg)](https://greenkeeper.io/)

## Installation

```bash
$ npm install ynn-ms-idalloc --save
```

## Usage

### Starting as a indenpent service

```bash
$ npx ynn-ms-idalloc --port=3000
```

### Using as a module

```js
const Ynn = require( 'ynn' );
const app = new Ynn( {
    root : __dirname,
    modules : {
        id : {
            path : 'ynn-ms-idalloc',
            config : { }
        }
    }
} );
```

### Configuration items

**flake** `Object` 

 - datacenter (5 bit) - datacenter identifier. It can have values from 0 to 31.
 - worker (5 bit) - worker identifier. It can have values from 0 to 31.
 - id (10 bit) - gnerator identifier. It can have values from 0 to 1023. It can be provided instead of datacenter and worker identifiers.
 - epoch - number used to reduce value of a generated timestamp. Note that this number should not exceed number of milliseconds elapsed since 1 January 1970 00:00:00 UTC. It can be used to generate smaller ids.

Generating SnowFlake ID is using [https://github.com/T-PWK/flake-idgen](https://github.com/T-PWK/flake-idgen) package.

### API

#### /flake

To generate a SnowFlake ID.


#### /uuid/v1

To generate UUID version 1

#### /uuid/v3?name={name}&namespace={namespace}

To generate UUID version 3

#### /uuid/v4

To generate UUID version 4

#### /uuid/v5?name={name}&namespace={namespace}

__Note__: While generating UUID v3 and v5, the namespace can be a pre-defined namespace name in [ dns, url, oid, x500 ] defind in [RFC4122](http://www.ietf.org/rfc/rfc4122.txt). For example:

```
/uuid/v5?name={name}&namespace=url
```

To generate UUID version 5
