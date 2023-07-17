// Create web server

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Comment = require('../models/comments');

// Create router object
const commentRouter = express.Router();

// Use body parser to parse body of request message which is formatted in JSON
commentRouter.use(bodyParser.json());

// Route '/'
commentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
// GET
.get(cors.cors, (req, res, next) => {
    Comment.find(req.query)
    .populate('author')
    .then((comments) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// POST
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // Check if user is admin
    if (req.user.admin) {
        // Create comment
        Comment.create(req.body)
        .then((comment) => {
            console.log('Comment created ', comment);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(comment);
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        // Create error
        err = new Error('You are not authorized to create a comment!');
        err.status = 403;
        return next(err);
    }
})
// PUT
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // Create error
    err = new Error('PUT operation not supported on /comments/');
    err.status = 403;
    return next(err);
})
// DELETE
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    // Check if user is admin
    if (req.user.admin) {
        // Delete all comments
        Comment.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp); 
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        // Create error
        err = new Error('You are not authorized to delete all comments!');
        err.status = 403;
        return next(err);
    }
}
);

