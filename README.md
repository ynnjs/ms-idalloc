# ynn-ms-idalloc

Ynn micro-service module for ID allocation.

## Installation

```bash
$ npm install ynn-ms-idalloc --save
```

## Usage

### Starting a server

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
