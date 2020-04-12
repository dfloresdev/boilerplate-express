const jwt = require("jsonwebtoken");
const config = require("../config");

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

const check = {
  own: (req, owner) => {
    const decoded = decodeHeader(req);
    console.log("decoded", decoded);

    if (decoded.id !== owner) {
      throw new Error("You don't have access to this element");
    }
  },
};

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw new Error("Without token");
  }

  if (auth.indexOf("Bearer") === -1) {
    throw new Error("Invalid Format");
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
