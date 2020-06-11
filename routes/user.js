const {Router} = require('express');
const router = Router();

const userController = require('../controllers/userController');

router.get('/', userController.getSignup);
router.post('/signup', userController.createUser);

router.get('/login', userController.getLogin);
router.post('/login', userController.login);

router.get('/profile', userController.getProfile);

module.exports = router;