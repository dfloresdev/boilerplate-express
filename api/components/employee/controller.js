const { nanoid } = require("nanoid");
const auth = require("../auth");

const TABLA = "employee";

module.exports = (injectedStore) => {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/dummy");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  async function upsert(body) {
    const employee = {
      username: body.username,
      nombre: body.nombre,
      apellido: body.apellido,
      salario: body.salario,
      estado: body.estado,
      url_img: body.url_img,
      categoria: body.categoria,
    };

    if (body.id) {
      employee.id = body.id;
    } else {
      employee.id = nanoid();
    }

    if (body.password || body.username) {
      await auth.upsert({
        id: employee.id,
        username: employee.username,
        password: body.password,
      });
    }

    return store.upsert(TABLA, employee);
  }

  return {
    list,
    get,
    upsert,
  };
};
