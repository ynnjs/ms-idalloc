const request = require( 'supertest' );
const Console = require( 'ynn' ).Console;
const app = require( '../src' );

app.debugging = Console.WARN | Console.ERROR;

describe( 'flake', () => {
    const ids = new Set();

    afterAll( () => {
        expect( ids.size ).toEqual( 100 );
    } );

    for( let i = 0; i < 100; i += 1 ) {
        it( 'basic ' + i, done => {
            request( app.listen() ).get( '/flake' )
                .expect( 200 )
                .expect( res => {
                    expect( /^\d+$/.test( res.body.id ) ).toBeTruthy();
                } )
                .end( ( err, res ) => {
                    if( err ) {
                        done.fail( err );
                        return;
                    }
                    ids.add( res );
                    done() 
                } );
        } );
    }

    it( 'hex', done => {
        request( app.listen() ).get( '/flake?format=hex' )
            .expect( 200 )
            .expect( res => {
                expect( /^[a-z0-9]+$/.test( res.body.id ) ).toBeTruthy();
            } )
            .end( err => err ? done.fail( err ) : done() );
    } );
} );

