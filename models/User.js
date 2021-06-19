const { Schema, model } = require( 'mongoose' );

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [ 'Username required' ],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [ 'Email required' ],
            match: [ /.+\@.+\..+/, "Must be valid email syntax" ]
        },
        thoughts: [],
        friends: []
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

UserSchema.virtual( 'friendCount' ).get( function() {
    return this.friends.length;
} );

const User = model( 'User', UserSchema );

module.exports = User;