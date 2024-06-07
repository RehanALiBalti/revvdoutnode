module.exports = (app) => {
  const stories = require("../controllers/stories.controller.js");

  var storyrouter = require("express").Router();

  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploads/stories");
    },
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      callback(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  const upload = multer({ storage });

  storyrouter.post("/", upload.array("storyImages", 8), stories.create);

  storyrouter.get("/", stories.findAll);
  storyrouter.get("/storiesall/:id", stories.findAllByCommunity);

  storyrouter.get("/:id", stories.findOne);

  storyrouter.delete("/:id", stories.delete);

  storyrouter.delete("/deleteall", stories.deleteAll);

  app.use("/api/stories", storyrouter);
};
