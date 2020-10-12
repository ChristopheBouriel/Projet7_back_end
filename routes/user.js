const express = require('express');
const router = express.Router();

const accessCheck = require('../middleware/rateLimit');
const userCtrl = require('../controllers/user');

router.post('/signup', accessCheck.accessCreateAccountLimiter, userCtrl.signup);
router.post('/login', accessCheck.accessCreateAccountLimiter, userCtrl.login);
router.get('/list', accessCheck.seeProfileLimiter, userCtrl.getAllUsers);
router.post('/changeP', accessCheck.accessCreateAccountLimiter, userCtrl.modifyPassword);
router.post('/changeU', accessCheck.accessCreateAccountLimiter, userCtrl.modifyUserName);


module.exports = router;