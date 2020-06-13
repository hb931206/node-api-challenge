const express = require("express");
const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res, next) => {
  db.get(req.body.id)
    .then((user) => {
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

// router.put

module.exports = router;
