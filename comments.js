// Create web server

// Import modules
const express = require('express');
const router = express.Router();

// Import controller
const commentController = require('../controllers/commentController');

// Import middleware
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// Routes
// api/comments
router.post(
    '/',
    auth,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('comment', 'Comment is required').not().isEmpty(),
        check('comment', 'Comment must be at least 5 characters').isLength({
            min: 5
        })
    ],
    commentController.createComment
);

router.get('/', auth, commentController.getComments);

router.put('/:id', auth, commentController.updateComment);

router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;