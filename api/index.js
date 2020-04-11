const express = require("express");
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");

const config = require("../config");
const employee = require("./components/employee/network");

const app = express();
app.use(bodyParser.json());
const swaggerDoc = require("./swagger.json");

// ROUTER
app.use("/api/employee", employee);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(config.api.port, () => {
  console.log(
    `ronroneando como un gatito en ${config.api.host}:${config.api.port}`,
  );
});
