var ObjectId = require("mongodb").ObjectID;

module.exports = function(app) {
  app.get("/post/create", function(req, res) {
    res.render("createPost.html");
  });
  
  app.post("/post/create", function(req, res) {
    article = {"name": req.body.name, "content" : req.body.content};

    app.db.collection("blog").insert(article, function(err, insertedArticle){
      res.redirect("/");
    });
  });


  app.get("/post/:id", function(req, res) {
    app.db.collection("blog").findOne({"_id": ObjectId(req.params.id)}, function(err, result){
      if (result != null){
        res.render("post.html", {"article": result});
      } else {
        res.status(404).send("Not found Sorry :/")
      }
    });
  });
}
