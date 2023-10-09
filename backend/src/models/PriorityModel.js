const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')

const PrioritySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required field!'],
        unique: true,
        uniqueCaseInsensitive: true,
    },
    rank: {
        // Higher the rank Highest the priority (i.e. rank '1' has lower priority than rank '2')
        type: Number,
        required: [true, 'Rank is required field!'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
});

PrioritySchema.plugin(uniqueValidator, { message: "{VALUE} already exists." });

module.exports = mongoose.model('Priority', PrioritySchema);