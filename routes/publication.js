const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const publicationCtrl = require('../controllers/publication');

const publicationValidator = require('../middleware/publication-validator');

router.get('/', accessCheck.getContentLimiter, publicationCtrl.getAllPublications);
router.get('/:id', accessCheck.getContentLimiter, publicationCtrl.getOnePublication);
router.post('/add', accessCheck.postLimiter, publicationValidator, publicationCtrl.addPublication);
router.put('/modify', accessCheck.postLimiter, publicationValidator, publicationCtrl.modifyPost);
router.post('/delete', accessCheck.postLimiter, publicationCtrl.deletePost);


module.exports = router;