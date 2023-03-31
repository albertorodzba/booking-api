const validateFile = (req, res, next) => {
    if( !req.files || Object.keys(req.files).length === 0 || !req.files.profile )
        return res.status(400).json({
            msg: 'No files were uploaded',
            ok: false
        });

    next();
}

const validateFiles = (req, res, next) => {
    if( !req.files || Object.keys(req.files).length === 0 )
        return res.status(400).json({
            msg: 'No files were uploaded',
            ok: false
        });

    next();
}

module.exports = {
    validateFile,
    validateFiles
}