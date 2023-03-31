const { Development, 
        Project } = require('../models');
const Database = require('../database/config');

const { uploadLocalFiles, 
        removeLocalFiles, 
        uploadCloudinaryFiles} = require('../helpers');

const database = new Database();

const createDevelopment = async(req, res) => {

    const {_id, status,projectID, images, ...data}  =  req.body;

    try {
        
        const imagesArray =  await uploadLocalFiles(req.files, undefined, 'development' );
        const images = await uploadCloudinaryFiles( imagesArray );
        removeLocalFiles( imagesArray );

        data["images"] = images;

        await database.connect();

        /** Save development in DB */
        const development = new Development({...data, projectID});
        await development.save();

        if(!development) return res.status(400).json({
            msg:"Unit development has not been created",
            ok: false
        });
        
        /**Save development id inside ID array of projects for developments */
        
        await Project.findByIdAndUpdate( projectID, { $push: { developments: development._id } });

        /**Close connection to the database */
        await database.disconnect();

        
        
        res.json({
            ok: true,
            data:development
        });

    } catch (error) {
        console.log(error);
        await database.disconnect();
        res.status(500).json({
            ok: false,
            msg: error || "Report this issue to the admin"
        });
    }

}

const getDevelopments   = async(req, res) => {

    const { uid } = req;

    try {
        await database.connect();

        const projects = await Project.find({partnerID: uid}).select({"name":1, developments:1}).populate("developments");

        await database.disconnect();

        

        res.json({
            ok:true,
            data:projects
        })

    } catch (error) {
        console.log(error);
        await database.disconnect();
        res.status(500).json({
            ok: false,
            msg: "Report this issue to the admin"
        }); 
    }

}

const getDevelopment  = async(req, res) => {
    const { id } = req.params;

    try {
        await database.connect();
        const development = await Development.findById( id );
        await database.disconnect();

        if(!development) return res.status(400).json({
            ok: false,
            msg: 'Development not found'
        });

        res.json({
            ok:true,
            data: development
        })

    } catch (error) {
        console.log(error);
        await database.disconnect();
        res.status(500).json({
            ok: false,
            msg: "Report this issue to the admin"
        }); 
    }
}

const updateDevelopment = async(req, res) => {

    const { status, projectID, _id, images, ...data  } = req.body;
    const { id } = req.params;
    try {
        
        await database.connect();
        const development = await Development.findByIdAndUpdate( id, data );
        await database.disconnect();

        if(!development){
            return res.status(400).json({
                ok:false,
                msg: 'Development not found'
            });
        }

        res.json({
            ok:true,
            data: development
        });
    } catch (error) {
        console.log(error);
        await database.disconnect();
        res.status(500).json({
            ok: false,
            msg: "Report this issue to the admin"
        }); 
    }
}

const deleteDevelopment = async(req, res) => {

    /**Search about pull mongoose */

}



module.exports = {
    createDevelopment,
    getDevelopment,
    getDevelopments,
    updateDevelopment,
    deleteDevelopment
}