const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const DB = require("../database/config");
const { User } = require("../models/");

const validateJWT = async (req = request, res, next) => {
  const db = new DB();

  const token = req.header("x-token");

  if (!token)
    return res.status(400).json({
      msg: "Token missing or incorrect",
      ok: false,
    });

  try {
    await db.connect();

    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY_JWT);
    const user = await User.findById(uid);

    if (!user) {
      await db.disconnect();
      return res.status(401).json({
        msg: "Token missing or incorrect",
        ok: false,
      });
    }

    req.authUser = user;
    req.uid = uid;

    await db.disconnect();

    next();

  } catch (error) {
    await db.disconnect();
    console.error(error);

    res.status(500).json({
        msg: `Token missing or incorrect`,
        ok:false
    });
  }
};


module.exports = {
    validateJWT
};