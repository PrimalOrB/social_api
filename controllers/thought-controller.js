const { Thought, User } = require( '../models' )

const thoughtController = {
    getThoughts( req, res ) {
        Thought.find( {} )
        .then( dbThoughtData => res.json( dbThoughtData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

    getThoughtId( { params }, res ) {
        Thought.findById( params.id )
        .then( dbThoughtData => res.json( dbThoughtData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

    addThought( { body }, res ){
        Thought.create( body )
        // .then( dbThoughtData => res.json( dbThoughtData ) )
        .then( dbThoughtData => {
            User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: dbThoughtData.id } },
                { new: true, runValidators: true }
            )
            .then( dbUserData => {
                if( !dbUserData ){
                    res.status( 404 ).json( { message: 'No user found with this id!' } )
                }
                res.json( dbUserData )
            } )
            .catch( err => res.status( 400 ).json( err ) ) 
        })
        .catch( err => res.status( 400 ).json( err ) )
    },

    updateThought( { body }, res )

}

module.exports = thoughtController;