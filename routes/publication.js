const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const publicationCtrl = require('../controllers/publication');

router.get('/', accessCheck.getContentLimiter, publicationCtrl.getAllPublications);
router.get('/:id', accessCheck.getContentLimiter, publicationCtrl.getOnePublication);


module.exports = router;