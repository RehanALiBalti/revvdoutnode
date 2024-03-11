module.exports = (app) => {
  const comments = require("../controllers/comments.controller.js");

  var comrouter = require("express").Router();

  comrouter.post("/", comments.create);

  comrouter.get("/", comments.findAll);

  comrouter.get("/:id", comments.findOne);

  comrouter.post("/comments", comments.createComments);

  comrouter.delete("/:id", comments.delete);

  comrouter.delete("/", comments.deleteAll);

  app.use("/api/comments", comrouter);
};
