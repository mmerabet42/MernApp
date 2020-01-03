const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('./config/env');

const app = express();

app.use(bodyParser.json());

mongoose.connect(env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(`Failed to connect: ${err}`));

app.use('/api/user', require('./routes/user'));

app.listen(env.port, () => console.log("Server connected"));