
const { Schema, model } = require('mongoose');

const accessCodeSchema = Schema({
    code: {
        type: String,
        default: 'Aitech-HZQ-RTQ-1022',
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }

});

module.exports = model('AccessCode', accessCodeSchema);

