'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var user_routes = require("./routes");

app.secret = "pablo2389";

app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
app.use(bodyParser.json());

app.use("/api",user_routes);

module.exports = app;
