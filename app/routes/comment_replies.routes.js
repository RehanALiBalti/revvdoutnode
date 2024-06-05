module.exports = (app) => {
  const replies = require("../controllers/comment_replies.controller.js");

  var replyrouter = require("express").Router();

  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });

  replyrouter.post("/", replies.create);

  replyrouter.get("/", replies.findAll);

  replyrouter.get("/replyall/:id", replies.findAllByComment);

  replyrouter.get("/:id", replies.findOne);

  replyrouter.post("/reply", upload.single("rimage"), replies.createReplies);

  replyrouter.delete("/:id", replies.delete);

  replyrouter.delete("/", replies.deleteAll);

  app.use("/api/replies", replyrouter);
};
