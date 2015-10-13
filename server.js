var express = require("express");
var stylus  = require("stylus");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var environment = process.env.NODE_ENV = process.env.NODE_ENV || "development";

var app = express();

var compile = function (string, path) {

    return stylus(string).set("filename", path);

}

app.set("views", __dirname + "/server/views");
app.set("view engine", "jade");
app.use(bodyParser());
app.use(logger("dev"));

app.get("partials/:partialPath", function (request, response) {

    response.render('partials/' + request.params.partialPath);

})

app.get("/", function (request, response) {

    response.render("index");

});

app.use(stylus.middleware({
    src: __dirname + "/public",
    compile: compile
}));

mongoose.connect('mongodb://127.0.0.1/multivision');


var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error...."));
db.once('open', function callback () {

    console.log("multivision database opened");

})


app.use(express.static(__dirname + "/public"))

var port = "3030";
app.listen(port);

console.log("Listening to server on port " + port + ".....");




