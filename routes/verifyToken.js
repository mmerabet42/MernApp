const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ success: false, data: "Access denied" });
    
    try {
        const verified = jwt.verify(token, env.JWT_SECRET);
        if (!(req.user = await User.findById(verified._id)))
            throw 'No user found';
        next();
    } catch(err) {
        res.status(400).json({ success: false, data: "Access denied" });
    }
};