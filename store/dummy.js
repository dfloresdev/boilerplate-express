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
  return db[tabla];
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
    db[tabla].push(data);
  }
  return data;
}

async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
