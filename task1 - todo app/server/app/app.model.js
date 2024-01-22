const mongoose = require('mongoose');

const TodoSchemaDef = new mongoose.Schema({
    task: {
        type: String
    },
    assignedTo: {
        type: String
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "low"
    },
    status: {
        type: String,
        enum: ["assigned", "completed"],
        default: "assigned"
    },
    sortKey: {
        type: String,
        enum: ["a", "b"],
        default: "a"
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const TodoModel = mongoose.model("Todo", TodoSchemaDef);

module.exports = TodoModel