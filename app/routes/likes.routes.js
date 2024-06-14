module.exports = (app) => {
  const likes = require("../controllers/likes.controller.js");

  var likesrouter = require("express").Router();

  likesrouter.get("/", likes.findAll);

  likesrouter.get("/likescount", likes.likesCount);
  likesrouter.get("/dislikescount", likes.dislikesCount);

  likesrouter.get("/:id", likes.findOne);

  likesrouter.post("/like", likes.updateLikes);

  likesrouter.delete("/:id", likes.delete);

  likesrouter.delete("/", likes.deleteAll);

  app.use("/api/likes", likesrouter);
};
