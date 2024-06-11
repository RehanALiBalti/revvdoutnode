module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var userrouter = require("express").Router();
  const multer = require("multer");

  const userImageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/users/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const userUpload = multer({ storage: userImageStorage });

  userrouter.post("/", users.create);
  userrouter.put("/:id", userUpload.single("image"), users.update);

  userrouter.get("/", users.findAll);

  userrouter.get("/cognito", users.findByCognitoId);
  userrouter.get("/sub", users.findBySub);

  userrouter.get("/:id", users.findOne);

  app.use("/api/users", userrouter);
};
