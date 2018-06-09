var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var bodyParser = require('body-parser')
var cons = require('consolidate');

var app = express();
var url = process.env.URL || "mongodb://localhost:27017/";
var dbName = process.env.dbName || "mongoexpress";
var port = 8080;

app.engine('html', cons.pug);
app.set('view engine', 'html');
app.set('views',  __dirname +  '/views')

var routes = require("./routes");
var generatesUtils = require("./generateData.js")

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

MongoClient.connect(url, function(err, client) {
  if(err) throw err;

  routes(app);
  
  app.client = client;
  app.db = client.db(dbName);

  // uncomment if you want to insert random data in mongoDB
  //app.db.collection("blog").insert({"name": generatesUtils.generateWord(10), "content": generatesUtils.generateWord(100)})
  
});

app.listen(port, function() {
  console.log("now listening on http://localhost:" + port)
});


module.exports = app;
