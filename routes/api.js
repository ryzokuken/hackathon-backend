const express = require('express');
const router = express.Router();

const Domain = require('../models/Domain');
Domain.methods(['get', 'put', 'post', 'delete']);
Domain.register(router, '/domains');

// const Post = require('../models/Post');
// Post.methods(['get', 'put', 'post', 'delete']);
// Post.register(router, '/post');

module.exports = router;