// create web server with express
const express = require('express');
const app = express();

// create a router to handle routes
const router = express.Router();

// import our controller
const commentsController = require('../controllers/commentsController');

// handle GET request at /comments
router.get('/', commentsController.comments);

// handle POST request at /comments
router.post('/', commentsController.postComment);

// handle GET request at /comments/:commentId
router.get('/:commentId', commentsController.comment);

// handle PUT request at /comments/:commentId
router.put('/:commentId', commentsController.putComment);

// handle DELETE request at /comments/:commentId
router.delete('/:commentId', commentsController.deleteComment);

// export router
module.exports = router;
