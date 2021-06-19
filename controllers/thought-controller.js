const { Thought } = require( '../models' )

const thoughtController = {
    getThoughts( req, res ) {
        Thought.find( {} )
        .then( dbThoughtData => res.json( dbThoughtData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

    addThought( { body }, res ){
        Thought.create( body )
        .then( dbThoughtData => res.json( dbThoughtData ) )
        .catch( err => res.status( 400 ).json( err ) )
    },

}

module.exports = thoughtController;