const express = require("express");
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");

const config = require("../config");
const employee = require("./components/employee/network");
const auth = require("./components/auth/network");
const errors = require("../network/errors");

const app = express();
app.use(bodyParser.json());
const swaggerDoc = require("./swagger.json");

// ROUTER
app.use("/api/employee", employee);
app.use("/api/auth", auth);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(errors);

app.listen(config.api.port, () => {
  console.log(
    `ronroneando como un gatito en ${config.api.host}:${config.api.port}`,
  );
});
