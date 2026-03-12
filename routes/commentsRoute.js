const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const protect = require('../middleware/protect');

router.get('/:videoId', commentController.getCommentsForVideo);
router.post('/:videoId', protect, commentController.createComment);
module.exports = router;