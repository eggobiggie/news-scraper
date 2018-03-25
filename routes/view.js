var path = require("path");

//Tried to figure out handlebars but it was uncooperative
module.exports = function(app) {


  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });
  
  app.get("/saved", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/saved.handlebars"));
  });
  
};