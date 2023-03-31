const jwt = require('jsonwebtoken');
/**
 * 
 * @param {*} uid user identifier
 * 
 * return jwt
 */
const generateJWT = async( uid = '' ) =>{

    return new Promise( (resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload, process.env.PRIVATE_KEY_JWT, {
            expiresIn: '4h'
        }, ( error, token )=>{
            if( error ){
                console.log(error);
                reject("Can't generate token");
            }else{
                resolve(token);
            }

        });

    });

}

module.exports = generateJWT