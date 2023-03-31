const { Schema, model } = require('mongoose');


const developmentSchema = new Schema({
    projectID:{
        type: Schema.Types.ObjectId,
        ref:"Project",
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    bed:{
        type: Number,
        required: true
    },
    bedroom:{
        type: Number,
        required: false
    },
    services: {
        type: Schema.Types.Array,
        required: true
    },
    images:{
        type: Schema.Types.Array,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }

});

developmentSchema.methods.toJSON = function(){
    const { _id, __v, ...data}  = this.toObject();
    data["id"] = _id;

    return data;
}

module.exports = model('Development', developmentSchema);