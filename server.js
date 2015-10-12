var express = require("express");
var stylus  = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");

var environment = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var compile = function (string, path) {

    return stylus(string).set("filename", path);
    
}

app.set("views", __dirname + "/server/views/");
app.set("view engine", "jade");
app.use(bodyParser());
app.use(logger("dev"));
app.get("/", function (request, response) {

    response.render("index");

});
app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: compile
}));
app.use(express.static(__dirname + "/public"))

var port = "3030";
app.listen(port);

console.log("Listening to server on port " + port + ".....");




