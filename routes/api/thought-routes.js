const router = require( 'express' ).Router();
const {
    addThought,
    getThoughts,
    getThoughtId
} = require( '../../controllers/thought-controller' );

router
    .route( '/' )
    .get( getThoughts )
    .post( addThought );

router
    .route( '/:id' )
    .get( getThoughtId )    

module.exports = router;