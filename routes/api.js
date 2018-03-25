var express = require("express");
var app = express();
var request = require("request");

var Api = app.get("/scrape", function (req, res) {

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

module.exports = Api;
