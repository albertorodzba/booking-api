const { request, response } =  require('express');

const { generateJWT }   = require('../helpers/');
const { User }          = require('../models/');
const DB                = require('../database/config');


const signIn = async(req = request, res = response) =>{
    // Create a Database's instance
    const db =  new DB();
    try {
        // waiting for connection to db
        await db.connect();
        // Get params from request body 
        const { email, password } = req.body;
        // Get user from DB, if exists a user with an email equal to email param
        const user = await User.findOne( {email} );
        
        // Verify User exists, if one exists, to compare that password param and password user are equal 
        const correctPassword = user === null ? 
                false:
                await user.comparePassword(password);

        // if password is incorrect or user status are false, return an invalid request
        if( !correctPassword || !user.status ) return res.status(401).json({
            msg:'Invalid email or password',
            ok: false
        });
        
        // generate jwt, if user exists 
        const token = await generateJWT( user._id );
    
        // waiting for disconnection to db
        await db.disconnect();
        
        // Response 200 status with the user found and him token 
        tempUser = user.toJSON()
        delete tempUser.status;
        // delete tempUser.role;
        delete tempUser.uid;

        res.json({
            user: tempUser,
            token,
            ok:true
        });

    } catch (error) {
        console.error(error);
        await db.disconnect();
        res.status(500).json({
            msg: 'Report issue to the admin',
            ok:false
        });
    }

}

module.exports = {
    signIn   
}