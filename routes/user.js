const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const userCtrl = require('../controllers/user');
const profileValidator = require('../middleware/profile-Validator');
const userNameValidator = require('../middleware/userName-Validator');
const checkId = require('../middleware/checkIdDeleteAccount');

router.post('/signup', accessCheck.accessCreateAccountLimiter, userNameValidator, profileValidator, userCtrl.testU);
router.post('/login', accessCheck.accessCreateAccountLimiter, userCtrl.login);
router.get('/list', accessCheck.seeProfileLimiter, userCtrl.getAllUsers);
router.post('/changeP', accessCheck.accessCreateAccountLimiter, userCtrl.modifyPassword);
router.post('/changeU', accessCheck.accessCreateAccountLimiter, userNameValidator, userCtrl.testU);
router.post('/deleteU', accessCheck.deleteAccountLimiter,  userCtrl.deleteUserAccount);



module.exports = router;