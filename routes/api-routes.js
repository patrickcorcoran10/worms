const db = require("../models");

module.exports = function (app) {
  app.post("/api/input-score", (req, res) => {
    db.Scores.create({
      name: req.body.name,
      score: req.body.score,
    }).then((dbData) => {
      res.json(dbData);
    });
  });
  app.get("/api/get-scores", (req, res) => {
    db.Scores.findAll({}).then((dbData) => {
      res.json(dbData);
    });
  });
};
