const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const profileCtrl = require('../controllers/profile');
const profileValidator = require('../middleware/profile-Validator');
const auth = require('../middleware/auth');

router.get('/:userName', accessCheck.seeProfileLimiter, profileCtrl.seeProfile);
router.put('/modify', accessCheck.seeProfileLimiter, auth, profileValidator, profileCtrl.modifyProfile);

module.exports = router;