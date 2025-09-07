const { Router } = require("express").Router();
Router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = Router;