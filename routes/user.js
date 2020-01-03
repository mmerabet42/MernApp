const mongoose = require('mongoose');
const User = require('../models/User');

const router = require('express').Router();

router.post('/register', async (req, res) => {

    const userExits = await User.findOne({ username: req.body.username });
    if (userExits)
        return res.send('Username already exists');

    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        const savedUser = await user.save()
        res.json(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', (req, res) => {
    res.send('login');
});

module.exports = router;