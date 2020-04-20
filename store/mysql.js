const mysql = require("mysql");

const config = require("../config");

const mysqlConfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleConnection() {
  connection = mysql.createConnection(mysqlConfig);

  connection.connect((err) => {
    if (err) {
      console.error("[Database error]", err);
      setTimeout(handleConnection, 2000);
    } else {
      console.log("[Database connected]");
    }
  });

  connection.on("err", (err) => {
    console.error("[Database error]", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      handleConnection();
    } else {
      throw err;
    }
  });
}

handleConnection();

function list(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla}`, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id='${id}'`,
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      },
    );
  });
}

function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, data) => {
      if (error) {
        return reject(error);
      }
      resolve(data);
    });
  });
}

async function upsert(table, data) {
  const resultado = await get(table, data.id);
  if (resultado.length > 0) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}

function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (error, data) => {
        if (error) {
          return reject(error);
        }
        resolve(data);
      },
    );
  });
}

function query(table, query) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE ?`, query, (error, res) => {
      if (error) {
        return reject(error);
      } else {
        resolve(res[0] || "no data");
      }
    });
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
};
