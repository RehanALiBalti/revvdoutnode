module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var userrouter = require("express").Router();

  userrouter.post("/", users.create);
  userrouter.put("/:id", users.update);

  userrouter.get("/", users.findAll);

  userrouter.get("/cognito", users.findByCognitoId);

  userrouter.get("/:id", users.findOne);

  app.use("/api/users", userrouter);
};
