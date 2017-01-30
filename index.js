var express = require("express");
var mongoose = require("mongoose");
var app = express();

// DB setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
  console.log("DB connected");
});

db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

// Other settings
app.set("vie3w engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Port settings
app.listen(3000, function(){
  console.log("server on!");
});
