const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({ origin: "http://localhost:8081", methods: "GET,POST,PUT,DELETE" })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("uploads"));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (request, response) => {
  response.json({ message: "Welcome to revddout node backend" });
});

require("./app/routes/cars.routes")(app);
require("./app/routes/communities.routes")(app);
require("./app/routes/comments.routes")(app);
require("./app/routes/comment_replies.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/stories.routes")(app);
require("./app/routes/likes.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
