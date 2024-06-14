module.exports = (app) => {
  const replies = require("../controllers/comment_replies.controller.js");

  var replyrouter = require("express").Router();

  const multer = require("multer");
  const rstorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const upload3 = multer({ storage: rstorage });

  replyrouter.post("/", replies.create);

  replyrouter.get("/", replies.findAll);

  replyrouter.get("/replyall/:id", replies.findAllByComment);
  replyrouter.get("/count", replies.countReplies);
  replyrouter.get("/test/:id", replies.test);

  replyrouter.get("/:id", replies.findOne);

  replyrouter.post("/reply", upload3.single("rimage"), replies.createReplies);

  replyrouter.post("/likes", replies.updateLikes);
  replyrouter.post("/dislikes", replies.updateDislikes);

  replyrouter.delete("/:id", replies.delete);

  replyrouter.delete("/", replies.deleteAll);

  app.use("/api/replies", replyrouter);
};
