var posts = require("./posts");


module.exports = function(app) {


  app.get("/", function(req, res) {
    app.db.collection("blog").find().toArray(function(err, results){
      res.render("index.html", {"articles": results});
    });
  });

  // Register posts endpoint
  posts(app);
}
