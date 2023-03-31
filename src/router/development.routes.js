const { Router } = require('express');

const { validateJWT, checkRole } = require('../middlewares');

const { createDevelopment, 
        getDevelopment, 
        getDevelopments, 
        updateDevelopment, 
        deleteDevelopment } = require('../controllers');

const router = Router();

router.post('/', createDevelopment);

router.get('/',[ validateJWT, 
                 checkRole() ], getDevelopments);

router.get('/:id',[ validateJWT, 
                    checkRole()], getDevelopment);

router.put('/:id', updateDevelopment);

router.delete('/:id', deleteDevelopment);

module.exports = router;