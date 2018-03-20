//Require packages
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");

//Require models for db
// var db = require("./models");

//Local port
var PORT = process.env.PORT || 3000;

//Initialize express
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Require handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Setup for deploying to heroku with mongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
//   useMongoClient: true
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});