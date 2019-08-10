const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes');

mongoose.connect('mongodb+srv://michaelfidelis:minhaSuperSenha@cluster0-ianm0.mongodb.net/oministack08?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

const server = express();
server.use(cors());
server.use(morgan('dev'))
server.use(express.json());
server.use(routes);
server.listen(3333);