var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-Parser");
var methodOverride = require("method-override");
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
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

// DB schema
var contactSchema = mongoose.Schema({
 name:{type:String, required:true, unique:true},
 email:{type:String},
 phone:{type:String}
});
var contactMemb = mongoose.model("contactBook", contactSchema);

// Routes
// Home
app.get("/", function(req, res){
 res.redirect("/contacts");
});

// Contacts - Index
app.get("/contacts", function(req, res){
 contactMemb.find({}, function(err, selDatas){
  if(err) return resonse.json(err);
  res.render("contacts/index", {contactBookDatas:selDatas});
  });
});

// Contacts - New
app.get("/contacts/new", function(req, res){
 res.render("contacts/new");
});

// Contacts - Create
app.post("/contacts", function(req, res){
 contactMemb.create(req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

// Contacts - Show
app.get("/contacts/:id", function(req,res){
  contactMemb.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contacts/show", {contact:contact});
  });
});

// Contacts - Edit
app.get("/contacts/:id/edit", function(req, res){
  contactMemb.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contacts/edit", {contact:contact});
  });
});

// Contacts - Update
app.put("/contacts/:id", function(req, res){
  contactMemb.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts/" + req.params.id);
  });
});

// Contacts - Destory
app.delete("/contacts/:id", function(req, res){
  contactMemb.remove({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

// Port settings
app.listen(3000, function(){
  console.log("server on!");
});
