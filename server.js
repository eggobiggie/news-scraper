//Require packages
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

//Require models for db
var db = require("./models");

//Local port
var PORT = process.env.PORT || 3000;

//Initialize express
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//Require handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Setup for deploying to heroku with mongoDB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    //   useMongoClient: true
});

app.get("/scrape", function (req, res) {

    request("https://www.npr.org/", function (error, response, html) {

        var $ = cheerio.load(html);

        //Empty results object
        var results = {};

        $("div.story-text").each(function (i, element) {

            //grabbing headline, teaser, and article link for results object
            results.headline = $(element).find("a").find("h1").text();
            results.teaser = $(element).find("a").find("p").text();
            results.link = $(element).find("a").find("h1").parent().attr("href");

            //create new headline in DB
            db.Headline.create(results).then(function (dbHeadline) {
                console.log(dbHeadline);
            }).catch(function (err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});


//Grab all headlines from database
app.get("/headlines", function (req, res) {
    db.Headline.find({}).then(function (dbHeadline) {
        res.json(dbHeadline);
    }).catch(function (err) {
        res.json(err);
    });
});

//Grab specific headline per id, add note
app.get("/headlines/:id", function(req, res) {
    db.Headline.findOne({
        _id: req.params.id
    }).populate("note").then(function(dbHeadline) {
        res.json(dbHeadline);
    }).catch(function(err) {
        res.json(err);
    });
});

//Save and update note
app.post("/headlines/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Headline.fineOneAndUpdateOne({_id: req.params.id}, {note: dbNote._id}, {new: true});
    }) .then(function(dbHeadline) {
        res.json(dbHeadline);
    }).catch(function(err) {
        res.json(err);
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});