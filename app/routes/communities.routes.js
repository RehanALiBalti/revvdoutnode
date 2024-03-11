module.exports = (app) => {
  const communities = require("../controllers/community.controller.js");

  var crouter = require("express").Router();

  crouter.post("/", communities.create);

  crouter.get("/", communities.findAll);

  crouter.get("/filter", communities.findSelected);
  crouter.get("/published", communities.findAllPublished);

  crouter.get("/:id", communities.findOne);

  crouter.post("/likes", communities.updateLikes);
  crouter.post("/views", communities.updateViews);
  crouter.post("/comments", communities.createComments);

  crouter.delete("/:id", communities.delete);

  crouter.delete("/", communities.deleteAll);

  app.use("/api/communities", crouter);
};
