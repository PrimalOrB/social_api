const router = require( 'express' ).Router();
const {
    addThought,
    getThoughts
} = require( '../../controllers/thought-controller' );

router
.route( '/' )
.get( getThoughts )
.post( addThought );

module.exports = router;