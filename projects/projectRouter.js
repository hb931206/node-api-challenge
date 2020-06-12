const express = require("express");
const db = require("../data/helpers/projectModel");
const { OPEN_READWRITE } = require("sqlite3");

const router = express.Router();

router.get("/", (req, res, next) => {
  db.get(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  if (!req.body.name && req.body.description) {
    return res
      .status(400)
      .json({ message: "Please provide name and description" });
  }
  const postOBJ = { name: req.body.name, description: req.body.description };
  db.insert(postOBJ)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

module.exports = router;
