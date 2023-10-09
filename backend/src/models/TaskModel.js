const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required field!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required field!'],
    },
    priority: {
        type: Schema.Types.ObjectId,
        required: [true, 'Priority is required field!'],
        ref: 'Priority'
    },
    deadline: {
        type: Date,
        required: [true, 'Deadline is required field!'],
    },
    status: {
        type: String,
        required: true,
        enum: ['Completed', 'Pending'],
        default: 'Pending',
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

module.exports = mongoose.model('Task', TaskSchema);