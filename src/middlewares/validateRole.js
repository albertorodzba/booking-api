const { Role } = require("../models");
const database = require("../database/config");

const isAdmin = (req, res, next) => {

    if( !req.authUser ) return res.status(401).json({
        msg:'Token missing or incorrect',
        ok:false
    });

    const { role } = req.authUser;

    if( role !== 'ADMIN_AITECH_ROLE' ) return res.status(400).json({
        msg:'Does not have required permissions',
        ok: false
    });

    next();
}

const checkRole = () => {
    
    
    return async(req, res, next) => {
        
        
        if( !req.authUser ) return res.status(400).json({
            msg:'User does not have required permissions',
            ok: false
        });
        
        const db =  new database();
        try {
            await db.connect();
            const role = await Role.findOne({role:req.authUser.role});
            await db.disconnect();

            if( !role ) return res.status(400).json({
                msg:'User does not have required permissions',
                ok: false
            });

        } catch (error) {
            return res.status(500).json({
                msg:'Report this problem to the admin',
                ok: false
            });
        }
        

        next();
    }
}

module.exports = {
    isAdmin,
    checkRole
}