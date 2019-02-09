const student = require('express').Router();

student.get('/one', (req, res) => {
    res.send('Routing working');
})

module.exports = student;