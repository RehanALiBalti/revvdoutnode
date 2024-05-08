module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var userrouter = require("express").Router();

  userrouter.post("/", users.create);

  userrouter.get("/", users.findAll);

  userrouter.get("/filter", users.findSelected);
  userrouter.get("/published", users.findAllPublished);

  userrouter.get("/:id", users.findOne);

  userrouter.post("/likes", users.updateLikes);
  userrouter.post("/dislikes", users.updateDislikes);
  userrouter.post("/views", users.updateViews);

  userrouter.put("/:id", users.update);

  userrouter.delete("/:id", users.delete);

  userrouter.delete("/", users.deleteAll);

  app.use("/api/users", userrouter);
};
