//Require our dependencies
var express = require("express");
var bodyParser = require("body-parser");
var expressHandlebars =require("express-handlebars");
var mongoose = require("mongoose"); 
//Set up our port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000; 

//Instantiate our express app
var app = express();

// Set up an express router
var router = express.Router();

//Require our public routes file pass our router object
require("./config/routes")(router);

//Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect handlebars to our Expressapp
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyparser in our app 
app.use(bodyParser.urlencoded({
  extended: false
}));

// Have every request go through our router middlewware
app.use(router);

//If deployed, use the developed database. Otherwise use the local mongoTranding database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoTrending"

//Connect mongoose to our database
mongoose.connect(db, function(error){
  if (error){
    console.log(error);
  }
  else {
    console.log("mongoose connection is succeeful");
  }
})

// Listen on the Port
app.listen(PORT, function() {
  console.log("Listening on port:" +PORT);
})