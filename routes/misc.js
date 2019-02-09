const misc = require('express').Router();

misc.get('/one', (req, res) => {
    res.send('Routing working');
})

module.exports = misc;