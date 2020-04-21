const db = require("mongoose");
const config = require("../config");
const ModelEmployee = require("../api/components/employee/model");
const ModelAuth = require("../api/components/auth/model");

db.Promise = global.Promise;

db.connect(
  `mongodb+srv://${config.mongodb.user}:${config.mongodb.pass}@cluster0-gapwk.gcp.mongodb.net`,
  { useNewUrlParser: true },
);

console.log("[DB Connection] successfully");

async function list(table) {
  if (table === "employee") {
    const employees = ModelEmployee.find();
    return employees;
  } else {
    const auth = ModelAuth.find();
    return auth;
  }
}

async function get(table, id) {
  if (table === "employee") {
    const employees = ModelEmployee.findOne({ _id: id });
    return employees;
  } else {
    const auth = ModelAuth.find({ _id: id });
    return auth;
  }
}

async function upsert(table, data) {
  data._id = data.id;

  if (table === "employee") {
    let exist = await ModelEmployee.findOne({ _id: data._id });
    if (exist) {
      exist.update(data, (err) => {
        if (err) console.log(err);
      });
    } else {
      const employee = new ModelEmployee(data);
      employee.save();
    }
  } else {
    let exist = await ModelAuth.findOne({ _id: data._id });
    if (exist) {
      exist.update(data, (err) => {
        if (err) console.log(err);
      });
    } else {
      const auth = new ModelAuth(data);
      auth.save();
    }
  }
}

async function query(table, query) {
  if (table === "employee") {
    const employees = ModelEmployee.find(query);
    return employees;
  } else {
    const auth = ModelAuth.find(query);
    return auth;
  }
}

function remove(table, id) {
  if (table === "employee") {
    return ModelEmployee.deleteOne({ _id: id });
  } else {
    return ModelAuth.deleteOne({ _id: id });
  }
}

module.exports = {
  list,
  upsert,
  get,
  query,
  remove,
};
