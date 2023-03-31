const { request, response, json } = require('express');

const database  = require('../database/config');
const { User }  = require('../models');
const { uploadLocalFile, 
        removeCloudinaryFile, 
        removeLocalFile, 
        uploadCloudinaryFile } = require('../helpers');


const createUser = async(req = request, res = response) => {
    const { status, role, ...data } = req.body;
    const db = new database(); //Create an Database's instance

    try {
        await db.connect();
        
        const user = new User( {...data} );
        user.password = await user.encryptPassword( user.password );
        await user.save();
        
        await db.disconnect();

        tempUser = user.toJSON()
        delete tempUser.status;
        delete tempUser.role;
        delete tempUser.uid;

        console.log( tempUser );

        res.json({
            user: tempUser,
            ok:true
        });
        
    } catch (error) {
        console.error( error );
        db.disconnect();
        res.status(500).json({
            msg: 'Report this issue to the admin',
            ok:false
        });
    }




}

const getUser = async(req = request, res = response) => {
    

}

const getUsers = async(req = request, res = response) => {
    const db = new database();
    try {
        await db.connect();
        const users = await User.find({role:'USER_MODERATOR_ROLE', status:true});
        await db.disconnect();

        res.json({
            users,
            ok:true
        });

    } catch (error) {
        db.disconnect();
        res.status(500).json({
            msg:'',
            ok:false
        });
        
    }
}

const updateUser = async(req = request, res = response) => {
    console.log("entro a este punto");
    const { password, status, role, email, ...data } = req.body;
    const { uid } =  req;

    const db = new database();
    
    try {
        await db.connect();
        const user = await User.findByIdAndUpdate(uid, data );
        console.log("entro a este punto");
        if(!user){
            return res.status(400).json({
                ok:false,
                msg: 'User was not updated'
            });
        }

        res.json({
            ok:true,
            user
        });

        await db.disconnect();
    } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({
            ok:false,
            msg:'Report this issue the admin'
        });
        
        
    }

}

const deleteUser = async(req = request, res = response) => {
    
    const db = new database();
    const { id } = req.params;

    try {
        await db.connect();

        const user = await User.findByIdAndUpdate(id, {status: false})

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'User has not been deleted'
            })
        }

        await db.disconnect();

        res.json({
            ok: true,
            msg: 'User deleted successfuly'
        });
    } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({
            ok: false,
            msg: 'Report this issue the admin'
        });

    }



}

const uploadImageProfile = async(req, res) => {

    try {
        const name = await uploadLocalFile( req.files, undefined , 'users' );
        
        res.json({
            name,
            ok:true
        })
        
    } catch (error) {
        console.log(error);

        res.status(400).json({
            msg: error,
            ok:false
        });
    }
    
}

const updateImageProfile = async(req, res) => {

    const { uid } = req;
    const db = new database();

    try {
        await db.connect();

        const user = await User.findById(uid);

        await removeCloudinaryFile(user.profile);

        const {temporalName, uploadPath} = await uploadLocalFile( req.files, undefined , 'users' );
        
        const  secure_url  = await uploadCloudinaryFile( uploadPath );

        user.profile = secure_url;
        
        removeLocalFile(temporalName, 'users');

        await user.save();
        
        await db.disconnect();

        res.json({
            url: secure_url,
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        res.status(500).json({
            msg: 'Report this issue to the admin'
        });
    }


}



module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    uploadImageProfile,
    updateImageProfile

}