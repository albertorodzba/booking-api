const { response, request } = require("express");
const Database = require("../database/config");
const { Project } = require("../models");


const { uploadLocalFiles, uploadCloudinaryFiles, removeLocalFiles } = require('../helpers');


const db = new Database(); //new database instance

const createProject = async (req, res) => {

    const { status, _id, ...data } = req.body;
    try {

        
        const imagesArray =  await uploadLocalFiles(req.files, undefined, 'projects' );

        const images = await uploadCloudinaryFiles( imagesArray );

        removeLocalFiles( imagesArray );
        
        data["images"] = images;

        const { uid } = req;
        data["partnerID"] = uid;

        await db.connect();

        const project = new Project(data); //new model project instance
        await project.save();

        await db.disconnect();

        if( !project ){
            return res.status(400).json({
                ok:false,
                msg:"User has not been created"
            });
        }

        res.json({
            ok: true,
            project
        });
        
    } catch (error) {
        console.error(error);
        db.disconnect();
        res.status(500).json({
            msg: error || "Report this issue to the admin",
            ok: false,
        });
    }
};

const getProjects = async (req = request, res = response) => {
    try {
        const { uid } = req;

        await db.connect();
        const projects = await Project.find({partnerID:uid, status: true}); //gets all projects
        await db.disconnect();

        if(!projects) return res.status(400).json({
            msg: "Projects not found",
            ok: false
        });

     
        res.json({
            ok: true,
            projects,
        });

    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(500).json({
            msg: "Report this issue to the admin",
            ok: false,
        });
    }
};

const getProject = async (req = request, res = response) => {
    const { uid } = req;
    const { id } = req.params;
    try {
        await db.connect();
        const project = await Project.findOne({partnerID: uid, _id:id, status: true});
        await db.disconnect();

        if(!project) return res.status(400).json({
            msg: "Project not found",
            ok: false
        });

        res.json({
            ok: true,
            data: project
        });

    } catch (err) {
        await db.disconnect();
        console.log(err);
        res.status(500).json({
            msg: "Internal error, report this issue to the admin",
            ok: false,
        });
    }
};

const deleteProject = async (req = request, res = response) => {
    const { uid } = req;
    const { id } = req.params;
    try {
        await db.connect();
        const project = await Project.findOne({partnerID: uid, _id:id});
        console.log(project);
        project.status = false;
        await project.save();
        await db.disconnect();

        if(!project) return res.status(400).json({
            msg: "Project not found",
            ok: false
        });

        res.json({
            ok: true,
            project
        });
    } catch (err) {
        await db.disconnect();
        console.log(err);
        res.status(500).json({
            msg: "report this issue with the admin",
            ok: false
        });
    }
}

const updateProject = async (req = request, res = respone) => {
    
    const { _id, partnerID, status, ...projectUpdated } = req.body;

    
    try {
        await db.connect();
        const toUpdate = await Project.findByIdAndUpdate(id, projectUpdated);
        await db.disconnect();

        if(!toUpdate) return res.status(400).json({
            msg: "Project was not updated",
            ok: false
        });

        res.status(200).json({
            msg: `Project with ${id} was updated`,
            ok: true
        });
    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(500).json({
            msg: "Report this issue to the admin",
            ok: false
        });
    }
}
module.exports = {
    createProject,
    getProjects,
    getProject,
    deleteProject,
    updateProject
};
