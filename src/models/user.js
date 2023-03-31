const { Schema, model }  = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({

    name:{
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true
    },
    rfc:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: [true, 'Role is required'],
        enum: ['ADMIN_AITECH_ROLE', 'USER_MODERATOR_ROLE'],
        default: 'USER_MODERATOR_ROLE'
    },
    status:{
        type: Boolean,
        default: true
    }

});

userSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user['uid'] = _id;
    return user;
}

userSchema.methods.encryptPassword = async( password ) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash( password, salt )

    return hash
}

userSchema.methods.comparePassword = async function( password ){
    return await bcrypt.compare( password, this.password );
}


module.exports = model( 'User', userSchema )

