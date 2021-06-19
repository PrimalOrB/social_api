const { Schema, model } = require( 'mongoose' );
const dateFormat = require( '../utils/dateFormat' );

const ThoughtSchema = new Schema(
    {
        throughText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            createdAt: {
                type: Date,
                default: Date.now,
                get: createdAtVal => dateFormat( createdAtVal )
            },
        },
        username: {
            type: String,
            required: true
        },
        replies: []
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    }
);

ThoughtSchema.virtual( 'reactionCount' ).get( function() {
    return this.replies.length;
} );


const Thought = model( 'Thought', ThoughtSchema );

module.exports = Thought;