const validateFields    = require('./validationFields');
const validateJWT       = require('./validateJWT');
const validateRole      = require('./validateRole');
const validateFile      = require('./validateFile');

module.exports = {
    validateFields,
    ...validateJWT,
    ...validateRole,
    ...validateFile
}