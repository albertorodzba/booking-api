const Database = require('../database/config');
const { AccessCode } = require('../models');

const createAccesCode = async( req, res) => {

    const db = new Database();

    try {
        
        await db.connect();

        const accessCode  =  new AccessCode();
        accessCode.save();
        await db.disconnect();

        res.json({
            ok:true,
            code:accessCode
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg:'Report this assue to the admin'
        });
    }

}

const updateAccessCode = async(req, res) => {
    res.json("ok")

}

const deleteAccessCode = async(req, res) => {
    res.json("ok")
}

module.exports = {
    createAccesCode,
    updateAccessCode,
    deleteAccessCode


}