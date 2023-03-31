const { Schema, model } = require("mongoose");

const projectSchemma = new Schema({
    partnerID:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
    status:{
        type: Boolean,
        default: true,
        required: false
    },
    images:{
        type: Schema.Types.Array,
        required: true
    },
    developments:[{
        type: Schema.Types.ObjectId,
        ref:'Development'
    }]
});

projectSchemma.methods.toJSON = function () {
    const { __v, _id, status, ...project } = this.toObject();
    project["id"] = _id;
    return project;
    
}


module.exports = model('Project', projectSchemma);
