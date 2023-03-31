const { Router } = require('express');


const { validateJWT, checkRole } = require('../middlewares');

const { createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject } = require('../controllers');

const router = Router();

router.post('/',[
    validateJWT,
    checkRole()
], createProject);

router.get('/',[
    validateJWT,
    checkRole()
], getProjects);

router.get('/:id', getProject);
router.put('/:id', updateProject);

router.delete('/:id',[
    validateJWT,
    checkRole()
], deleteProject);

module.exports = router;