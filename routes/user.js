const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const verifyToken = require('./verifyToken');

const validator = require('../validators');
const User = require('../models/User');
const router = require('express').Router();

router.get('/get', async (req, res) => {
    
    console.log("/get");
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch(err) {
        console.log(err);
        res.json({ succes: false, data: "Can't get all users" });
    }
});

router.post('/register', async (req, res) => {
    
    console.log("/register");
    const data = validator('registration', req.body);
    if (data.error)
        return res.json({ success: false, data: data.error} );

    const userExits = await User.findOne({ username: req.body.username });
    if (userExits)
        return res.json({ success: false, data: 'Username already exist' });

    const user = new User({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    });

    try {
        const savedUser = await user.save()
        res.json({ success: true, data: savedUser });
    } catch(err) {
        res.son({ success: false, data: err });
    }
});

router.post('/login', async (req, res) => {

    console.log("/login");
    const user = await User.findOne({ username: req.body.username });
    if (!user)
        return res.json({ success: false, data: "Username is wrong"});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.json({ success: false, data: "Password is wrong" });

    const token = jwt.sign({ _id: user._id }, env.JWT_SECRET);

    res.header('auth-token', token).json({ success: true, data: token });
});

router.delete("/delete", verifyToken, async (req, res) => {
    
    console.log("/delete");
    const result = await User.deleteOne({ _id: req.user._id });

    if (result.deletedCount === 0) 
        return res.json({ success: false, data: "User not deleted" });  
    res.json({ success: true, data: "User has been deleted" });
});

module.exports = router;