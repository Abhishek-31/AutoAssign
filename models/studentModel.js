const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    CompletedAssignments: [
        {
            title: {
                type: String,
                required: true
            },
            question: {
                type: String
            },
            answer: {
                type: String
            }
        }
    ]
});

var Student = mongoose.model("StudentModel", studentSchema);

module.exports = { Student }