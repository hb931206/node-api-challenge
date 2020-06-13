const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  db.get(req.body.id)
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  if (!req.body.project_id && !req.body.description && !req.body.notes) {
    return res
      .status(400)
      .json({ message: "Please Provide project ID, note, description" });
  }

  const postOBJ = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
  };
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
        res.status(200).json({ message: "Bye Project" });
      } else {
        res.status(404).json({ message: "Couldn't find ID" });
      }
    })
    .catch(next);
});

router.put("/:id", (req, res, next) => {
  if ((!req.body.project_id && !req.body.description) || !req.body.notes) {
    return res.status(400).json({ message: "You need all your info" });
  }
  const putOBJ = {
    project_id: req.body.project_id,
    description: req.body.description,
    notes: req.body.notes,
  };
  db.update(req.params.id, putOBJ)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "no id" });
      }
    })
    .catch(next);
});

module.exports = router;
