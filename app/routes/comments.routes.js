module.exports = (app) => {
  const comments = require("../controllers/comments.controller.js");

  var comrouter = require("express").Router();

  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const userStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/users/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  const upload2 = multer({ storage: userStorage });

  comrouter.post("/", comments.create);

  comrouter.get("/", comments.findAll);
  comrouter.get("/commentsall/:id", comments.findAllByCommunity);

  comrouter.get("/:id", comments.findOne);

  comrouter.post("/comments", upload.single("image"), comments.createComments);
  comrouter.post(
    "/users",
    upload2.single("userImage"),
    comments.uploadUserPhoto
  );

  comrouter.delete("/:id", comments.delete);

  comrouter.delete("/deleteall", comments.deleteAll);

  app.use("/api/comments", comrouter);
};
