const faculty = require('express').Router();

faculty.get('/one', (req, res) => {
    res.send('Routing working');
})

module.exports = faculty;