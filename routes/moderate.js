const express = require('express');
const router = express.Router();


const moderateCtrl = require('../controllers/moderate');
const auth = require('../middleware/auth');

router.post('/publication', auth, moderateCtrl.moderatePublication);
router.post('/comment', auth, moderateCtrl.moderateComment);

module.exports = router;