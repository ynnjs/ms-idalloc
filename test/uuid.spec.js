const Ynn = require( 'ynn' );
const request = require( 'supertest' );
const iu = require( 'is-uuid' );
const app = require( '../src' );

app.debugging = Ynn.DEBUGGING_WARN| Ynn.DEBUGGING_ERROR;

describe( 'UUID', () => {

    beforeAll( () => app.ready() );
    
    it( 'v1', done => {
        request( app.listen() ).get( '/uuid/v1' )
            .expect( 200 )
            .expect( res => {
                expect( iu.v1( res.body.uuid ) ).toBeTruthy();
            } )
            .end( done );
    } );

    describe( 'v3', () => {
        
        it( 'should respone 400 if name is empty', done => {
            request( app.listen() ).get( '/uuid/v3?namespace=url' )
                .expect( 400 )
                .end( done );
        } );

        it( 'should respone 400 if namespace is empty', done => {
            request( app.listen() ).get( '/uuid/v3?name=x' )
                .expect( 400 )
                .end( done );
        } );

        it( 'should use URL as the namespace', done => {
            request( app.listen() ).get( '/uuid/v3?name=x&namespace=url' )
                .expect( 200 )
                .expect( res => {
                    expect( iu.v3( res.body.uuid ) ).toBeTruthy();
                } )
                .end( done );
        } );

        it( 'should use costomized namespace', done => {
            request( app.listen() ).get( '/uuid/v3?name=x&namespace=857b3f0a-a777-11e5-bf7f-feff819cdc9f' )
                .expect( 200 )
                .expect( res => {
                    expect( iu.v3( res.body.uuid ) ).toBeTruthy();
                } )
                .end( done );
        } );

    } );

    it( 'v4', done => {
        request( app.listen() ).get( '/uuid/v4' )
            .expect( 200 )
            .expect( res => {
                expect( iu.v4( res.body.uuid ) ).toBeTruthy();
            } )
            .end( done );
    } );

    describe( 'v5', () => {
        
        it( 'should respone 400 if name is empty', done => {
            request( app.listen() ).get( '/uuid/v5?namespace=url' )
                .expect( 400 )
                .end( done );
        } );

        it( 'should respone 400 if namespace is empty', done => {
            request( app.listen() ).get( '/uuid/v5?name=x' )
                .expect( 400 )
                .end( done );
        } );

        it( 'should use URL as the namespace', done => {
            request( app.listen() ).get( '/uuid/v5?name=x&namespace=url' )
                .expect( 200 )
                .expect( res => {
                    expect( iu.v5( res.body.uuid ) ).toBeTruthy();
                } )
                .end( done );
        } );

        it( 'should use costomized namespace', done => {
            request( app.listen() ).get( '/uuid/v5?name=x&namespace=857b3f0a-a777-11e5-bf7f-feff819cdc9f' )
                .expect( 200 )
                .expect( res => {
                    expect( iu.v5( res.body.uuid ) ).toBeTruthy();
                } )
                .end( done );
        } );

    } );



    it( 'nil', done => {
        request( app.listen() ).get( '/uuid/nil' )
            .expect( 200 )
            .expect( res => {
                expect( iu.nil( res.body.uuid ) ).toBeTruthy();
            } )
            .end( done );
    } );

} );
