const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('./config/env');

const expressGraphql = require('express-graphql');
const graphql = require('graphql');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(`Failed to connect: ${err}`));

app.use('/api/user', require('./routes/user'));
app.use('/api/article', require('./routes/article'));

app.listen(env.PORT, () => console.log("Server connected"));