const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/static", express.static("./static/"));

const db = require("./models");

require("./routes/api-routes")(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("We Got Worms on PORT", PORT);
  });
});
