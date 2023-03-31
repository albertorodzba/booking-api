const { Router }    = require('express');
const { check, }     = require('express-validator');

const { signIn } = require('../controllers')
const { validateFields } = require('../middlewares/');

const router = Router();


router.post( '/signin',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password Field is required').not().isEmpty(),
    validateFields
], signIn );

module.exports = router