//create web server with express
const express = require('express')
const router = express.Router()
//include the model (db connection)
const Comment = require('../models/comment')
//create the routes
//index
router.get('/', (req, res) => {
    Comment.find()
    .then((comments) => {
        res.render('comments/index', {
            comments: comments
        })
    })
    .catch((error) => {
        console.log(error)
    })
})
//new
router.get('/new', (req, res) => {
    res.render('comments/new', {
        comment: new Comment()
    })
})
//create
router.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    })
    comment.save()
    .then((comment) => {
        res.redirect('/comments')
    })
    .catch((error) => {
        console.log(error)
    })
})
//export the router
module.exports = router


