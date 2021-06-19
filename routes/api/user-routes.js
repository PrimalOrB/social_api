const router = require( 'express' ).Router();
const {
    addUser,
    getUsers,
    updateUser,
    deleteUser
} = require( '../../controllers/user-controller' );

router
    .route( '/' )
    .get( getUsers )
    .post( addUser );

router
    .route( '/:id' )
    .put( updateUser )
    .delete( deleteUser )

module.exports = router;