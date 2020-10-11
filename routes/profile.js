const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const profileCtrl = require('../controllers/profile');

router.get('/:userName', accessCheck.seeProfileLimiter, profileCtrl.seeProfile);
router.post('/modify', accessCheck.seeProfileLimiter, profileCtrl.modifyProfile);

module.exports = router;