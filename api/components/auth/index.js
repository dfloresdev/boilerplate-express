const controller = require("./controller");
// const store = require("../../../store/dummy");//database with arrays
// const store = require("../../../store/mysql");
const store = require("../../../store/mongodb");

module.exports = controller(store);
