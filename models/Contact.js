var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});

var Contact = mongoose.model("contactBook", contactSchema);

module.exports = Contact;
