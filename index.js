const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("home");
});

mongoose.connect(
  "mongodb+srv://jaybhakhar:jay456789@quiz-model.eiqfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const quizModelSchema = {
  name: String,
  budget: String,
  number: String,
};

const Quiz_Model = mongoose.model("Quiz-Model", quizModelSchema);

app.post("/", (req, res) => {
  const quizModel = new Quiz_Model({
    name: req.body.name,
    budget: req.body.budget,
    number: req.body.number,
  });

  quizModel.save(function (err) {
    if (!err) {
      res.redirect("/thankyou");
    }
  });
});
app.get("/dashboard", (req, res) => {
  Quiz_Model.find({}, function (err, quiz_models) {
    res.render("dashboard", {
      quiz_models: quiz_models,
    });
  });
});

app.get("/dashboard/delete/:id", function (req, res) {
  Quiz_Model.findByIdAndRemove(req.params.id, function (err) {
    if (!err) {
      res.redirect("/dashboard");
    }
  });
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/thankyou", (req, res) => {
  res.render("thankyou");
});
app.listen(process.env.PORT || 3000, function () {
  console.log("Express is working on port 3000");
});
