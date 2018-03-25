var express = require("express");
var app = express();

//Save and update note
var View = app.post("/headlines/:id", function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
        return db.Headline.fineOneAndUpdateOne({_id: req.params.id}, {note: dbNote._id}, {new: true});
    }) .then(function(dbHeadline) {
        res.json(dbHeadline);
    }).catch(function(err) {
        res.json(err);
    });
});

module.exports = View;