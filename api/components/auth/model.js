const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema({
  username: "string",
  password: "string",
});

const modelAuth = mongoose.model("auth", authSchema);
module.exports = modelAuth;
