const DB = require("../database/config");
const { User, AccessCode } = require("../models/");

/**
 * 
 * @param {*} email is an element of body request
 * 
 * theow new Error, if email field has been registered on database
 */
const existsEmailValidator = async (email) => {
  
  const db = new DB();
  try {
    await db.connect();
    const emailExists = await User.findOne({ email });
    await db.disconnect();

    if (emailExists) 
        throw new Error("Email has been registered");

  } catch (error) {
    throw new Error("Email has been registered");
  }
};

/**
 * 
 * @param {*} id is a params of request
 * 
 * thow new Error, if user id does not exist on database
 */
const existsUserById = async (id) => {
    const db = new DB();
    try {
        await db.connect();
        const userByID = await User.findOne({ id });
        await db.disconnect();
        if ( !userByID ) 
            throw new Error("User don't exist");
    } catch (error) {
        throw new Error("User has been registered");
    }
};


/**
 * 
 * @param {*} code is an element of body request
 * 
 * throw new Error if code does not exist or his status is false
 */
const existAccessCode = async ( code ) => {

    const db =  new DB();

    try {
      await db.connect();
      const access = await AccessCode.findOne({ code, status: true });
      await db.disconnect();

      if( !access )
        throw new Error("Access Code has been expired");
      
    } catch (error) {
      throw new Error(error);
    }
}


module.exports = {
  existsEmailValidator,
  existsUserById,
  existAccessCode
};
