const router = require('express').Router();

const userController=require('../controller/UserController');

const {protected}=require('../middleware/protected');

router.post('/login', userController.login);


router.post('/register'  , userController.register);


router.get('/home'  , protected, userController.getDetails);

module.exports = router;