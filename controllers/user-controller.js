const { User } = require( '../models' )

const userController = {
    getUsers( req, res ) {
        User.find( {} )
        .populate( 'user' )
        .select( '-__v' )
        .then( dbUserData => res.json( dbUserData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

    getOneUser( { params }, res ) {
        User.findById( params.id )
        .populate( 'user' )
        .select( '-__v' )
        .then( dbUserData => res.json( dbUserData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },


    addUser( { body }, res ){
        User.create( body )
        .then( dbUserData => res.json( dbUserData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

    updateUser( { body, params }, res ){
        User.findByIdAndUpdate( 
            params.id, 
            body, 
            { 
                new: true, 
                runValidators: true 
            } 
        )
        .then( dbUserData => {
            if( !dbUserData ){
                res.status( 404 ).json( { message: 'No user found with this id!' } )
            }
            res.json( dbUserData )
        } )
        .catch( err => res.status( 400 ).json( err ) )
    },

    deleteUser( { params }, res ){
        User.findByIdAndDelete( params.id )
        .then( dbUserData => {
            if( !dbUserData ){
                res.status( 404 ).json( { message: 'No user found with this id!' } )
            }
            res.json( dbUserData )
        } )
        .catch( err => res.status( 400 ).json( err ) )
    },

    addFriend( {params}, res ){
        User.findByIdAndUpdate(
            params.id,
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        ) 
        .then( dbUserData => {
            if( !dbUserData ){
                res.status( 404 ).json( { message: 'No user found with this id!' } )
            }
            // confirm name of original user
            const username = dbUserData.username
            // add the original user to the friend id list as well
            User.findByIdAndUpdate(
                params.friendId,
                { $push: { friends: params.id } },
                { new: true, runValidators: true }
            ) 
            .then( dbUserData => {
                if( !dbUserData ){
                    res.status( 404 ).json( { message: 'No user found with this id!' } )
                }
                // confirm the name of the friend user
                const friend = dbUserData.username
                res.json( `${ username } and ${ friend } are now friends` )
            } )
            .catch( err => res.status( 400 ).json( err ) )
        } )
        .catch( err => res.status( 400 ).json( err ) )
    },

    removeFriend( { params }, res ){
        User.findByIdAndUpdate(
            params.id,
            { $pull: { friends: params.friendId } },
            { new: true }
        ) 
        .then( dbUserData => {
            if( !dbUserData ){
                res.status( 404 ).json( { message: 'No user found with this id!' } )
            }
            // confirm name of original user
            const username = dbUserData.username
            // remove the original user from the friend id list as well
            User.findByIdAndUpdate(
                params.friendId,
                { $pull: { friends: params.id } },
                { new: true }
            ) 
            .then( dbUserData => {
                if( !dbUserData ){
                    res.status( 404 ).json( { message: 'No user found with this id!' } )
                }
                // confirm the name of the friend user
                const friend = dbUserData.username
                res.json( `${ username } and ${ friend } are no longer friends` )
            } )
            .catch( err => res.status( 400 ).json( err ) )
        } )
        .catch( err => res.status( 400 ).json( err ) )
    },
}

module.exports = userController;