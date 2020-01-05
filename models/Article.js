const mongoose = require('mongoose');

const Article = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        username: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Article', Article);