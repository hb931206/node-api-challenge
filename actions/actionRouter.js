const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  db.get(req.params.id)
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
  db.remove(req.param.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "Bye Project" });
      } else {
        res.status(404).json({ message: "Couldn't find ID" });
      }
    })
    .catch(next);
});

// router.put

module.exports = router;
