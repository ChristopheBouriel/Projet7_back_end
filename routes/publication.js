const express = require('express');
const router = express.Router();

//const accessCheck = require('../middleware/rateLimit');
const publicationCtrl = require('../controllers/publication');

router.get('/', publicationCtrl.getAllPublications);


module.exports = router;