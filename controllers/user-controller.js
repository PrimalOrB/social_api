const { User } = require( '../models' )

const userController = {
    getUsers( req, res ) {
        User.find( {} )
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
}

module.exports = userController;