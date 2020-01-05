const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const tokenVerifier = require('./verifyToken');

const validator = require('../validators');
const User = require('../models/User');
const router = require('express').Router();

router.get('/get', async (req, res) => {

    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        console.log(err);
        res.send("Can't get all users");
    }
});

router.post('/register', async (req, res) => {
    
    const data = validator('registration', req.body);
    if (data.error)
        return res.status(400).json({ success: false, data: data.error} );

    const userExits = await User.findOne({ username: req.body.username });
    if (userExits)
        return res.status(400).json({ success: false, data: 'Username already exist' });

    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    });

    try {
        const savedUser = await user.save()
        res.json({ success: true, data: savedUser });
    } catch(err) {
        res.status(400).json({ success: false, data: err });
    }
});

router.post('/login', async (req, res) => {

    const user = await User.findOne({ username: req.body.username });
    if (!user)
        return res.status(400).json({ success: false, data: "Username is wrong"});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ success: false, data: "Password is wrong" });

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET);

    res.header('auth-token', token).json({ success: true, data: token });
});

router.delete("/delete", tokenVerifier, async (req, res) => {

    const result = await User.deleteOne({ _id: req.user._id });

    if (result.deletedCount !== 0)
        return res.send("User has been deleted");
    res.send("User not deleted");
});

module.exports = router;