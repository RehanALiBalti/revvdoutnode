module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var userrouter = require("express").Router();
  const multer = require("multer");

  const userImageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/users/");
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const userUpload = multer({ storage: userImageStorage });

  userrouter.post("/", users.create);
  userrouter.post("/verify", users.verifyPhone);
  userrouter.post("/updateuser", userUpload.single("image"), users.updateUser);
  // userrouter.put("/:id", userUpload.single("image"), users.update);

  userrouter.get("/", users.findAll);

  userrouter.get("/nickname", users.findByUsername);
  userrouter.get("/sub", users.findBySub);

  userrouter.get("/:id", users.findOne);
  // just to push
  app.use("/api/users", userrouter);
};
