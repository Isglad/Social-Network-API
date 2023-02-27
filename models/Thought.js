const { Schema, Types, model } = require('mongoose')
// import moment module to format the timestamp
const moment = require('moment')

// reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => moment(time).format("MMM DD, YYYY [at] hh:mm a"),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

// thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => moment(time).format("MMM DD, YYYY [at] hh:mm a"),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

ThoughtSchema
    // creating virtual
    .virtual('reactionCount')
    // Getter
    .get(function() {
        // retrieving the length of the user's friends
        return this.reactions.length
    });

// create the Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema)

module.exports = Thought