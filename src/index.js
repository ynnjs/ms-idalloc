#!/usr/bin/env node

const Ynn = require( 'ynn' );
const app = new Ynn( {
    root : __dirname,
    routers() {
        this.router.add( /^\/uuid\/(v[35])/, 'uuid.v35' );
        this.router.add( /^\/uuid\/(v[14])/, 'uuid.v14' );
    }
} );

module.parent || app.listen( Ynn.cargs.port );
module.exports = app;
