const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://Rally:maitiBul1@proiect-ubd.hmzzfxq.mongodb.net/?retryWrites=true&w=majority";

//accesul la baza de date:

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Failed to connect to MongoDB.");
  }
}
connect();
//


const curseSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Curse = mongoose.model("Curse", curseSchema);

const app = express();
var curse = [];
app.set("view engine", "ejs"); //tells the app to use ejs as its view engine

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  var day = date.getDate();

  res.render("port", { dayName: day, newCurse: curse }); //variabila dayName impreuna cu lista/array-ul newCurse din port.ejs sunt "preluate" si prezentate aici.
});


 app.post("/", function (req, res) {
   const curse = new Curse({
     destination: req.body.destination,
     name: req.body.name,
   });
   curse
     .save()
     .then(() => {
       console.log("Curse added successfully!");
       res.redirect("/");
     })
     .catch((err) => {
       console.log("Error adding curse:", err);
     });
 });


app.post("/curse", function (req, res) {
  let day = date.getDate;
  Curse.find()
    .then((curse) => {
      res.render("curse", { newCurse: curse, dayName: day });
    })
    .catch((err) => {
      console.log("Error fetching curse data:", err);
    });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
