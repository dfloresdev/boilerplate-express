const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", list);
router.get("/:id", get);
router.post("/", upsert);
// router.put("/", secure("update"), upsert);
router.put("/", upsert);
router.delete("/:id", remove);

function list(req, res, next) {
  const list = Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  const employee = Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  const employee = Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}

function remove(req, res, next) {
  const employee = Controller.remove(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

module.exports = router;
