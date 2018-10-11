const Flake = require( 'flake-idgen' );
const intformat = require( 'biguint-format' );

module.exports = class extends require( 'ynn' ).Controller {
    /**
     * to generate a flake id
     * @get {string} format - the format of the return value, supporting dec, bin, hex and oct. to get more information from https://github.com/T-PWK/biguint-format
     *
     * @resoponse {json} - {
     *     id : {string}
     * }
     */
    async indexAction() {
        const flake = new Flake( this.config( 'flake' ) );
        const { format = 'dec' } = this.ctx.query;

        let id;

        try {
           id = intformat( flake.next(), format ); 
        } catch( e ) {
            this.logger.error( 'failed to generate id with flake-idgen', {
                query : this.ctx.query,
                error : e
            } );
            this.throw( 500 );
        }
        return { id };
    }
}
