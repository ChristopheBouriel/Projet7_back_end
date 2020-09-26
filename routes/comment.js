const express = require('express');
const router = express.Router();

//const accessCheck = require('../middleware/rateLimit');
const commentCtrl = require('../controllers/comment');

router.post('', commentCtrl.getAllComments);
router.post('/add', commentCtrl.addComment);
router.post('/delete', commentCtrl.deleteComment);

module.exports = router;