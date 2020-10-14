const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const commentCtrl = require('../controllers/comment');
const contentValidator = require('../middleware/content-validator');

router.post('', accessCheck.getContentLimiter, commentCtrl.getAllComments);
router.post('/add', accessCheck.sendContentLimiter, contentValidator, commentCtrl.addComment);
router.post('/delete', accessCheck.deleteContentLimiter, commentCtrl.deleteComment);
router.put('/modify', accessCheck.sendContentLimiter, contentValidator, commentCtrl.modifyComment);

module.exports = router;