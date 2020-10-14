const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const profileCtrl = require('../controllers/profile');
const profileValidator = require('../middleware/profile-Validator');

router.get('/:userName', accessCheck.seeProfileLimiter, profileCtrl.seeProfile);
router.post('/modify', accessCheck.seeProfileLimiter, profileValidator, profileCtrl.modifyProfile);

module.exports = router;