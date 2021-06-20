const router = require( 'express' ).Router();
const {
    addThought,
    getThoughts,
    getThoughtId,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require( '../../controllers/thought-controller' );

router
    .route( '/' )
    .get( getThoughts )
    .post( addThought );

router
    .route( '/:id' )
    .get( getThoughtId ) 
    .put( updateThought )  
    .delete( deleteThought ) 

router
    .route( '/:id/reactions')
    .put( addReaction )
    
router
    .route( '/:id/reactions/:reactionId')
    .delete( deleteReaction )

module.exports = router;