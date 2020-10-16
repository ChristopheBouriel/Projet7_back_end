const express = require('express');
const router = express.Router();


const moderateCtrl = require('../controllers/moderate');

router.post('/publication', moderateCtrl.moderatePublication);
router.post('/comment', moderateCtrl.moderateComment);

module.exports = router;