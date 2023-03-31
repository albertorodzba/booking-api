
const { Router } = require('express');

const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.post('/', [
    validateJWT
] ,(req, res) =>{

    res.json({ ok: true });
});

module.exports = router;