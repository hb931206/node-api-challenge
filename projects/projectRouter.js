const express = require("express");
const db = require("../data/helpers/projectModel");
// const { OPEN_READWRITE } = require("sqlite3");

const router = express.Router();

router.get("/:id", (req, res, next) => {
  db.get(req.body.id)
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

router.delete("/:id", (req, res, next) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "See ya user" });
      } else {
        res
          .status(404)
          .json({ message: "You can't delete this guy. He doesnt exist" });
      }
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    return res
      .status(400)
      .json({ message: "you need a name and a description" });
  }
  const putObj = { name: req.body.name, description: req.body.description };
  db.update(req.params.id, putObj)
    .then((name) => {
      if (name) {
        res.status(200).json(name);
      } else {
        res.status(404).json({ message: "can't find user" });
      }
    })
    .catch(next);
});

router.get("/:id/actions", (req, res, next) => {
  db.getProjectActions(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
