module.exports = (app) => {
  const comments = require("../controllers/comments.controller.js");

  var comrouter = require("express").Router();

  const multer = require("multer");
  const upload = multer({ dest: "./uploads/" });

  comrouter.post("/", comments.create);

  comrouter.get("/", comments.findAll);
  comrouter.get("/commentsall/:id", comments.findAllByCommunity);

  comrouter.get("/:id", comments.findOne);

  comrouter.post("/comments", upload.single("image"), comments.createComments);

  comrouter.delete("/:id", comments.delete);

  comrouter.delete("/", comments.deleteAll);

  app.use("/api/comments", comrouter);
};
