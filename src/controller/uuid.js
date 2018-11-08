const uuid = {
    v1 : require( 'uuid/v1' ),
    v3 : require( 'uuid/v3' ),
    v4 : require( 'uuid/v4' ),
    v5 : require( 'uuid/v5' )
};

/**
 * predefined namespaces in rfc4122
 * http://www.ietf.org/rfc/rfc4122.txt
 */
const namespaces = {
    dns : '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    url : '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    oid : '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
    x500 : '6ba7b814-9dad-11d1-80b4-00c04fd430c8'
};

module.exports = class extends require( 'ynn' ).Controller {
    v14Action() {
        const ver = this.ctx.routerMatches[ 0 ];
        return { uuid : uuid[ ver ]() };
    }

    v35Action() {
        let { name, namespace } = this.ctx.query;
        const ver = this.ctx.routerMatches[ 0 ];

        this.assert( name, 400, 'name must have a value' );
        this.assert( namespace, 400, 'namespace must hava a value' );

        if( namespaces[ namespace ] ) {
            namespace = namespaces[ namespace ]; 
        }

        return { uuid : uuid[ ver ]( name, namespace ) };
    }

    nilAction() {
        return {
            uuid : '00000000-0000-0000-0000-000000000000'
        }
    }
}
