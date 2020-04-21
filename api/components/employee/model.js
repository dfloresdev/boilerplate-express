const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  url_img: "string",
  nombre: "string",
  apellido: "string",
  salario: "string",
  estado: "string",
  categoria: "string",
});

const modelEmployees = mongoose.model("employee", employeeSchema);
module.exports = modelEmployees;
