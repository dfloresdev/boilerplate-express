const db = {
  user: [
    {
      id: "1",
      name: "David",
    },
    {
      id: "2",
      name: "Venus",
    },
    {
      id: "3",
      name: "Tierra",
    },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}

async function get(tabla, id) {
  let data = await list(tabla);
  return data.filter((item) => item.id === id)[0] || null;
}

async function upsert(tabla, data) {
  let user = await get(tabla, data.id);
  if (user) {
    // insert function update
  } else {
    if (!db[tabla]) {
      db[tabla] = [];
    }
    db[tabla].push(data);
  }
  console.log(db);
  return data;
}

async function remove(tabla, id) {
  return true;
}

async function query(tabla, q) {
  let data = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];
  return data.filter((item) => item[key] === q[key])[0] || null;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
