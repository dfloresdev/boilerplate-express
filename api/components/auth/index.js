const controller = require("./controller");
// const store = require("../../../store/dummy");//database with arrays
const store = require("../../../store/mysql");

module.exports = controller(store);
