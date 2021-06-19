const router = require( 'express' ).Router();
const {
    addUser,
    getUsers,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require( '../../controllers/user-controller' );

router
    .route( '/' )
    .get( getUsers )
    .post( addUser );

router
    .route( '/:id' )
    .get( getOneUser )
    .put( updateUser )
    .delete( deleteUser )

router 
    .route( '/:id/friends/:friendId' )
    .post( addFriend )
    .delete( removeFriend )    

module.exports = router;