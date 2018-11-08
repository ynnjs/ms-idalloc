const Ynn = require( 'ynn' );
const request = require( 'supertest' );
const app = require( '../src' );

app.debugging = Ynn.DEBUGGING_WARN| Ynn.DEBUGGING_ERROR;

describe( 'Flake ID', () => {
    beforeAll( () => app.ready() );
    it( 'should generate the flake id', done => {
        request( app.listen() ).get( '/flake' )
            .expect( 200 )
            .expect( res => {
                expect( res.body.id ).toMatch( /^\d+$/ );
            } )
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'should be formatted as hex string', done => {
        request( app.listen() ).get( '/flake?format=hex' )
            .expect( 200 )
            .expect( res => {
                expect( res.body.id ).toMatch( /^[a-z0-9]+$/ );
            } )
            .end( err => err ? done.fail( err ) : done() );
    } );

    it( 'should respond 500 while using unsupported format', done => {
        request( app.listen() ).get( '/flake?format=unsupported' )
            .expect( 400 )
            .end( done )
    } );
} );
