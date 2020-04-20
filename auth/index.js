const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log("decoded", decoded);
    if (decoded.id !== owner) {
      throw error("You don't have access to this element", 401);
    }
  },
};

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw error("Without token", 406);
  }

  if (auth.indexOf("Bearer") === -1) {
    throw error("Invalid Format", 406);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  return decoded;
}

module.exports = {
  sign,
  check,
};
