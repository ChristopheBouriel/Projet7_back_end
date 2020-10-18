const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const userCtrl = require('../controllers/user');
const profileValidator = require('../middleware/profile-Validator');
const userNameValidator = require('../middleware/userName-Validator');
const auth = require('../middleware/auth');
//const checkId = require('../middleware/checkIdDeleteAccount');

router.post('/signup', accessCheck.accessCreateAccountLimiter, userNameValidator, profileValidator, userCtrl.testU);
router.post('/login', accessCheck.accessCreateAccountLimiter, userCtrl.login);
router.get('/list', accessCheck.seeProfileLimiter, userCtrl.getAllUsers);

router.put('/changeP', accessCheck.accessCreateAccountLimiter, auth, userCtrl.modifyPassword);
router.put('/changeU', accessCheck.accessCreateAccountLimiter,auth, userNameValidator, userCtrl.testU);
router.post('/deleteU', accessCheck.deleteAccountLimiter, auth,  userCtrl.deleteUserAccount);
router.put('/logout', auth, userCtrl.logoutDate);

module.exports = router;