const express = require("express");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("dashboard");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Express is working on port 3000");
});
