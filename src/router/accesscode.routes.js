const { Router } = require('express');

const {
        validateJWT,
        isAdmin } = require('../middlewares');

const { 
        createAccesCode, 
        updateAccessCode, 
        deleteAccessCode } = require('../controllers');

const router = Router();

router.post('/',[
    validateJWT,
    isAdmin
] ,createAccesCode);

router.put('/', updateAccessCode);

router.delete('/', deleteAccessCode);

module.exports = router;