module.exports = (app) => {
  const replies = require("../controllers/comment_replies.controller.js");

  var replyrouter = require("express").Router();

  replyrouter.post("/", replies.create);

  replyrouter.get("/", replies.findAll);
  replyrouter.get("/commentsall/:id", replies.findAllByCommunity);

  replyrouter.get("/:id", replies.findOne);

  replyrouter.post("/reply", replies.createReplies);

  replyrouter.delete("/:id", replies.delete);

  replyrouter.delete("/", replies.deleteAll);

  app.use("/api/replies", replyrouter);
};
