const express = require("express");
const bodyParser = require("body-parser");

const config = require("../config");
const employee = require("./components/employee/network");

const app = express();
app.use(bodyParser.json());

// ROUTER
app.use("/api/employee", employee);

app.listen(config.api.port, () => {
  console.log(
    `ronroneando como un gatito en ${config.api.host}:${config.api.port}`,
  );
});
