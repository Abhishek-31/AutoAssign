const mongoose = require('mongoose');

var facultySchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    assignments: [
        {
            branch: {
                type: String,
                required: true
            },
            title: {
                type: String, 
                required: true
            },
            description: {
                type: String
            },
            date: {
                type: Date
            },
            sampleInput: {
                type: String
            },
            sampleOutput: {
                type: String
            }            
        }
    ]
});

var facultyModel = mongoose.model('facultyModel', facultySchema);

module.exports = { facultyModel };