const generateJWT = require('./generateJWT');
const db_validator = require('./db-validator');
const upload_files = require('./action-files');

module.exports = {
    generateJWT,
    ...db_validator,
    ...upload_files
}